$(function () {
    $(".form input").focus(function () {
        $(this).parent().addClass("input-hint").removeClass("error-hint");
        $(this).parent().find(".error-text").stop().slideUp(200);
    }).blur(function () {
        $(this).parent().addClass("error-hint").removeClass("input-hint");
        $(this).parent().find(".error-text").slideDown(200);
    });
    $(".input").click(function() {
        var _this = $(this);
        _this.keydown(function() {
            _this.siblings(".prompt-text").hide();
        });
    });
    $(".input").blur(function() {
        var _this = $(this);
        var _p = _this.siblings(".prompt-text");
        if (_this.val().length <= 0) {
            _p.show();
        } else {
            _p.hide();
        }
    });
    document.onkeyup = function (e){
        e = e || window.event;
        var code = e.which || e.keyCode;
        if (code == 9){
            $(".input").keydown(function() {
                $(".prompt-text").hide();
            });
        }
    };
})