'use strict';

let gCanvas;
let gCtx;
let gRowNum = 0;
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
        drawText(0, gMeme.lines[0].txt, gPos0.x, gPos0.y);
        drawText(1, gMeme.lines[1].txt, gPos1.x, gPos1.y);
        // drawRect();
    }
}

// function drawArc() { //just for testing
//     gCtx.arc(100, 75, 50, 0, 2 * Math.PI);
//     gCtx.fillStyle = 'red'
//     gCtx.fill();
// }

// function drawRect() {
//     gCtx.strokeStyle = "red";
//     con.lineWidth = "2";
//     // con.fillRect(10, 10, 180, 80);
//     con.strokeRect(10, 110, 180, 80);
// }


function drawText(rowNum, txt, x, y) {
    // console.log(txt);
    // gCtx.fillStyle = '#fff'
    // gCtx.lineWidth = 2
    // gCtx.font = `${gMeme.lines[0].size}px Impact`;
    // gCtx.font = `${gMeme.lines[1].size}px Impact`;
    gCtx.font = `${gMeme.lines[rowNum].size}px ${gMeme.lines[rowNum].font}`;
    gCtx.textAlign = `${gMeme.lines[rowNum].align}`;
    gCtx.fillStyle = `${gMeme.lines[rowNum].color}`;
    gCtx.strokeStyle = `${gMeme.lines[rowNum].stroke}`;
    // gCtx.textAlign = 'center';
    // gCtx.strokeStyle = 'white';
    gCtx.textBaseline = 'top';
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);

}

function onFocusLine() {
    gRowNum = (gRowNum === 0) ? 1 : 0;
}

function onUpdateTxt() {
    var elTxt = document.querySelector('input[name=txt]');
    var txt = elTxt.value;
    gMeme.lines[gRowNum].txt = txt;
    renderCanvas();
}

function onUpdateImgMm(elImg) {
    gMeme.selectedImgId = elImg.dataset.id;
    onOpenMmModal();
    renderCanvas();
}

function onFontFamily(font) {
    console.log(font);
    gMeme.lines[gRowNum].font = font;
    renderCanvas();
}

function onIncreaseFont() {
    gMeme.lines[gRowNum].size += 2;
    renderCanvas();
}

function onDecreaseFont() {
    gMeme.lines[gRowNum].size -= 2;
    renderCanvas();
}

function onRowDown() {
    var getPos = (gRowNum === 0) ? gPos0 : gPos1;
    getPos.y += getPos.rowJump;
    renderCanvas();
}

function onRowUp() {
    var getPos = (gRowNum === 0) ? gPos0 : gPos1;
    getPos.y -= getPos.rowJump;
    renderCanvas();
}

function onSwitchLines() {
    [gPos0.y, gPos1.y] = [gPos1.y, gPos0.y];
    renderCanvas();
}

function onLeftTxt() {
    // gCanvas.setAttribute('dir','ltr');
    gMeme.lines[gRowNum].align = 'right';
    renderCanvas();
}

function onRightTxt() {
    console.log('to right');
    // gCanvas.setAttribute('dir','rtl');
    // gCtx.direction = 'rtl'
    gPos0.x = gCanvas.width / 2;
    // gPos0.x = 0;
    gMeme.lines[gRowNum].align = 'left';
    ///to fix this
    renderCanvas();
}

function onCenterTxt() {
    gPos0.x = gCanvas.width / 2;
    gMeme.lines[gRowNum].align = 'center';
    renderCanvas();
}

function onDeleteTxt() {
    gMeme.lines[gRowNum].txt = '';
    renderCanvas();
}

function onColorTxt(color) {
    gMeme.lines[gRowNum].color = color;
    renderCanvas();
}


function onStroke(stroke) {
    console.log(stroke);
    gMeme.lines[gRowNum].stroke = stroke;
    renderCanvas();
}

function onOpenMmModal() {
    var elModal = document.querySelector('.meme-modal');
    elModal.hidden = false;
    // var elModalMode = document.querySelector('.modal-mode');
    document.body.classList.add("modal-mode");
}

function onCloseMeme() {
    var elModal = document.querySelector('.meme-modal');
    document.body.classList.remove("modal-mode");
    elModal.hidden = true;
}

