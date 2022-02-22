$(document).ready(function () {
    $('.carousel__inner').slick({
        slidesToShow: 1,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow_left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow_right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active') //переключение табов(активность)
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active'); //переключение страниц с контентом
    });

    $('ul.catalog__tabs_small').on('click', 'li:not(.catalog__tab_small_active)', function () {
        $(this)
            .addClass('catalog__tab_small_active').siblings().removeClass('catalog__tab_small_active') //переключение табов(активность)
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active'); //переключение страниц с контентом
    });


    //неоптимизированный код / при клике на ссылку "подробнее", карточка переворачивается
    // $('.catalog-item__link').each(function(i) { 
    //     $(this).on('click', function(e) {
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    // })

    //неоптимизированный код / при клике на ссылку "назад", карточка переворачивается обратно
    // $('.catalog-item__back').each(function(i) { 
    //     $(this).on('click', function(e) {
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    // })

    //оптимизированный код / переворачивает карточку
    function toggleSlide(item) {
        $(item).each(function (i) { //при клике на ссылку "подробнее", карточка переворачивается
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut();
    });

    $('.button_catalog').each(function (i) { //перебераем кнопки, i отвечает за номер кнопки
        $(this).on('click', function () { // this - та кнопка, на которую мы нажимаем
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        })
    });

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Пожалуйста, введите свой телефон",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты name@domain.com"
                }
            }
        });
    };
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('form').submit(function(e) {
        e.preventDefault();             // отменяем стандартное поведение браузера
        if (!$(this).valid()) {         //если форма не прошла валидацию, то нечего не делаем
            return;
        }
        $.ajax({            //отправляем данные на сервер
            type: "POST",           //отдаем данные на сервер
            url: "mailer/smart.php",            //куда отправляем наш запрос
            data: $(this).serialize()           //данные, которые мы хотим отправить на сервер
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();

            $('form').trigger('reset');
        })
    });

    //smooth page scroll to top

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $('.pageup').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 900);
        return false;
    });
});