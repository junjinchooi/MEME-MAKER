const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d")
canvas.width = 800;
canvas.height = 800;

// fillRect() -> fill() + rect()
// rect() -> moveTo() + lineTo()
//moveTo(x, y); -> 브러쉬의 좌표를 움직임
//lineTo(x, y) -> 라인을 그림

// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 150);
// ctx.lineTo(50, 50);
// ctx.fill();                      // 내부 색을 채움 
                                    //cf) ctx.stroke(); 그은 선을 보여줌(색X)

ctx.fillRect(200, 200, 50, 200);    //왼쪽 벽 만들기
ctx.fillRect(400, 200, 50, 200);    //오른쪽 벽 만들기
ctx.lineWidth = 2;                  //선 굵기 조절
ctx.strokeRect(300, 300, 50, 100);  //문 만들기
ctx.fillRect(200, 200, 200, 20);    //천장 만들기
ctx.moveTo(200,200);                //지붕 만들기 위해 브러쉬 이동
ctx.lineTo(325,100);
ctx.lineTo(450,200);                //선만 그린것! (stroke/ fill로 색을 입혀야 됨)
ctx.fill();                         //지붕 채우기 