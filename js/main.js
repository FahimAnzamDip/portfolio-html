$(document).ready(function () {
	//Initialize Smooth Scrolling
	var scroll = new SmoothScroll('a[href*="#"]', {
		speed: 500
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

	sal({
		once: false
	}); 
});