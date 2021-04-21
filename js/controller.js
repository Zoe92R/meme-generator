'use strict';

let gCanvas;
let gCtx;

function init() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    createGMeme();
    renderCanvas();
}

function renderCanvas() {
    const elImg = new Image()
    var imgNum = gMeme.selectedImgId;
    elImg.src = `img/${imgNum}.jpg`;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
        // drawText(gMeme.lines[0].txt, 250,gMeme.lines[0].size);
        drawRect(gMeme.lines[gMeme.selectedLineIdx].pos.y);
        gMeme.lines.forEach(function (lineN, index) {
            drawText(index, lineN.txt, lineN.pos.x, lineN.pos.y);
        });
    }
}

function drawText(rowNum, txt, x, y) {
    // gCtx.fillStyle = '#fff'
    // gCtx.lineWidth = 2
    gCtx.font = `${gMeme.lines[rowNum].size}px ${gMeme.lines[rowNum].font}`;
    gCtx.textAlign = `${gMeme.lines[rowNum].align}`;
    gCtx.fillStyle = `${gMeme.lines[rowNum].color}`;
    gCtx.strokeStyle = `${gMeme.lines[rowNum].stroke}`;
    // if (rowNum >= 2) gCtx.textBaseline = 'middle';
    // else gCtx.textBaseline = 'top';
    gCtx.textBaseline = 'top'
    gCtx.strokeText(txt, x, y);
    gCtx.fillText(txt, x, y);
}

function onFocusLine() {
    var numberOfRows = gMeme.lines.length;
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx >= numberOfRows) gMeme.selectedLineIdx = 0;
    renderCanvas();
    renderInputBox();
}

function onAddLine() {
    addLine();
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    renderCanvas();
    renderInputBox();
}

function onUpdateTxt() {
    var elTxt = document.querySelector('input[name=txt]');
    var txt = elTxt.value;
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
    renderCanvas();
}
function drawRect(y) {
    gCtx.beginPath();
    // gCtx.rect(0, y-gMeme.lines[gMeme.selectedLineIdx].size/2, gCanvas.width, gMeme.lines[gMeme.selectedLineIdx].size);
    gCtx.rect(0, y, gCanvas.width, gMeme.lines[gMeme.selectedLineIdx].size);
    gCtx.fillStyle = 'rgba(255,255,255, 0.4)';
    gCtx.fill();
}

function onUpdateImgMm(elImg) {
    createGMeme();
    gMeme.selectedImgId = elImg.dataset.id;
    onOpenMmModal();
    renderCanvas();
}

function onFontFamily(font) {
    console.log(font);
    gMeme.lines[gMeme.selectedLineIdx].font = font;
    renderCanvas();
}

function onIncreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size += 2;
    renderCanvas();
}

function onDecreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 2;
    renderCanvas();
}

function onRowDown() {
    gMeme.lines[gMeme.selectedLineIdx].pos.y += gMeme.lines[gMeme.selectedLineIdx].size;
    renderCanvas();
}

function onRowUp() {
    gMeme.lines[gMeme.selectedLineIdx].pos.y -= gMeme.lines[gMeme.selectedLineIdx].size;
    renderCanvas();
}

// function onSwitchLines() {
//     [gPos0.y, gPos1.y] = [gPos1.y, gPos0.y];
//     renderCanvas();
// }

function onLeftTxt() {
    gMeme.lines[gMeme.selectedLineIdx].pos.x = 0;
    gMeme.lines[gMeme.selectedLineIdx].align = 'left';
    renderCanvas();
}

function onRightTxt() {
    gMeme.lines[gMeme.selectedLineIdx].pos.x = gCanvas.width;
    gMeme.lines[gMeme.selectedLineIdx].align = 'right';
    renderCanvas();
}

function onCenterTxt() {
    gMeme.lines[gMeme.selectedLineIdx].pos.x = gCanvas.width / 2;
    gMeme.lines[gMeme.selectedLineIdx].align = 'center';
    renderCanvas();
}

function onDeleteTxt() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    renderCanvas();
}

function onColorTxt(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
    renderCanvas();
}

function onStroke(stroke) {
    console.log(stroke);
    gMeme.lines[gMeme.selectedLineIdx].stroke = stroke;
    renderCanvas();
}

function onOpenMmModal() {
    var elModal = document.querySelector('.modal');
    elModal.hidden = false;
    // var elModalMode = document.querySelector('.modal-mode');
    document.body.classList.add("modal-mode");
}

function onCloseMeme() {
    var elModal = document.querySelector('.modal');
    document.body.classList.remove("modal-mode");
    elModal.hidden = true;
}

{/* <input class="text-i" type="text" id="txt" name="txt" oninput="onUpdateTxt()"
placeholder="Write your text here"> */}

function renderInputBox() {
    console.log('hello rneder box')
    var elBox = document.querySelector('.text-i');
    var defultTxt = ['Top text go here', 'Bottom text go here', 'Add text here'];
    var currTxt = gMeme.lines[gMeme.selectedLineIdx].txt;
    console.log(currTxt);
    console.log(elBox.placeholder)
    if (defultTxt.indexOf(currTxt) === -1) {
        console.log('not defult')
        elBox.value = gMeme.lines[gMeme.selectedLineIdx].txt;
    } else {
        elBox.value='';
        elBox.placeholder - 'write your text here';
    }
}