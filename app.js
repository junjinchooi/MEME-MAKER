const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d")
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = 2;
let ispainting = false; 

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
//     ctx.beginPath();                            //경로구분) 색깔을 바꿔줘야 한다?=> 새로운 Path가 필요한가?
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
}
canvas.addEventListener("mousemove", onMove); 
canvas.addEventListener("mousedown", startPainting);//mousedown: 마우스를 누른 채로 있는 것/cf)click: 마우스를 눌렀다가 뗐을 때
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);