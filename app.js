const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d")
canvas.width = 800;
canvas.height = 800;

// fillRect() -> fill() + rect()
// rect() -> moveTo() + lineTo()

ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
ctx.lineTo(150, 150);
ctx.lineTo(50, 150);
ctx.lineTo(50, 50);
ctx.fill();         // 내부 색을 채움