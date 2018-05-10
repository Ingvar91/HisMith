import Swiper from 'swiper';

(function ($) {
    
    // закрыть окно навигации
    $('#close-nav-button').on('click', function () {
        $('#header').find('.collapse-nav').removeClass('active');
        $('body').removeClass('ow-h');
    });

    // открыть окно навигации
    $('#open-nav-button').on('click', function () {
        $('#header').find('.collapse-nav').addClass('active');
        $('body').addClass('ow-h');
    });

    // открыть/закрыть меню в свернутом режиме
    $('#sidebar').find('.dropdown-menu-toggle').on('click', function () {
        $(this).siblings('.menu').toggleClass('active');
    });

    // проверяем развернут ли блок в новостях
    $('#news').find('.article .collapse').on('show.bs.collapse', function () {
        $(this).parent('.article').addClass('active');
    });

    // проверяем свернут ли блок в новостях
    $('#news').find('.article .collapse').on('hide.bs.collapse', function () {
        $(this).parent('.article').removeClass('active');
    });
    
    new Swiper('#events .swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        grabCursor: false,
        slidesPerView: 4,
        breakpoints: {
            768: {
              slidesPerView: 1,
              spaceBetween: 10
            }
        }
    });

    $(window).load(function() {
        if($(window).width() <= 575){
            initCollapseFooterSections();
        }
        else{
            destroyCollapseFooterSections();
        }
        
    });

    $(window).resize(function() {
        if($(window).width() <= 575){
            initCollapseFooterSections();
        }
        else{
            destroyCollapseFooterSections();
        }
        
    });

    // схлопываем разделы в футере
    function initCollapseFooterSections(){
        $('#footer').find('.section-title').attr('data-toggle', 'collapse').addClass('collapsed').siblings('ul').addClass('collapse')
    }
    
    // раскрываем разделы в футере
    function destroyCollapseFooterSections(){
        $('#footer').find('.section-title').removeAttr('data-toggle').removeClass('collapsed').siblings('ul').removeClass('collapse')
    }
      
})(jQuery);