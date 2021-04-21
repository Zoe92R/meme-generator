'use strict';

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [
    {
        id: 1,
        // url: `img/${gImgs[id]}.jpg`,
        keywords: ['happy']
    }
];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Top text go here',
            size: 50,
            align: 'center',
            font: 'Impact',
            color: 'white',
            stroke: 'black'
        },
        {
            txt: 'Bottom text go here',
            size: 50,
            align: 'center',
            font: 'Impact',
            color: 'white',
            stroke: 'black'
        }
    ]
}

var gPos0 = {
    x: 250,
    y: 0,
    // y: gMeme.lines[0].size,
    rowJump: gMeme.lines[0].size
}
var gPos1 = {
    x: 250,
    y: 450,
    rowJump: gMeme.lines[1].size
}

