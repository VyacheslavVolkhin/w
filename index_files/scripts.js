$(document).ready(function () {

    //phone masked
    $('input[type="tel"]').mask("+7 (999) 999-99-99", {placeholder: "+7 (___) ___-__-__"});
    $('input[type="tel"]').on('click', function () {
        $(this).setCursorPosition(4);
    })
    $.fn.setCursorPosition = function (pos) {
        this.each(function (index, elem) {
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        });
        return this;
    };

    //popup block
    $('.js-popup-wrap .js-btn-toggle').on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('body').removeClass('menu-show').removeClass('menu-start').removeClass('menu-second');
            $('.main-menu-wrap li.open').removeClass('open');
        } else {
            $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
            $(this).addClass('active');
            if ($(this).parent().hasClass('main-menu-wrap')) {
                $('body').addClass('menu-show');
            }
        }
        return false;
    })
    $('.js-popup-wrap .js-btn-close').on('click', function () {
        $(this).parents('.js-popup-wrap').children('.js-btn-toggle').removeClass('active');
        $('body').removeClass('menu-show').removeClass('menu-start').removeClass('menu-second');
        $('.main-menu-wrap li.open').removeClass('open');
        return false;
    })
    $(document).click(function (event) {
        if ($(event.target).closest(".js-popup-block").length) return;
        $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
        $('body').removeClass('menu-show').removeClass('menu-start').removeClass('menu-second');
        $('.main-menu-wrap li.open').removeClass('open');
        event.stopPropagation();
    });
    $('.js-popup-wrap').each(function () {
        if ($(this).hasClass('js-popup-select')) {
            // alert(1)
            if ($(this).find('.js-popup-block').find('.active').length > 0) {
            } else {
                $(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
            }
            var currentSelect = $(this).find('.js-popup-block').find('.active').html();
            $(this).find('.js-btn-toggle').html(currentSelect);
        }
    })
    $('.js-popup-wrap.js-popup-select .js-popup-block a').on('click', function () {
        if ($(this).hasClass('active')) {
        } else {
            $(this).parents('.js-popup-wrap').find('.js-popup-block').find('.active').removeClass('active');
            $(this).addClass('active');
        }
        $('.js-popup-wrap').each(function () {
            if ($(this).hasClass('js-popup-select')) {
                if ($(this).find('.js-popup-block').find('.active').length > 0) {
                } else {
                    $(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
                }
                var currentSelect = $(this).find('.js-popup-block').find('.active').html();
                $(this).find('.js-btn-toggle').html(currentSelect);
            }
        })
        $(this).parents('.js-popup-wrap').find('.js-btn-toggle').removeClass('active');
        return false;
    })

    //item-video
    $('.js-video').each(function () {
        //let videoURL = $(this).attr('data-video');
        $(this).addClass('active');
        //$(this).append('<iframe width="100%" height="100%" src="' + videoURL + '" frameborder="0" allowfullscreen></iframe>')
    })


    //nav
    if (!!$('.nav').offset()) {
        var stickyTop = $('.nav').offset().top;
        $(window).scroll(function () {
            var windowTop = $(window).scrollTop();
            if (stickyTop < windowTop) {
                $('.wrap').addClass('header-fixed');
            } else {
                $('.wrap').removeClass('header-fixed');
            }
        });
    }
    //mobile menu many levels
    $('.main-menu-wrap .menu a').on('click', function () {
        if ($(window).innerWidth() < 768) {
            if ($(this).next('div').length > 0) {
                if ($(this).parent().hasClass('open')) {
                    $(this).parent().removeClass('open');
                    if ($('body').hasClass('menu-second')) {
                        $('body').removeClass('menu-second');
                    } else if ($('body').hasClass('menu-start')) {
                        $('body').removeClass('menu-start');
                    }
                } else {
                    $(this).parent().addClass('open');
                    if ($('body').hasClass('menu-start')) {
                        $('body').addClass('menu-second');
                    } else $('body').addClass('menu-start');
                }
                return false;
            }
        }
    })
    /*$('.main-menu-wrap li ul').each(function () {
        $(this).parent().addClass('submenu');
    })*/
    /*$('.main-menu-wrap .btn-menu').on('click', function () {
        if ($(this).next('.submenu-outer-wrap').length > 0) {
            if ($(window).innerWidth() < 768) {
                if ($(this).parent().hasClass('open')) {
                    $(this).parent().removeClass('open').children('.submenu-outer-wrap').slideUp(200);
                } else {
                    $('.main-menu-wrap li.open').removeClass('open').children('.submenu-outer-wrap').slideUp(200);
                    $(this).parent().addClass('open').children('.submenu-outer-wrap').slideDown(200);
                }
                return false;
            }
        }
    })
    $('.main-menu-wrap .submenu-wrap>li>a').on('click', function () {
        if ($(this).next('.submenu-inner').length > 0) {
            if ($(window).innerWidth() < 768) {
                if ($(this).parent().hasClass('open-inner')) {
                    $(this).parent().removeClass('open-inner').children('.submenu-inner').slideUp(200);
                } else {
                    $('.main-menu-wrap li.open-inner').removeClass('open-inner').children('.submenu-inner').slideUp(200);
                    $(this).parent().addClass('open-inner').children('.submenu-inner').slideDown(200);
                }
                return false;
            }
        }
    })*/


    //file input 
    $('body').on('click', '.js-field-file .js-file-button', function () {
        $(this).parent().find('input').click();
        return false;
    })
    $('body').on('change', '.js-field-file input[type=file]', function () {
        var fileName = ('' + $(this).val()).replace(/^.*[\ \/]/, '');
        if (fileName == "") {
            fileName = "Выбрать файл"
        }
        $(this).parent().addClass('active').find('.js-file-caption').html(fileName);
    });

    //tabs
    $('.js-tabs-nav').each(function () {
        $('.js-tab-block[data-tab*="' + $(this).find('.active').attr('data-tab') + '"]').addClass('active');
    })
    $('.js-tab-title').each(function () {
        if ($(this).hasClass('active')) {
            $(this).next('.js-tab-content').show(0);
            $(this).parent('.js-tab-block').addClass('tab-active');
        }
    })
    $('.js-tabs-nav li a').on('click', function () {
        if ($(this).hasClass('active')) {
        } else {
            $('.js-tab-block').removeClass('active');
            $(this).parents('.js-tabs-nav').find('.active').removeClass('active');
            $(this).addClass('active');
            $('.js-tabs-nav').each(function () {
                $('.js-tab-block[data-tab*="' + $(this).find('.active').attr('data-tab') + '"]').addClass('active');
            })
            $('.cont-for-items').each(function () {
                $('.js-tab-block[data-tab*="' + $(this).find('.active').attr('data-tab') + '"]').addClass('active');
            })
        }
        return false;
    })
    $('.js-tab-title').on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').next('.js-tab-content').slideUp(200);
            $(this).parent('.js-tab-block').removeClass('tab-open');
            $(this).parent('.js-tab-block').removeClass('tab-active');
        } else {
            $(this).addClass('active').next('.js-tab-content').slideDown(200);
            $(this).parent('.js-tab-block').addClass('tab-active');
        }
    })
    $('.js-tab-block .menu-toggle-wrap a').on('click', function () {
        $(this).parents('.js-tab-block').toggleClass('tab-open');
        return false;
    })


    //main-slider-box
    if (!!$('.main-slider-box').offset()) {
        $('.main-slider-box .slider').slick({
            dots: false,
            slidesToShow: 1,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
            responsive: [
                {
                    breakpoint: 640,
                    settings: {
                        dots: true,
                        prevArrow: false,
                        nextArrow: false,
                    }
                },
            ]
        });
    }


    //faq-box
    if (!!$('.faq-box').offset()) {
        $('.faq-box .slider').slick({
            dots: true,
            slidesToShow: 1,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            prevArrow: false,
            nextArrow: false,
        });
    }


    //news-slider-box
    if (!!$('.news-slider-box').offset()) {
        $('.news-slider-box .slider').slick({
            dots: true,
            slidesToShow: 2,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            prevArrow: false,
            nextArrow: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        });
    }


    //clients-slider-box
    if (!!$('.clients-slider-box').offset()) {
        $('.clients-slider-box .slider').slick({
            dots: true,
            slidesToShow: 7,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            prevArrow: false,
            nextArrow: false,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 5,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 3,
                    }
                },
            ]
        });
    }

    //reviews-slider-box
    if (!!$('.reviews-slider-box').offset()) {
        $('.reviews-slider-box .slider').slick({
            dots: true,
            slidesToShow: 3,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            prevArrow: false,
            nextArrow: false,
            responsive: [
                {
                    breakpoint: 993,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        });
    }

    if ($('.review-video-slider').length) {
        $('.review-video-slider').slick({
            dots: false,
            slidesToShow: 1,
            variableWidth: false,
            infinite: false,
            adaptiveHeight: false,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
            responsive: [
                {
                    breakpoint: 640,
                    settings: {
                        dots: true,
                        prevArrow: false,
                        nextArrow: false,
                    }
                },
            ]
        });
    }

});


$(window).on('load', function () {
    let mLeft = 0;
    let mLeftFull = 0;
    let mWidth = 0;
    let mWidthFull = 0;
    $('.main-menu-wrap .submenu-outer-wrap').each(function () {
        mLeft = $(this).parent('li').position().left - $(this).parents('.menu').position().left;
        mLeftFull = $(this).parents('.menu').find('.menu-catalog').outerWidth();
        mWidth = $(this).parents('.menu').outerWidth() - mLeft;
        mWidthFull = $(this).parents('.menu').outerWidth() - mLeftFull;
        if ($(this).hasClass('menu-col1')) {
            $(this).css('max-width', 'max-content');
            $(this).css('width', 'max-content');
        } else {
            if (mWidth < 500) {
                mWidth = mWidthFull;
                mLeft = mLeftFull;
            }
            if ((mWidth < 800) && mWidth > 500) {
                $(this).addClass('menu-col2')
            }
        }
        $(this).width(mWidth).css('left', mLeft);
    })


	
	//photo-slider-tile-box
	$('.photo-slider-tile-box').each(function() {
		let pCount = $(this).find('.photo-sl-wrap').length
		$(this).find('.photo-sl-wrap').first().addClass('active');
		for (i = 0;i < pCount;i++) {
			$(this).next('.photo-slider-tile-dots').append('<span></span>')
			$(this).find('.photo-slider').append('<span class="photo-slider-action"></span>')
		}
		$('.photo-slider-tile-box .photo-slider-action').hover(function() {
			let aSlider = $(this).index() - pCount;
			$(this).parents('.photo-slider-tile-box').find('.photo-sl-wrap').removeClass('active');
			$(this).parents('.photo-slider-tile-box').next('.photo-slider-tile-dots').find('span').removeClass('active');
			$(this).parents('.photo-slider-tile-box').find('.photo-sl-wrap').eq(aSlider).addClass('active');
			$(this).parents('.photo-slider-tile-box').next('.photo-slider-tile-dots').find('span').eq(aSlider).addClass('active');
		})
	})
	$('.photo-slider-tile-dots').each(function() {
		$(this).find('span').first().addClass('active');
	})
});

//field counter
let fieldCounter = document.getElementsByClassName('frm-field-counter')

function fieldCounterButtons(index) {
	return `
	        <button class="field-counter-button" data-index="${index}" data-type="plus"></button>
	        <button class="field-counter-button" data-index="${index}" data-type="minus" disabled></button>
	    `
}

function fieldCounterCreator() {
	for (i = 0; i < fieldCounter.length; i++) {
		fieldCounter[i].insertAdjacentHTML('beforeend', fieldCounterButtons(i))
		fieldCounter[i].onclick = function (event) {
			const type = event.target.dataset.type
			const index = event.target.dataset.index
			if (index) {
				const fieldCounterPlus = fieldCounter[index].children[1]
				const fieldCounterMinus = fieldCounter[index].children[2]
				const fieldCounterInput = fieldCounter[index].children[0]
				if (type === 'plus') {
					fieldCounterInput.value = Number(fieldCounterInput.value) + 1
				} else if (type === 'minus') {
					fieldCounterInput.value = Number(fieldCounterInput.value) - 1
				}
				if (Number(fieldCounterInput.value) > 0) {
					fieldCounterMinus.removeAttribute('disabled')
				} else if (Number(fieldCounterInput.value) < 1) {
					fieldCounterMinus.setAttribute('disabled', true)
				}
			}
		}
	}
}

fieldCounterCreator();