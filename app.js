const colorOptions = Array.from(document.getElementsByClassName("color-option"));
// const colorOptions = document.getElementsByClassName("color-option");
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;

let isPainting = false;

function onMove(event){
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    // ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(){
    isPainting = true;
}

function cancelPainting(){
    ctx.beginPath();
    isPainting = false;
}

function onLineWidthChange(event){
    // console.log(event.target.value);
    ctx.lineWidth = event.target.value;
}

function onColorChange(event){
    // console.log(event.target.value);
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

// 어떤 컬러가 클릭되었는지 확인하는 함수
function onColorClick(event){
    const colorValue = event.target.dataset.color; 
    // console.dir(event.target.dataset.color);
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    // 선택한 컬러를 인풋에도 보여주기
    color.value = colorValue;
}



canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
// 그리면서 틀 밖으로 나갔다가 들어오면 클릭없이도 계속선이 그어지는 에러 해결코드
canvas.addEventListener("mouseleave", cancelPainting);

// range가 변하는 것을 감지할 eventListener
lineWidth.addEventListener("change", onLineWidthChange);

// color가 변하는 것을 감지할 eventListener
color.addEventListener("change", onColorChange);

// 모든 각 컬러에 클릭하면 감지할 eventListener
colorOptions.forEach(color => color.addEventListener("click", onColorClick));