'use strict';

let gCanvas;
let gCtx;
// var gCurrShape = 'text'

function init() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderCanvas();
}


function renderCanvas() {
    const elImg = new Image()
    var imgNum = gMeme.selectedImgId;
    elImg.src = `img/${imgNum}.jpg`;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
        // drawText("Hello World", 250, 60);
        drawText(gMeme.lines[0].txt, 250, 60);
    }
}

// function drawArc() { //just for testing
//     gCtx.arc(100, 75, 50, 0, 2 * Math.PI);
//     gCtx.fillStyle = 'red'
//     gCtx.fill();
// }

function drawText(txt, x, y) {
    // console.log(txt);
    // gCtx.fillStyle = 'orange'
    // gCtx.fillStyle = '#fff'
    // gCtx.strokeStyle = 'green'
    // gCtx.lineWidth = 2
    gCtx.font = "60px Impact";
    gCtx.textAlign = 'center';
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function onAddTxt() {
    var elTxt = document.querySelector('input[name=memeTxt]');
    var txt = elTxt.value;
    console.log(txt)
    elTxt.value = '';
    gMeme.lines[0].txt = txt;
    console.log(gMeme);
    renderCanvas();
    console.log(gMeme);
}

function updateImgMm(elImg){
console.log(elImg.dataset.id);
gMeme.selectedImgId = elImg.dataset.id;
renderCanvas();
}