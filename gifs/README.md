Here's the folkder where your gifs will be created


# Full Script

```shell
find gifs -maxdepth 1 -name "\*.png" | sed 's/gifs\///' | sed 's/.png//' | while read name ; do
NAME=$name && \
echo $NAME && \
(/bin/rm $NAME/$NAME-roll.gif || true) && \
<gifs/$NAME.png gif crop | gif roll | gif optimize --kb 127 >gifs/$NAME/$NAME-roll.gif && \
(/bin/rm $NAME/$NAME-wobble.gif || true) && \
<gifs/$NAME.png gif crop | gif wobble | gif optimize --kb 127 >gifs/$NAME/$NAME-wobble.gif && \
(/bin/rm $NAME/$NAME-shake.gif || true) && \
<gifs/$NAME.png gif shake -a 28 -f 3 | gif optimize --kb 127 >gifs/$NAME/$NAME-shake.gif; done
```