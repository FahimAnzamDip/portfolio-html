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
});