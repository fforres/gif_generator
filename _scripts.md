## Create rolling fig

```shell
(/bin/rm $NAME/$NAME-roll.gif || true) && <$NAME-head.png gif crop | gif roll | gif optimize --kb 127 >$NAME/$NAME-roll.gif
```

## Create wobble gif

```shell
(/bin/rm $NAME/$NAME-wobble.gif || true) && <$NAME-head.png gif crop | gif wobble | gif optimize --kb 127 >$NAME/$NAME-wobble.gif
```

## Create shake gif

```shell
(/bin/rm $NAME/shake.gif || true) && <$NAME-head.png gif shake -a 28 -f 3 | gif optimize --kb 127 >$NAME/shake.gif
```

## full-script

```shell
find gifs -maxdepth 1 -name "*.png" | sed 's/gifs\///' | sed 's/.png//' | while read name ; do
NAME=$name && \
echo $NAME && \
(/bin/rm -f $NAME/$NAME-roll.gif || true) && \
<gifs/$NAME.png gif crop | gif roll | gif optimize --kb 127 >gifs/$NAME/$NAME-roll.gif && \
(/bin/rm -f $NAME/$NAME-wobble.gif || true) && \
<gifs/$NAME.png gif crop | gif wobble | gif optimize --kb 127 >gifs/$NAME/$NAME-wobble.gif && \
(/bin/rm -f $NAME/$NAME-shake.gif || true) && \
<gifs/$NAME.png gif shake -a 28 -f 3 | gif optimize --kb 127 >gifs/$NAME/$NAME-shake.gif; done
```

## one-off-script
```shell
NAME=mike && \
echo $NAME && \
(/bin/rm -f $NAME/$NAME-roll.gif || true) && \
<gifs/$NAME/$NAME.png gif crop | gif roll | gif optimize --kb 127 >gifs/$NAME/$NAME-roll.gif && \
(/bin/rm -f $NAME/$NAME-wobble.gif || true) && \
<gifs/$NAME/$NAME.png gif crop | gif wobble | gif optimize --kb 127 >gifs/$NAME/$NAME-wobble.gif && \
(/bin/rm -f $NAME/$NAME-shake.gif || true) && \
<gifs/$NAME/$NAME.png gif shake -a 28 -f 3 | gif optimize --kb 127 >gifs/$NAME/$NAME-shake.gif
```
