const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.fillRect(200, 200, 15, 100);
ctx.fillRect(400, 200, 15, 100);
ctx.fillRect(280, 200, 60, 200);

ctx.arc(310, 150, 50, 0, 2*Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(290, 150, 10, 0, 2*Math.PI);
ctx.arc(325, 150, 10, 0, 2*Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "red";
ctx.arc(308, 180, 8, 0, 1*Math.PI);
ctx.fill();