$(function(){
    $(".prompt-text").click(function() {
        var _this = $(this);
        $(this).siblings(".input").focus();
        $(this).siblings(".input").keydown(function() {
            _this.hide();
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
});