const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
// const colorOptions = document.getElementsByClassName("color-option");
const color = document.getElementsById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;

let isPainting = false;
let isFilling = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY)
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting(){
    isPainting = true;
}
function cancelPainting(){
    isPainting = false;
}

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}

function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    // console.dir(event.target.dataset.color);
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;

    color.value = colorValue;
}

function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0, 0, 800, 800);
    }
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

// range 변화 감지할 이벤트리스너
canvas.addEventListener("change", onLineWidthChange);

// color 변화 감지할 이벤트리스너
color.addEventListener("change", onColorChange);

// 모든 각 컬러를 클릭하면 감지할 이벤트리스너
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

// mode를 바꾸는 버튼 감지하기
modeBtn.addEventListener("click", onModeClick);

// 클릭시 (fill) 화면 채우기
canvas.addEventListener("click", onCanvasClick);