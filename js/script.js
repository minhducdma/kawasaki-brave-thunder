$(document).ready(function () {
    resizeWindow();
    eventListener();
    scrollAnimation();
});

function eventListener() {
    $(window).resize(function () {
        resizeWindow();
    });
    $(function () {
        $('.div-entertaiment a[href*=\\#]:not([href=\\#])').on('click', function () {
            $('.div-entertaiment a').removeClass('seleted');
            $(this).addClass('seleted');
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.substr(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 500);

                openMobileMenu();

                return false;
            }
        });
    });
}

function backToTop() {
    $('html,body').animate({
        scrollTop: $('#div-entertaiment').offset().top
    }, 500);
}

function resizeWindow() {
    var currentWidth = window.screen.width;
    //setWidthHeader(currentWidth);
    setWidthVideo(currentWidth);
}

function setWidthHeader(currentWidth) {
    $('.div-entertaiment .div-header-menu').width(currentWidth);
    $('body').width(currentWidth);
    //autoPlayVideo();
}

function setWidthVideo(currentWidth) {
    if (currentWidth > 480)
        $('.div-entertaiment .div-video-bg .div-video-data video').width(currentWidth * 0.75);
    else{
        $('.div-header-menu-mobile').css("display", "block");
        $('.div-header-menu-mobile').width($('body').width());
    }
}
function openMobileMenu() {
    var x = document.getElementById("menu-list-mobile");
    if (x.style.display === "block") {
        x.style.display = "none";
        $("#iClMenu").removeClass('fa-close');
        $("#iClMenu").addClass('fa-bars');
    } else {
        x.style.display = "block";
        $("#iClMenu").removeClass('fa-bars');
        $("#iClMenu").addClass('fa-close');
    }
}
function autoPlayVideo() {
    var vid = document.getElementById("videobg");
    vid.autoplay = true;
    vid.load();
}
function scrollAnimation() {
    var lstDiv = [
        {name:'div-play',isLoad:false},
        {name:'div-arena-food',isLoad:false},
        {name:'div-event',isLoad:false},
        {name:'div-hight-light',isLoad:false},
        {name:'div-pick-up',isLoad:false},
        {name:'div-sns',isLoad:false}
    ];
    window.addEventListener("scroll", (event) => {
        let scroll = this.scrollY;
        if(lstDiv.filter(x=>x.isLoad == false) == 0)
            return;
        else
            for(var i in lstDiv){
                var divPos = $('#'+lstDiv[i].name);
                if(scroll >= (divPos.position().top-800) && lstDiv[i].isLoad == false){
                    var arrChild = $(divPos).find('[class*=kw-paused]');
                    loadDivAnimation(arrChild);
                    lstDiv[i].isLoad = true;
                }
            }
        
    });
}
function loadDivAnimation(childElements){
    childElements.each(function(i){
        $(this).removeClass('kw-paused')
    })
}