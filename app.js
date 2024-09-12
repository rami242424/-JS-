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
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
// 그리면서 틀 밖으로 나갔다가 들어오면 클릭없이도 계속선이 그어지는 에러 해결코드
canvas.addEventListener("mouseleave", cancelPainting);

// range가 변하는 것을 감지할 eventListener
lineWidth.addEventListener("change", onLineWidthChange);

// color가 변하는 것을 감지할 eventListener
color.addEventListener("change", onColorChange);