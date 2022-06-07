let ds = [50, 20, 45];

// $(document).mousemove(function(){
//     areMenuAnimationsOn = true;
// });

function is_touch_enabled() {
    return ( 'ontouchstart' in window ) || 
            ( navigator.maxTouchPoints > 0 ) ||
            ( navigator.msMaxTouchPoints > 0 );
}

var areMenuAnimationsOn = !is_touch_enabled();

function newLocIcon(el, left, top) {
    el.css("margin-left", left);
    el.css("margin-top", top);

    let txt = el.parent().find(".text");
    txt.css("margin-left", left);
    txt.css("margin-top", top + 35);
}

$(".icon").mousemove(function(e){
    if (!areMenuAnimationsOn) return;

    var offset = $(this).offset();
    var width = $(this).width();
    var height = $(this).height();

    var centerX = offset.left + width / 2;
    var centerY = offset.top - $(window).scrollTop() + height / 2;

    console.log(centerY);

    let xdiff = centerX - e.clientX;
    let ydiff = centerY - e.clientY;

    // newLocIcon($(this), -xdiff, -ydiff);
    newLocIcon($(this), -xdiff, -ydiff);
    
    let txt = $(this).parent().find("text");
    txt.css("margin-left", -xdiff);
    txt.css("margin-top", -ydiff);

    let item = $(this).parent();
    let cur = $(this);
    $(".icon").each(function(index) {
        if (!$(this).is(cur)) {
            let left = index < cur.parent().index()
            let sign = left ? -1 : 1;

            let xdiff = centerX - e.clientX;
            let ydiff = centerY - e.clientY;

            let offset = 0;
            let start = left ? index : cur.parent().index();
            let end = left ? cur.parent().index() : index;
            for (var di = start; di < end; di++) {
                offset += ds[di];
            }

            newLocIcon($(this), sign * offset - xdiff / 2, - ydiff / 2);
        }
    });
});

$(".item").hover(function() {
    if (!areMenuAnimationsOn) return;

    $(".menu .item .text").show();
    $(".menu-wrapper").css("height", 60);
}, function() {
    if (!areMenuAnimationsOn) return;

    $(".menu .item .text").hide();
    $(".icon").css("margin", 0);
    $(".menu-wrapper").css("height", 30);
});
