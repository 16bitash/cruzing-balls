let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

let mouse = {
    x: undefined,
    y: undefined
};

addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    //re-initialize object array
    circleArr = [];
    for (let i = 0; i < 300; i++) {
        let radius = Math.floor(Math.random() * 20);
        let x = (Math.random() * (canvasWidth - 2 * radius)) + radius;
        let dx = (Math.random() - 0.5) * 10;
        let y = (Math.random() * (canvasHeight - 2 * radius)) + radius;
        let dy = (Math.random() - 0.5) * 10;
        let circle = new Circle(x, y, dx, dy, radius, radius);
        circleArr.push(circle)
    }
});

let circleArr = [];
let maxRadius = 100;
let colorArr = [
    "#1C1D21",
    "#31353D",
    "#445878",
    "#92CDCF",
    "#EEEFF7"
];

function Circle(x, y, dx, dy, radius, minRadius) {
    this.x = x;
    this.dx = dx;
    this.y = y;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = minRadius;
    let color = colorArr[Math.floor(Math.random() * (colorArr.length))];
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();
    };
    this.update = function () {
        if (this.x > canvasWidth - this.radius || this.x < this.radius) {
            this.dx *= -1;
        }
        if (this.y > canvasHeight - this.radius || this.y < this.radius) {
            this.dy *= -1;
        }
        this.x += this.dx;
        this.y += this.dy;
        if (Math.abs(this.x - mouse.x) < 100 && Math.abs(this.y - mouse.y) < 100) {
            if (this.radius < maxRadius) {
                this.radius += 5;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 5;
        }
        this.draw();
    }
}

for (let i = 0; i < 300; i++) {
    let radius = Math.floor(Math.random() * 20);
    let x = (Math.random() * (canvasWidth - 2 * radius)) + radius;
    let dx = (Math.random() - 0.5) * 10;
    let y = (Math.random() * (canvasHeight - 2 * radius)) + radius;
    let dy = (Math.random() - 0.5) * 10;
    let circle = new Circle(x, y, dx, dy, radius, radius);
    circleArr.push(circle)
}

function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < circleArr.length; i++) {
        circleArr[i].update();
    }
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
