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
        // drawText(gMeme.lines[0].txt, 250,gMeme.lines[0].size);
        drawText(0,gMeme.lines[0].txt, gPos0.x, gPos0.y);
        drawText(1,gMeme.lines[1].txt, gPos1.x, gPos1.y);

    }
}

// function drawArc() { //just for testing
//     gCtx.arc(100, 75, 50, 0, 2 * Math.PI);
//     gCtx.fillStyle = 'red'
//     gCtx.fill();
// }

function drawText(rowNum,txt, x, y) {
    // console.log(txt);
    // gCtx.fillStyle = 'orange'
    // gCtx.fillStyle = '#fff'
    // gCtx.strokeStyle = 'green'
    // gCtx.lineWidth = 2

    // gCtx.font = `${gMeme.lines[0].size}px Impact`;
    // gCtx.font = `${gMeme.lines[1].size}px Impact`;
    gCtx.font = `${gMeme.lines[rowNum].size}px Impact`;
    gCtx.textAlign = 'center';
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function onUpdateTxt(rowNum) {
    var name;
    name = (rowNum === 0)? 'firstTxt' : 'secondTxt';
    var elTxt = document.querySelector(`input[name=${name}]`)
    var txt = elTxt.value;
    console.log(txt);
    elTxt.value = '';
    gMeme.lines[rowNum].txt = txt;
    renderCanvas();
}

function updateImgMm(elImg) {
    gMeme.selectedImgId = elImg.dataset.id;
    renderCanvas();
}


function increaseFont() {
    console.log('clicked on increase');
    console.log(gMeme.lines[0].size);
    gMeme.lines[0].size++;
    renderCanvas();
}

function decreaseFont() {
    console.log('clicked on increase');
    console.log(gMeme.lines[0].size);
    gMeme.lines[0].size--;
    renderCanvas();
}

function rowDown() {
    gPos.y += gPos.rowJump;
    renderCanvas();
}

function rowUp() {
    gPos.y -= gPos.rowJump;
    renderCanvas();
}

function switchLines() {
    [gPos0.y , gPos1.y] = [gPos1.y , gPos0.y];
    renderCanvas();
}