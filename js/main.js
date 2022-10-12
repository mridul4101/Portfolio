var nav = document.getElementById("nav-toggle");
var bodyClass = document.getElementById("main");
var logo = document.getElementById("logo");
var logo_img = document.getElementById("logo-img");

function toggleNavbar() {
    bodyClass.classList.toggle("nav-active");
    logo.classList.toggle("logo-disappear");
    logo_img.classList.toggle("logo-disappear");

    if (bodyClass.classList.contains("nav-active")) {
        nav.className = "fa fa-times mobile-nav-toggle";
    } else {
        nav.className = "fa fa-bars mobile-nav-toggle";
    }
}

var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
};

window.onresize = function() {
    if(screen.width >= 1200 && bodyClass.classList.contains("nav-active")) {
        bodyClass.classList.toggle("nav-active");
        logo.classList.toggle("logo-disappear");
        logo_img.classList.toggle("logo-disappear");
        nav.className = "fa fa-bars mobile-nav-toggle";
    }
};