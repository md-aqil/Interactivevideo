// custom select box 

(function () {
    $('select').each(function () {
        $(this).hide();
        makeElement($(this));
    });

    function makeElement(select) {
        var
            $div = $('<div />', {
                class: 'ui-select'
            }).insertAfter(select),
            $nav = $('<span />').click(function () {
                $(this).parent().toggleClass('open');
            }).appendTo($div),
            $el = $('<ul />').appendTo($div);
        select.find('option').map(function (i) {

            var li = $('<li />').append($(this).text());
            li.click(onSelect.bind($div, li, $(this).val(), select, $nav));
            if ($(this).attr('selected')) {
                li.addClass('selected');
            }
            var delay = i * 100 + 'ms';
            li.css({
                '-webkit-transition-delay': delay,
                '-moz-transition-delay': delay,
                '-o-transition-delay': delay,
                'transition-delay': delay
            });
            $el.append(li);
        });
        var selected = $el.find('li.selected');
        selected = selected.length ? selected.html() : $el.find('li:first-child').addClass('selected').html();
        $nav.html(selected);
        // addAnimateDelay($el);
    }

    function onSelect(li, value, select, $nav) {
        this.removeClass('open');
        li.addClass('selected').siblings().removeClass('selected');
        select.val(value).trigger('change');
        $nav.html(li.html());
    }
})();

// steps row


//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({
        opacity: 0
    }, {
        step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({
                'left': left,
                'opacity': opacity
            });
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".previous").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({
        opacity: 0
    }, {
        step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'left': left
            });
            previous_fs.css({
                'transform': 'scale(' + scale + ')',
                'opacity': opacity
            });
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".submit").click(function () {
    return false;
})


// dragable elements


// $(function () {
//    
//     $("#droppable").droppable({
//         drop: function (event, ui) {
//             $(this)
//                 .addClass("ui-state-highlight")
//                 .find("p")
//                 .html("Dropped!");
//         }
//     });
// });

var x = null;
//Make element draggable
$(".drag").draggable({
    helper: 'clone',
    cursor: 'move',
    tolerance: 'fit',
    revert: true,

});

$("#droppable").droppable({
    accept: '.drag',
    activeClass: "drop-area",
    drop: function (e, ui) {
        if ($(ui.draggable)[0].id != "") {
            x = ui.helper.clone();
            ui.helper.remove();
            x.draggable({
                helper: 'original',
                cursor: 'move',
                containment: '#droppable',
                tolerance: 'fit',
                drop: function (event, ui) {
                    $(ui.draggable).remove();
                }
            });

            x.resizable({
                maxHeight: $('#droppable').height(),
                maxWidth: $('#droppable').width()
            });
            x.addClass('remove');
            var el = $("<span><a href='Javascript:void(0)' class=\"xicon delete\" title=\"Remove\">X</a></span>");
            $(el).insertAfter($(x.find('img')));
            x.appendTo('#droppable');
            $('.delete').on('click', function () {
                $(this).parent().parent('span').remove();
            });
            $('.delete').parent().parent('span').dblclick(function () {
                $(this).remove();
            });
        }
    }
});

$("#remove-drag").droppable({
    drop: function (event, ui) {
        $(ui.draggable).remove();
    },
    hoverClass: "remove-drag-hover",
    accept: '.remove'
});

// range slider
$(".range--water")
    .noUiSlider({
        start: 1,
        step: 1,
        range: {
            min: 0,
            max: 35
        }
    })
    .noUiSlider_pips({
        mode: 'values',
        density: 5,
        values: [1, 32],
        stepped: true,
        format: wNumb({
            decimals: 0,
            //prefix: '+',
            postfix: ' range'
        })
    })
    .on('set', function (event, value) {
        if (value < 3) {
            $(this).val(3);
        } else if (value > 32) {
            $(this).val(32);
        }
    });

$(".range").Link('lower').to('-inline-<div class="tooltip"></div>', function (value) {
    $(this).html('<span>' + deneme(value) + "℃" + '</span>');
});

function deneme(value) {
    value = value | 0;
    return value;
}