'use strict';

let gCanvas;
let gCtx;

function init() {
    renderGallry();
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    createGMeme();
    renderCanvas();
}

function renderGallry(imgs = []) {
    if (imgs.length === 0) imgs = getAllImgs();
    var strHtmls = imgs.map(function (img) {
        return `<img class="thumbnail-img" src=${img.url()} onclick="onUpdateImgMm(${img.id})">`
    });
    document.querySelector('.gallery-grid').innerHTML = strHtmls.join('');
}

function onSearchImg(searchWord){
    var imgsSearched = searchImg(searchWord);
    renderGallry(imgsSearched);
}


function getWord(elWord){
    console.log(elWord);
}

function renderCanvas(isDownload = false) {
    const elImg = new Image()
    var imgNum = gMeme.selectedImgId;
    elImg.src = `img/${imgNum}.jpg`;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
        if (gIsLines) {
            var rowNum = gMeme.selectedLineIdx;
            if (!isDownload) {
                drawRect(gMeme.lines[rowNum].pos.y);
                console.log('inside renderCanvas= false, not download');
            } else {
                console.log('inside renderCanvas= true, download');
            }
            gMeme.lines.forEach((line, index) => {
                drawText(index, line.txt, line.pos.x, line.pos.y);
            });
        }
    }
}

function drawText(rowNum, txt, x, y) {
    gCtx.font = `${gMeme.lines[rowNum].size}px ${gMeme.lines[rowNum].font}`;
    gCtx.textAlign = gMeme.lines[rowNum].align;
    gCtx.fillStyle = gMeme.lines[rowNum].color;
    gCtx.strokeStyle = gMeme.lines[rowNum].stroke;
    gCtx.lineWidth = 4;
    gCtx.textBaseline = 'top'; 
    gCtx.strokeText(txt, x, y);
    gCtx.fillText(txt, x, y);
}

function onFocusLine() {
    focusLine();
    renderCanvas();
    renderInputBox();
}

function onAddLine() {
    addLine();
    renderCanvas();
    renderInputBox();
}

function onUpdateTxt() {
    var elTxt = document.querySelector('input[name=txt]');
    var txt = elTxt.value;
    updateTxt(txt);
    renderCanvas();
}

function drawRect(y) {
    gCtx.beginPath();
    gCtx.rect(0, y, gCanvas.width, gMeme.lines[gMeme.selectedLineIdx].size);
    gCtx.fillStyle = 'rgba(255,255,255, 0.4)';
    gCtx.fill();
}

function onUpdateImgMm(ImgId) {
    createGMeme();
    gMeme.selectedImgId = ImgId;
    onOpenMmModal();
    renderCanvas();
}

function onChangeFont(font) {
    changeFont(font);
    renderCanvas();
}

function onChangeFontSize(mult) {
    changeFontSize(mult);
    renderCanvas();
}

function onMoveRow(direction) {
    moveRow(direction);
    renderCanvas();
}

function onAlignTxt(align) {
    alignTxt(align);
    renderCanvas();
}

function onDeleteTxt() {
    deleteTxt();
    focusLine();
    renderCanvas();
}

function onColorTxt(color) {
    colorTxt(color);
    renderCanvas();
}

function onStrokeTxt(stroke) {
    strokeTxt(stroke);
    renderCanvas();
}

function onOpenMmModal() {
    var elModal = document.querySelector('.modal');
    elModal.hidden = false;
    window.scrollTo(0, 0);
    var elGallery = document.querySelector('.gallery-container');
    elGallery.style.display = "none";
}

function onCloseMeme() {
    var elModal = document.querySelector('.modal');
    elModal.hidden = true;
    var elGallery = document.querySelector('.gallery-container');
    elGallery.style.display = "block";
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
    console.log('clicked on toggle')
}

function renderInputBox() {
    if (!gIsLines) return;
    var elBox = document.querySelector('.text-i');
    var defultTxt = ['Top text go here', 'Bottom text go here', 'Add text here'];
    var currTxt = gMeme.lines[gMeme.selectedLineIdx].txt;
    if (defultTxt.indexOf(currTxt) === -1) {
        elBox.value = gMeme.lines[gMeme.selectedLineIdx].txt;
    } else {
        elBox.value = '';
        elBox.placeholder - 'write your text here';
    }
}

function onDownloadImg() {
    downloadImg()
}

function downloadImg() {
    var elLink = document.querySelector('.download');
    console.log()
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme';
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvas)
}
function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            onImageReady(img)
        }
        console.log('event.target.result', event.target.result);
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}

