/*

Style   : MobApp Script JS
Version : 1.0
Author  : Surjith S M
URI     : https://surjithctly.in/

Copyright © All rights Reserved

*/

function limpiarCampos(){
	 $('#contactForm')[0].reset();
	 $('#contactName').val("");
	 $('#contactSubject').val("");
	 $('#contactEmail').val("");
	 $('#contactMessage').val("");
	 $('#contactName').focus();
}

function contacto() {
	 //Leo los campos de la pantalla.

	 var negocio = new Object();
	 negocio.name = $('#contactName').val();
	 negocio.subject = $('#contactSubject').val();
	 negocio.email = $('#contactEmail').val();
	 negocio.message = $('#contactMessage').val();
	 //valido que el usuario haya ingresado los campos requeridos.
	 var ok = true;
	 if (negocio.name == '' && ok){
		 ok = false;
		 alertify.error('Ingrese Nombre del Contacto');
	 }
	 if (negocio.subject == '' && ok){
		 ok = false;
		 alertify.error('Ingrese Asunto del Mensaje');
	 }
	 if (negocio.email == '' && ok){
		 ok = false;
		 alertify.error('Ingrese dirección de email');
	 }
	 if (negocio.message == '' && ok){
		 ok = false;
		 alertify.error('Ingrese Mensaje');
	 }


	 if (ok){
		 //envio los datos al servidor.
		 var jsonString= JSON.stringify(negocio);


		 $.ajax({
					 url: "https://soydelivery.com.uy/aprocessform.aspx",
					 type: "POST",
					 dataType: "json",
					 crossDomain: true,
					 data: jsonString,
					 success: function(respuesta) {
						 if (respuesta.errorcode == 0){
							 alertify.success('¡Gracias por escribirnos, nos pondremos en contacto a la brevedad!');
							 limpiarCampos();
						 }else{
							 alertify.error(respuesta.errordesc);
						 }
					 },
					 error:
							 function() {
								 alertify.error("Error de comunicaciones, reintente en unos minutos");
							 }
			 });

	 }

 };

$(function() {
    "use strict";

    /*-----------------------------------
     * FIXED  MENU - HEADER
     *-----------------------------------*/
    function menuscroll() {
        var $navmenu = $('.nav-menu');
        if ($(window).scrollTop() > 50) {
            $navmenu.addClass('is-scrolling');
        } else {
            $navmenu.removeClass("is-scrolling");
        }
    }
    menuscroll();
    $(window).on('scroll', function() {
        menuscroll();
    });
    /*-----------------------------------
     * NAVBAR CLOSE ON CLICK
     *-----------------------------------*/

    $('.navbar-nav > li:not(.dropdown) > a').on('click', function() {
        $('.navbar-collapse').collapse('hide');
    });
    /*
     * NAVBAR TOGGLE BG
     *-----------------*/
    var siteNav = $('#navbar');
    siteNav.on('show.bs.collapse', function(e) {
        $(this).parents('.nav-menu').addClass('menu-is-open');
    })
    siteNav.on('hide.bs.collapse', function(e) {
        $(this).parents('.nav-menu').removeClass('menu-is-open');
    })

    /*-----------------------------------
     * ONE PAGE SCROLLING
     *-----------------------------------*/
    // Select all links with hashes
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[data-toggle="tab"]').on('click', function(event) {
        // On-page links
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
    /*-----------------------------------
     * OWL CAROUSEL
     *-----------------------------------*/
    var $testimonialsDiv = $('.testimonials');
    if ($testimonialsDiv.length && $.fn.owlCarousel) {
        $testimonialsDiv.owlCarousel({
            items: 1,
            nav: true,
            dots: false,
            navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>']
        });
    }

    var $galleryDiv = $('.img-gallery');
    if ($galleryDiv.length && $.fn.owlCarousel) {
        $galleryDiv.owlCarousel({
            nav: false,
            center: true,
            loop: true,
            autoplay: true,
            dots: true,
            navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 3
                }
            }
        });
    }

}); /* End Fn */
