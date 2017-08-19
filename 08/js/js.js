var container = document.getElementById('container')

function scroll(ball) {
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;
    var speed = parseInt(Math.random() * 10, 10);
    var speed1 = parseInt(Math.random() * 10, 10);
    var ballL = parseInt(Math.random() * (width - 100), 10); //距左边的距离
    var ballH = parseInt(Math.random() * (height - 100), 10); //距上边的距离
    var maxL = width - ball.clientWidth; //临界值
    var maxH = height - ball.clientHeight; //临界值
    var time = null;

    function move() {
        ballL = ballL + speed;
        ballH = ballH + speed1;
        if (ballL >= maxL) { //临界值 碰到右边
            speed = -speed;
            ball.style.background = "#AAFFEE";
        }
        if (ballL <= 0) { //碰到左边
            speed = 10;
            ball.style.background = "#CCBBFF";
        }
        if (ballH >= maxH) {
            speed1 = -speed1; //碰到下边
            ball.style.background = "#FFFFBB";
        }
        if (ballH <= 0) {
            speed1 = 10; //碰到上边
            ball.style.background = "#FFCCCC";
        }

        ball.style.left = ballL + "px";
        ball.style.top = ballH + "px";
    }
    time = setInterval(move, 20);
}
document.querySelectorAll('.inner').forEach(function(element, index, x) {
    scroll(element);
})