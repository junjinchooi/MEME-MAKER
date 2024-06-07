const textInput = document.getElementById("text"); 
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn"); 
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn"); 
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");     
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800; 

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineCap = "round"; 
ctx.lineWidth = lineWidth.value;        //Value=5로 지정(html 파일)
let ispainting = false; 
let isFilling = false; 

// fillRect() -> fill() + rect()
// rect() -> moveTo() + lineTo()
// moveTo(x, y); -> 브러쉬의 좌표를 움직임
// lineTo(x, y) -> 라인을 그림

// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 150);
// ctx.lineTo(50, 50);
// ctx.fill();                      // 내부 색을 채움 
                                    //cf) ctx.stroke(); 그은 선을 보여줌(색X)

// ctx.fillRect(200, 200, 50, 200);    //왼쪽 벽 만들기
// ctx.fillRect(400, 200, 50, 200);    //오른쪽 벽 만들기
// ctx.lineWidth = 2;                  //선 굵기 조절
// ctx.strokeRect(300, 300, 50, 100);  //문 만들기
// ctx.fillRect(200, 200, 200, 20);    //천장 만들기
// ctx.moveTo(200,200);                //지붕 만들기 위해 브러쉬 이동
// ctx.lineTo(325,100);
// ctx.lineTo(450,200);                //선만 그린것! (stroke/ fill로 색을 입혀야 됨)
// ctx.fill();                         //지붕 채우기 

// ctx.fillRect(210-40, 200-20, 15, 100);      //왼쪽 팔 만들기 
// ctx.fillRect(350-40, 200-20, 15, 100);      //오른쪽 팔 만들기 
// ctx.fillRect(260-40, 200-20, 60, 200);      //몸통 만들기 

// ctx.arc(250, 100, 50, 0, 2 * Math.PI);      //원 만들기 (X시작, Y시작, 반지름, 시작 앵글, 마침 앵글)
// ctx.fill();

// ctx.beginPath();                            //경로구분)색깔을 바꿔줘야 한다?=> 새로운 Path가 필요한가?
// ctx.fillStyle = "White";                    //색깔 지정시 대소문자or 오타 or 띄어쓰기 주의할 것!
// ctx.arc(260+10, 80, 8, Math.PI, 2 * Math.PI);
// ctx.arc(220+10, 80, 8, Math.PI, 2 * Math.PI);
// ctx.fill(); 

// ctx.lineWidth = 2;                           //20240524_2.0 

// const colors = [                                //색깔 참조 사이트: https://flatuicolors.com/palette/ru
//     "#f3a683",
//     "#f7d794",
//     "#778beb",
//     "#e77f67",
//     "#cf6a87"
// ];

// function onclick(event) {
//     ctx.beginPath();                            //경로구분) 색깔을 바꿔줘야 한다?=> 새로운 Path가 필요한가?(모든 line은 같은 path로 그려짐)
//     ctx.moveTo(0,0);                            //시작 위치: 왼쪽 끝 설정
//     const color = colors[Math.floor(Math.random()*colors.length)];//위의 5가지 색깔이 랜덤으로 출력
//     ctx.strokeStyle = color;
//     ctx.lineTo(event.offsetX, event.offsetY);
//     ctx.stroke();                                
// }

// canvas.addEventListener("mousemove", onclick);

function onMove(event) {                            //20240527_2.1                    
    if (ispainting){                                //true: stroke로 선을 그리고 함수 끝내줌
        ctx.lineTo(event.offsetX, event.offsetY);    
        ctx.stroke();                               //그은 선을 보여줌(색X)
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);       //flase: 브러쉬만 움직여줌
}
function startPainting(){
    ispainting = true;
}
function cancelPainting(){
    ispainting = false;
    ctx.beginPath();                                //그려진 선과 새로운 선의 연결을 끊어줌-새로운 경로 시작  
}
function onLinewidthChange(event){
    console.log(event.target.value);
    ctx.lineWidth = event.target.value;
}

function onColorChange(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;                   //선
    ctx.fillStyle = colorValue;                     //채우기
    color.value = colorValue;
}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;       
    ctx.fillStyle = colorValue; 
    color.value = colorValue; 
}

function onModeClick(){
    if(isFilling){
        isFilling= false; 
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true; 
        modeBtn.innerText = "Draw"; 
    }
}

function onCanvasClick() {
    if(isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);               //캔버스 채우기 
    }
}

function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); 
}

function onEraserClick(){
    ctx.strokeStyle = "white"; 
    isFilling = false; 
    modeBtn.innerText = "Fill";
}

function onFileChange(event) {                      //이미지 추가 
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image()
    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null; 
    };
}

function onDoubleClick(event) {
    if (text !== "") {
        ctx.save();                                     //ctx의 현재 상태, 색상, 스타일 모든 것을 저장
        const text = textInput.value;                   //상태 수정 시작
        ctx.lineWidth = 1; 
        ctx.font = "68px serif"; 
        ctx.fillText(text, event.offsetX, event.offsetY); 
        ctx.restore();                                  //이전에 저장된 상태로 돌아감
    }
}

canvas.addEventListener("dblclick", onDoubleClick); 
canvas.addEventListener("mousemove", onMove); 
canvas.addEventListener("mousedown", startPainting);//mousedown: 마우스를 누른 채로 있는 것/cf)click: 마우스를 눌렀다가 뗐을 때
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick); 


lineWidth.addEventListener("change", onLinewidthChange)//이벤트 리스너(선 굵기) 만들기 
color.addEventListener("change", onColorChange);       //이벤트리스너(색깔 바) 만들기 

colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange); 