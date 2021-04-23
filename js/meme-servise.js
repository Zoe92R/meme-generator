'use strict';

var gMeme;
var gIsLines;

function createGMeme() {
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Top text go here',
                size: 40,
                align: 'center',
                // textBaseline: 'top',
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
                size: 40,
                align: 'center',
                // textBaseline: 'bottom',
                font: 'Impact',
                color: 'white',
                stroke: 'black',
                pos: {
                    x: 250,
                    y: 460
                }
            }
        ]
    }
    gIsLines = true;
}

function focusLine() {
    if (!gIsLines) return;
    var numberOfRows = gMeme.lines.length;
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx >= numberOfRows) gMeme.selectedLineIdx = 0;
    // console.log(gMeme.selectedLineIdx);
}

function addLine() {
    var line = {
        txt: 'Add text here',
        size: 40,
        align: 'center',
        // textBaseline: 'center',
        font: 'Impact',
        color: 'white',
        stroke: 'black',
        pos: {
            x: 250,
            y: 210
        }
    }
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    gIsLines = true;
    // console.log(gMeme.lines);
    // console.log(gMeme.selectedLineIdx);
}

function updateTxt(txt) {
    if (!gIsLines) return;
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function changeFont(font) {
    if (!gIsLines) return;
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function changeFontSize(mult) {
    gMeme.lines[gMeme.selectedLineIdx].size += mult * 2;
}

function moveRow(direction) {
    console.log('hello move row')
    if (!gIsLines) return;
    if (direction === 'up') {
        gMeme.lines[gMeme.selectedLineIdx].pos.y -= gMeme.lines[gMeme.selectedLineIdx].size;
    } else {
        gMeme.lines[gMeme.selectedLineIdx].pos.y += gMeme.lines[gMeme.selectedLineIdx].size;
    }
}

function deleteTxt(){
    if (!gIsLines) return;
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    console.log('after deleting there are _ lines:', gMeme.lines);
    if (gMeme.lines.length === 0) gIsLines = false;
}

function colorTxt(color){
    if (!gIsLines) return;
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function strokeTxt(stroke){
    if (!gIsLines) return;
    gMeme.lines[gMeme.selectedLineIdx].stroke = stroke;
}

function alignTxt(align){
    if (!gIsLines) return;
    if (align==='left'){
        gMeme.lines[gMeme.selectedLineIdx].pos.x = 0;
        gMeme.lines[gMeme.selectedLineIdx].align = 'left';
    } else if (align==='right'){
        gMeme.lines[gMeme.selectedLineIdx].pos.x = gCanvas.width;
        gMeme.lines[gMeme.selectedLineIdx].align = 'right'; 
    } else {
        gMeme.lines[gMeme.selectedLineIdx].pos.x = gCanvas.width / 2;
        gMeme.lines[gMeme.selectedLineIdx].align = 'center';
    }
}



