const globby = require("globby");
const fs = require("fs");
const sharp = require("sharp");
const pMap = require("p-map");
const path = require("path");
const PartyPartyParty = require("party-party-party");

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
      console.log(personName, " done");
      fs.rmSync(file);
    },
    { concurrency: 3 }
  );
};
start().catch((e) => console.error(e));
// const outputFileStream = fs.createWriteStream("my-output-file.gif");
// PartyPartyParty("my-input.png", outputFileStream, 10);
