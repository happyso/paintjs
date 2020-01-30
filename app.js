
const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById("jsRange");

//getElementGetByID js range
//handleRangeChange
//if range range add event input  -> handleRangeChange
//

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;




function handleColorClick (event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}
let painting = false;

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


canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mouseleave', stopPainting);

if (range){
    range.addEventListener("input", handleRangeChange);
}

Array.from(colors).forEach((color)=>{
    color.addEventListener("click", handleColorClick);
});

function handleRangeChange(event) {
    const strokeSize = event.target.value;
    ctx.lineWidth = strokeSize;
}


//캔버스 컨텍스트 생성해주고 2d로
//컨텍스트에 stroke style 컬러를 먹여주고
//linewidth를 설정해준다.2.5
//startpainting 동작을 추가한다 painting = true;로

//그림판에서 선을 그려보시면 아시겠지만,
// MouseDown->MouseMove->MouseUp 이벤트를 이용하죠.

