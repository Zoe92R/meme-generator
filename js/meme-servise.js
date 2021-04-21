'use strict';



var gMeme;

function createGMeme() {
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Top text go here',
                size: 50,
                align: 'center',
                font: 'Impact',
                color: 'white',
                stroke: 'black',
                pos: {
                    x: 250,
                    y: 0
                }
            },
            {
                txt: 'Bottom text go here',
                size: 50,
                align: 'center',
                font: 'Impact',
                color: 'white',
                stroke: 'black',
                pos: {
                    x: 250,
                    y: 450
                }
            }
        ]
    }
}

function addLine() {
    var line = {
        txt: 'Add text here',
        size: 50,
        align: 'center',
        font: 'Impact',
        color: 'white',
        stroke: 'black',
        pos: {
            x: 250,
            y: 200
        }
    }
    gMeme.lines.push(line);
}

