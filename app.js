const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraserBtn = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
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
let isFilling = false;

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

// 모드를 변경하는 함수
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

function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 800, 800);
}

function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

function onFileChange(event){
    // console.dir(event.target);
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    console.log(url);
    const image = new Image(); // <img src=""/> 랑 동일
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, 800, 800);
        fileInput.value = null;
    }
}

function onDoubleClick(event){
    ctx.save(); // ctx의 현재 상태, 색상, 스타일 등 모든 것을 저장
    const text = textInput.value;
    ctx.lineWidth = 1;
    ctx.font = "68px serif";
    // ctx.strokeText(text, event.offsetX, event.offsetY);
    ctx.fillText(text, event.offsetX, event.offsetY);
    // console.log(event.offsetX, event.offsetY);
    ctx.restore(); // 저장해뒀던 버전으로 되돌리기 -> save와 restore사이에서는 어떤 수정을 하던 저장되지 않는다.
}

// 입력한 텍스트 더블클릭 할 떄
canvas.addEventListener("dblclick", onDoubleClick);

// canvas.onmousemove = onMove; 아래 코드와 같다.
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
// 그리면서 틀 밖으로 나갔다가 들어오면 클릭없이도 계속선이 그어지는 에러 해결코드
canvas.addEventListener("mouseleave", cancelPainting);

// 클릭시 화면 채우기
canvas.addEventListener("click", onCanvasClick);

// range가 변하는 것을 감지할 eventListener
lineWidth.addEventListener("change", onLineWidthChange);

// color가 변하는 것을 감지할 eventListener
color.addEventListener("change", onColorChange);

// 모든 각 컬러에 클릭하면 감지할 eventListener
colorOptions.forEach(color => color.addEventListener("click", onColorClick));

// mode 바꾸는 버튼 감지
modeBtn.addEventListener("click", onModeClick);

// Destroy 완전히 초기화
destroyBtn.addEventListener("click", onDestroyClick);

// 지우개
eraserBtn.addEventListener("click", onEraserClick);

// 첨부파일
fileInput.addEventListener("change", onFileChange);