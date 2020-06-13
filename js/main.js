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
			} else {
				$(".go_to_top").removeClass("d-flex");
			}
		}, {
			offset: "80px"
		}
	);
});