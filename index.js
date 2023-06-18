let dragged;
let droppedon;
let totalMoves = 0;
const resetBtn = document.getElementById("reset-btn");
const imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

window.addEventListener("load", () => {
    init();
});

function init() {
    showImages();
}

function showImages() {
    const puzzleCont = document.getElementById("puzzle-container");
    for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            let img = document.createElement("img");
            img.src = "assets/images/img" + imgOrder.shift() + ".jpg";
            img.id = i.toString() + "-" + j.toString();
            puzzleCont.append(img);
            dragTile(img);
        }
    }
}

function dragTile(img) {
    img.addEventListener("dragstart", dragstart);
    img.addEventListener("dragover", dragover);
    img.addEventListener("dragenter", dragenter);
    img.addEventListener("dragleave", dragleave);
    img.addEventListener("drop", dragdrop);
    img.addEventListener("dragend", dragend);
}

function dragstart() {
    dragged = this;
}

function dragover(e) {
    e.preventDefault();
}
function dragenter(e) {
    e.preventDefault();
}
function dragleave(e) {
    e.preventDefault();
}

function dragdrop() {
    droppedon = this;
}

function dragend() {
    let draggedImgCoords = dragged.id.split("-");
    let x1 = parseInt(draggedImgCoords[0]);
    let y1 = parseInt(draggedImgCoords[1]);
    let droppedonImgCoords = droppedon.id.split("-");
    let x2 = parseInt(droppedonImgCoords[0]);
    let y2 = parseInt(droppedonImgCoords[1]);

    let moveLeft = x1 == x2 && y2 == y1 - 1;
    let moveRight = x1 == x2 && y2 == y1 + 1;
    let moveTop = x2 == x1 - 1 && y2 == y1;
    let moveDown = x2 == x1 + 1 && y2 == y1;

    if (moveRight || moveLeft || moveTop || moveDown) {
        let currimg = dragged.src;
        let otherimg = droppedon.src;
        dragged.src = otherimg;
        droppedon.src = currimg;
        totalMoves++;
    }

    const moves = document.getElementById("moves");
    moves.innerHTML = `Total Moves: &nbsp;${totalMoves}`;
}

resetBtn.addEventListener("click", () => {
    location.reload();
});
