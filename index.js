const globby = require("globby");
const fs = require("fs");
const sharp = require("sharp");
const pMap = require("p-map");
const path = require("path");
const PartyPartyParty = require("party-party-party");
const { exec } = require("child_process");
const util = require("util");

const execPromise = util.promisify(exec);

const ensureDir = (pathString) => {
  if (!fs.existsSync(pathString)) {
    fs.mkdirSync(pathString);
  }
};

const makeParty = (name, tempFileName) =>
  new Promise((resolve) => {
    const outputFileStream = fs.createWriteStream(
      `gifs/${name}/party-${name}.gif`
    );
    outputFileStream.on("finish", resolve);
    PartyPartyParty(tempFileName, outputFileStream, 10);
  });

const start = async () => {
  const files = await globby("gifs/*.png");
  await pMap(
    files,
    async (file) => {
      const { name, ext } = path.parse(file);
      const personName = name.split("-head")[0];
      const tempFileName = `gifs/${personName}/${name}${ext}`;
      console.log("working on ", personName);
      if (!personName) {
        throw new Error("could not find person name for ", file);
      }
      ensureDir(`gifs/${personName}`);
      await sharp(file).resize(128).toFile(tempFileName);

      await makeParty(personName, tempFileName);

      const simplifiedBaseImage = `gifs/${personName}/${personName}${ext}`;

      if (tempFileName !== simplifiedBaseImage) {
        fs.renameSync(tempFileName, simplifiedBaseImage);
      }

      const gifCommands = [
        `(/bin/rm -f gifs/${personName}/${personName}-roll.gif || true) && <${simplifiedBaseImage} ./gif crop | ./gif roll | ./gif optimize --kb 127 >gifs/${personName}/${personName}-roll.gif`,
        `(/bin/rm -f gifs/${personName}/${personName}-wobble.gif || true) && <${simplifiedBaseImage} ./gif crop | ./gif wobble | ./gif optimize --kb 127 >gifs/${personName}/${personName}-wobble.gif`,
        `(/bin/rm -f gifs/${personName}/${personName}-intensifies.gif || true) && <${simplifiedBaseImage} ./gif shake -a 10 -f 1 | ./gif optimize --kb 127 >gifs/${personName}/${personName}-intensifies.gif`
      ];

      console.log(`Executing GIF generation commands for ${personName}:`);
      gifCommands.forEach(cmd => console.log(cmd));

      await Promise.all(gifCommands.map(cmd =>
        execPromise(cmd).then(({ stdout, stderr }) => {
          if (stdout) console.log(`Stdout for ${personName} processing: ${stdout}`);
          if (stderr) console.error(`Stderr for ${personName} processing: ${stderr}`);
        })
      ));

      console.log(personName, " done with all gifs");
      fs.rmSync(file);

    },
    { concurrency: 3 }
  );
};
start().catch((e) => console.error(e));
// const outputFileStream = fs.createWriteStream("my-output-file.gif");
// PartyPartyParty("my-input.png", outputFileStream, 10);
