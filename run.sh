#!/bin/bash

NAME=$1
if [ -z "$NAME" ]
then
    echo "No 'face' name added"
else
    node index.js

    echo $NAME && \
    (/bin/rm -f $NAME/$NAME-roll.gif || true) && \
    <gifs/$NAME/$NAME.png ./gif crop | ./gif roll | ./gif optimize --kb 127 >gifs/$NAME/$NAME-roll.gif && \
    (/bin/rm -f $NAME/$NAME-wobble.gif || true) && \
    <gifs/$NAME/$NAME.png ./gif crop | ./gif wobble | ./gif optimize --kb 127 >gifs/$NAME/$NAME-wobble.gif && \
    (/bin/rm -f $NAME/$NAME-intensifies.gif || true) && \
    <gifs/$NAME/$NAME.png ./gif shake -a 10 -f 1 | ./gif optimize --kb 127 >gifs/$NAME/$NAME-intensifies.gif


fi
