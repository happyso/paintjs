
const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const defaultColor = "#2c2c2c";
const canvasSize = 700;

canvas.width = canvasSize;
canvas.height = canvasSize;
ctx.fillStyle = "white";
ctx.fillRect(0,0, canvasSize, canvasSize);
ctx.strokeStyle = defaultColor;
ctx.fillStyle = defaultColor;
ctx.lineWidth = 2.5;


let filling = false;
let painting = false;


function handleColorClick (event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}


function handleModeClick() {
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}
function handleRangeChange(event) {
    const strokeSize = event.target.value;
    ctx.lineWidth = strokeSize;
}


function startPainting () {
    painting = true;
}

function stopPainting() {
    painting = false;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function onMouseDown(){
    painting = true;
}

function onMouseUp(){
    stopPainting();
}
function handleCanvasClick(){
    if (filling === true) ctx.fillRect(0,0, canvasSize, canvasSize);
}
function handleContextMenu (event) {
    event.preventDefault();
}
function handleClickSave(){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS[🎨]";
    link.click();
}

canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mouseleave', stopPainting);
canvas.addEventListener('click', handleCanvasClick);
canvas.addEventListener('contextmenu', handleContextMenu);

if (range){
    range.addEventListener("input", handleRangeChange);
}

if (mode){
    mode.addEventListener("click", handleModeClick);
}

if (save){
    save.addEventListener('click', handleClickSave);
}

Array.from(colors).forEach((color)=>{
    color.addEventListener("click", handleColorClick);
});






//그림판에서 선을 그리면
// MouseDown->MouseMove->MouseUp 순서임

