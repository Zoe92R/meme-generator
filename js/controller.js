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
        if (gIsLines) {
            var rowNum = gMeme.selectedLineIdx;
            drawRect(gMeme.lines[rowNum].pos.y);
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
    gCtx.textBaseline = 'top'; /// to add textBaseline to gMeme
    // gCtx.textBaseline = gMeme.lines[rowNum].textBaseline;
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
    // gMeme.lines[gMeme.selectedLineIdx].txt = txt;
    renderCanvas();
}

function drawRect(y) {
    gCtx.beginPath();
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

function onAlignTxt(align){
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
    document.body.classList.add("modal-mode");
    window.scrollTo(0, 0);
    var elGallery = document.querySelector('.gallery-container');
    elGallery.style.display = "none";
}

function onCloseMeme() {
    var elModal = document.querySelector('.modal');
    document.body.classList.remove("modal-mode");
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

function downloadImg(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme';
}


// function resizeCanvas() {
//     var elContainer = document.querySelector('.canvas-container');
//     gCanvas.width = elContainer.offsetWidth
//     gCanvas.height = elContainer.offsetHeight
// }

// function myFunction(x) {
//         if (x.matches) { // If media query matches
//             // document.body.style.backgroundColor = "yellow";
//             window.addEventListener('resize', function () {
//                     gCanvas.width = window.innerWidth;
//                     gCanvas.height = window.innerWidth;
//                     // resizeCanvas();
//                     renderCanvas();
//                 })

//             } else {
//                     // document.body.style.backgroundColor = "pink";
//                 }
// }

// var x = window.matchMedia("(max-width: 700px)")
// console.log('lisener has added')
// myFunction(x) // Call listener function at run time
// x.addListener(myFunction)

