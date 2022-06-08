// ======== Скрипты ==========================
$('.burger').click(function () {
    $(this).toggleClass('show')
    $('.menu-mobile').toggleClass('show')
});
$('.menu-item, .menu-mobile a').click(function () {
    $(this).removeClass('show')
    $('.menu-mobile').removeClass('show')
});

$('.prices__tab').click(function (e) {
    e.preventDefault()
    $('.prices__tab').removeClass('active')
    $('.prices__item').removeClass('active')
    let id = $(this).attr('href')
    $(this).addClass('active')
    $(id).addClass('active')

});

const header = document.querySelector(".header");
const mainBlock = document.querySelector(".main").clientHeight;
console.log(mainBlock)

windows.addEventListener('scroll', function () {
    console.log(mainBlock)
    if (window.scrollY > Number(mainBlock)) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
});

// ======== Маска для телефона ===============
document.addEventListener("DOMContentLoaded", function () {
    var phoneInputs = document.querySelectorAll('input[type="tel"]');

    var getInputNumbersValue = function (input) {
        return input.value.replace(/\D/g, '');
    }

    var onPhonePaste = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        var pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            if (e.data && /\D/g.test(e.data)) {
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    var onPhoneKeyDown = function (e) {
        var inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (var phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }
});

//======== Аккардион =================
$.fn.accordion = function (options) {
    var settings = $.extend({
        autoCollapse: false
    }, options);

    var
        $accordion = $(this),
        blockName = $accordion.attr('data-block'),
        $items = $('.' + blockName + '__item', $accordion);

    $accordion.delegate('.' + blockName + '__title', 'click', triggerAccordion);

    function triggerAccordion() {
        var
            $that = $(this),
            $parent = $that.parent(),
            $content = $parent.children('.' + blockName + '__content'),
            isOpen = $that.hasClass('js-accordion--open'),
            autoCollapse = true,
            contentHeight = $content.prop('scrollHeight');

        if (isOpen) {
            $that.removeClass('js-accordion--open');
            $parent.removeClass('js-accordion--open');
            $content.css('height', contentHeight);
            setTimeout(function () {
                $content.removeClass('js-accordion--open').css('height', '');
            }, 4);
        } else {
            if (settings.autoCollapse) {
                //auto collapse open accordions
            }
            $('.accordion__title').removeClass('js-accordion--open');
            $('.accordion__item').removeClass('js-accordion--open');
            $('.accordion__content').css('height', $('.accordion__content').prop('scrollHeight'));
            $('.accordion__content').removeClass('js-accordion--open').css('height', '');

            $that.addClass('js-accordion--open');
            $parent.addClass('js-accordion--open');
            $content.addClass('js-accordion--open').css('height', contentHeight).one('webkitTransitionEnd', event, function () {
                if (event.propertyName === 'height') {
                    $(this).css('height', '');
                }
            });
        }
    }
};
$('#faq-accordion').accordion();


const swiperFooter = new Swiper('.footer-top__slider', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    // Navigation arrows
    navigation: {
        nextEl: '.footer-top__btn--next',
        prevEl: '.footer-top__btn--prev',
    },

    scrollbar: {
        el: '.footer-top__scrollbar',
    },
    keyboard: {
        enabled: true,
        onlyInViewport: false,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        1220: {
            slidesPerView: 3,
            spaceBetween: 55
        }
    }
});
