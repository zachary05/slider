    //获取元素
var wrap = document.getElementById('wrap'),
    lastfn = document.getElementById('last'),
    nextfn = document.getElementById('next'),
    lis = document.querySelectorAll('#content li'),
    middle = document.getElementById('middle'),
    imgs = document.getElementsByTagName('img'),
    imgWidth = imgs[0].offsetWidth, //每张图片的宽

    //声明一个计时器
    timer = null,

    //声明一个计数的量
    index = 1;

function nextPage() {
    index++;
    middle.style.left = (-1) * index * imgWidth + 'px';
    middle.style.transitionDuration = '1s';

    if (index === 6) {
        setTimeout(function () {
            middle.style.transitionDuration = '0s';
            middle.style.left = '-' + imgWidth + 'px';
            index = 1;
        }, 1000)
    }

    //圆点效果
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.backgroundColor = '';
    }
    if (index >= 6) {
        lis[0].style.backgroundColor = '#9c9c9c';
    }else {
        lis[index - 1].style.backgroundColor = '#9c9c9c';
    }
}

function lastPage() {
    index--;
    middle.style.transitionDuration = '1s';
    middle.style.left = (-1) * index * imgWidth + 'px';

    if (index <= 0) {
        setTimeout(function () {
            middle.style.transitionDuration = '0s';
            middle.style.left = '-3000px';

            index = 5;
        }, 1000);
    }

    //圆点效果
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.backgroundColor = '';
    }
    if (index <= 0) {
        lis[4].style.backgroundColor = '#9c9c9c';
    }else {
        lis[index - 1].style.backgroundColor = '#9c9c9c';
    }
}

function timeFn() {
    clearInterval(timer);
    timer = setInterval(function () {
        nextPage();
    }, 2000);
}
timeFn();

nextfn.onclick = function () {
    nextPage();
    timeFn();
}
lastfn.onclick = function () {
    lastPage();
    timeFn();
}

//鼠标移入，动画停止，显示翻页图标
wrap.onmouseover = function () {
    clearInterval(timer);
    lastfn.style.opacity = '1';
    nextfn.style.opacity = '1';
}

//鼠标移出，动画开始，隐藏翻页图标
wrap.onmouseout =function () {
    timeFn();
    lastfn.style.opacity = '0';
    nextfn.style.opacity = '0';
}

// 圆点hover效果
for (var i = 0; i < lis.length; i++) {
    lis[i].index = i + 1;
    lis[i].onmouseover = function () {
        timeFn();
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.backgroundColor = '';
        }
        this.style.backgroundColor = '#9c9c9c';
        middle.style.left = (-1) * this.index * imgWidth + 'px';
    }
}
