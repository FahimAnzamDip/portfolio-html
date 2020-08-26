$(window).on('load', function () {
	/*=========================================================================
        Preloader
    =========================================================================*/
	$('.loader').fadeOut('slow');


	//Porfolio Filter
	$('.portfolio-filter').on('click', 'li', function () {
		var filterValue = $(this).attr('data-filter');
		$container.isotope({
			filter: filterValue
		});
	});

	// change is-checked class on buttons
	$('.portfolio-filter').each(function (i, buttonGroup) {
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on('click', 'li', function () {
			$buttonGroup.find('.active').removeClass('active');
			$(this).addClass('active');
		});
	});

	var $container = $('.portfolio-wrapper');
	$('.portfolio-wrapper').isotope({
		// options
		layoutMode: 'fitRows',
		itemSelector: '[class*="col-"]'
	});

	//Parallax Animation
	if ($('.parallax').length > 0) {
		var scene = $('.parallax').get(0);
		var parallax = new Parallax(scene, {
			relativeInput: true,
		});
	}


	//Wow js Scroll Animation
	var wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 0,
	});
	wow.init();


});


$(document).ready(function () {

	//Smooth Scrolling
	$('a[href^="#"]:not([href="#"], a[href="#skills"], a[href="#about_me"], a[href="#experience"], a[href="#education"])').on('click', function (event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 700, 'easeInOutQuad');
		event.preventDefault();
	});

	//Sticky Navbar
	$(".js--start-sticky-nav").waypoint(
		function (direction) {
			if (direction == "down") {
				$("nav").addClass("sticky");
			} else {
				$("nav").removeClass("sticky");
			}
		}, {
			offset: "80px"
		}
	);

	//Menu Item click closes nav
	$('.navbar-nav>li>a').on('click', function(){
		if($('.navbar-toggler').attr('aria-expanded') === 'true') {
			$('.navbar-collapse').collapse('hide');
			$('#bars').toggleClass('d-none');
			$('#cross').toggleClass('d-none');
		}	
	});
	

	//Onclick icon change in navbar
	$("#menu_btn").click(function () {
		$('#bars').toggleClass('d-none');
		$('#cross').toggleClass('d-none');
	});

	//Counter Up Stats
	$('.count').counterUp({
		delay: 10,
		time: 2000
	});

	//Go To Top
	$(".js--start-go-top").waypoint(
		function (direction) {
			if (direction == "down") {
				$(".go_to_top").addClass("d-flex");
				$(".go_to_top").removeClass("d-none");
			} else {
				$(".go_to_top").addClass("d-none");
				$(".go_to_top").removeClass("d-flex");
			}
		}, {
			offset: "80px"
		}
	);

	var typed = new Typed("#typed", {
		strings: ["Developer.", "Designer."],
		backSpeed: 30,
		typeSpeed: 50,
		loop: true,
		backDelay: 3000
	});

	//Owl Carosel
	$("#service_slider").owlCarousel({
		loop: true,
		margin: 33,
		responsiveClass: true,
		stagePadding: 20,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
				autoplay: false
			},
			600: {
				items: 2,
			},
			1000: {
				items: 3,
			}
		},
		nav: false,
	});

});