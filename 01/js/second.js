var container = document.getElementById('container');
var cloud = document.getElementById('cloud');
var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;
var sun = document.querySelectorAll('.sun');
var win = document.getElementById('win');
var gameover = document.getElementById('gameover');
var moon= document.getElementById('moon');


cloud.style.top = height - 60 + "px";

//全局坐标变量
window.onload = Main;
var x;
//定位图片位置
function GetMouse(oEvent) {
    x = oEvent.clientX;
    cloud.style.left = (parseInt(x) - 100) + "px";

}
//入口
function Main() {
    //注册鼠标移动事件
    container.onmousemove = function() { GetMouse(event); }
}



function scroll(ball) {
    var speed = parseInt((Math.random() * 8) + 3, 10);
    var speed1 = parseInt((Math.random() * 8) + 3, 10);
    var ballL = parseInt(Math.random() * (width - 60), 10); //初始距左边的距离
    var ballH = parseInt(Math.random() * (height - 550), 10); //初始距上边的距离
    var maxL = width - ball.clientWidth; //临界值
    var maxH = height - 60 - ball.clientHeight; //临界值
    var time = null;
    var cloud = document.getElementById('cloud');


    function move() {
        ballL = ballL + speed;
        ballH = ballH + speed1;
        if (ballL >= maxL) { //临界值 碰到右边
            speed = -speed;
            
        }
        if (ballL <= 0) { //碰到左边
            speed = 10;
           
        }
        if (ballH <= 0) { //碰到上边
            speed1 = 10;
            
        }
        if (ballH >= maxH && ballL > parseInt(cloud.style.left) && ballL < parseInt(cloud.style.left) + 200) {
            speed1 = -speed1; //碰到云
            
        }


        if (ballH > height) { //掉下去消失
            ball.remove();
            gameover.style.display = "block";
        }


        var x1, y1;
        var x2 = new Array();
        var y2 = new Array();
        x1 = ballL;
        y1 = ballH;
        var time2 = null;
        for (var i = 0; i < sun.length; i++) {
            x2[i] = parseInt(getComputedStyle(sun[i]).left);
            y2[i] = parseInt(getComputedStyle(sun[i]).top);

            //判断盒子是否重合
            if (Math.pow(x1 - x2[i], 2) + Math.pow(y1 - y2[i], 2) <= 0.25 * Math.pow(ball.offsetWidth + sun[i].offsetWidth, 2)) {
                if (x1 < x2[i]) {
                    if (y1 < y2[i]) {
                        //小球对象在太阳的左上角
                        speed = -speed;
                        speed1 = -speed1;
                    } else if (y1 > y2[i]) {
                        //小球对象在太阳的左下角
                        speed = -speed;
                    } else {
                        //小球对象在太阳的正左方
                        speed = -speed;
                    }
                    sun[i].outerHTML = "";
                } else if (x1 > x2[i]) {
                    if (y1 < y2[i]) {
                        //小球对象在太阳的右上方
                        speed = 12;
                        speed1 = -speed1;
                    } else if (y1 > y2[i]) {
                        //小球对象在太阳的右下方
                        speed = 12;
                        speed1 = 12;
                    } else {
                        //小球对象在太阳正右方
                        speed = 12;
                    }
                    sun[i].outerHTML = "";
                } else if (y1 > y2[i]) {
                    //小球对象在太阳正下方
                    speed1 = 12;
                    sun[i].outerHTML = "";
                } else if (y1 < y2[i]) {
                    //小球对象在太阳正上方
                    speed1 = -speed1;
                    sun[i].outerHTML = "";
                }
            }
        }
        ball.style.left = ballL + "px";
        ball.style.top = ballH + "px";
        if (document.querySelectorAll('.sun').length <= 8) {
            clearInterval(time);
            win.style.display = "block";
           ball.remove();
            for (var i = 0; i < sun.length; i++) {
                sun[i].remove();
            }
            var moonmove =function() {
                moon.style.top=parseInt(getComputedStyle(moon).top)+ 2 +"px";
                if (parseInt(getComputedStyle(moon).top)==30) {
                    clearInterval(time2);
                }
            }

            time2=setInterval(moonmove,20);
         }

    }
    time = setInterval(move, 20);

}
document.querySelectorAll('.inner').forEach(function(element, index, x) {
    scroll(element);
})


var star = document.querySelectorAll('.star'); //流星的位置随机
for (var i = star.length - 1; i >= 0; i--) {
    star[i].style.top = parseInt((Math.random() * height * 0.5), 10) + "px";
    star[i].style.left = parseInt((Math.random() * width), 10) + "px";
}