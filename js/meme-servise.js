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
            align: 'left',
            color: 'red'
        },
        {
            txt: 'Bottom text go here',
            size: 50,
            align: 'left',
            color: 'red'
        }
    ]
}

var gPos0 = {
    x: 250,
    y: gMeme.lines[0].size,
    rowJump: gMeme.lines[0].size
}
var gPos1 = {
    x: 250,
    y: 480,
    rowJump: gMeme.lines[1].size
}

