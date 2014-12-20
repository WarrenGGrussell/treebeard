$(document).ready(function() {

	var productList = $(".product-list");
	var productSlider = $(".product-container ul");
	function sliderBuilder(value) {
		slider = ("<li class='slide' data-clearing><a href=" + value.image.url + "><img src=" + value.image.url + "></a>" +
			"<div class='orbit-caption'>" + 
			"<h4>" + value.product + "</h4>" + 
			"<h5>" + value.description + "</h5>" +
			"<span>Gram: $" + value.gram + "</span><span> Quart: $" + value.quart + "</span><span> half: $" + value.half + "</span><span>ounce: $" + value.ounce + "</span>" +
			"</div></li>")
		return slider;
	};


	var appendList = function(index, value) {	
		productList.append("<div class='list-item' data-id=" + value.id + ">" +
											"<div><img src=" + value.image.thumb.url + "></div>" +
											"<h3>" + value.product + "</h3>" +	
											"<h5>" + value.location + "</h5>" +
											"</div>");
	}

	var appendSlider = function(index, value) {
		slider = sliderBuilder(value);
		productSlider.append(slider);
		$(".orbit-next").show();
		$(".orbit-prev").show();
	}

	function clearContent() {
		productList.empty();
		productSlider.empty();
	}

	function appender(data, param, callback) {
		$.each(data, function(index, value) {		
			if (value.kind == param || param == "all") {
				appendList(index, value);
				appendSlider(index, value);
			}
		});
		callback();
	}

	function findProduct(id, data) {
		$.each(data, function(index, value) {
			if( value.id === id ) {
				
				productSlider.empty();
				productSlider.prepend(sliderBuilder(value));
				$(".orbit-next").hide();
				$(".orbit-prev").hide();
			}
		})
	}

	function addIdfinder(data) {
		$(".list-item").on("click", function() {
			id = $(this).data("id");
			removeActiveClass();
			$(this).addClass("active");
			findProduct(id, data);
		});
	}

	function removeActiveClass() {
			if ($('.filter').hasClass('active') || $(".list-item").hasClass('active')) {
				$('.filter').removeClass('active');
				$('.list-item').removeClass('active');
			}
	}

	function clickHandlers(data) { 
		$(".filter.indica").on('click', function() {
			clearContent();
			removeActiveClass();
			$(this).addClass("active");
			appender(data, "indica", function() {
				addIdfinder(data, $(this));
			});
		});

		$(".filter.sativa").on('click', function() {
			clearContent();
			removeActiveClass();
			$(this).addClass("active");
			appender(data, "sativa", function() {
				addIdfinder(data);
			});
		});

		$('.filter.all').on("click", function() {
			clearContent();
			removeActiveClass();
			$(this).addClass("active");
			appender(data, "all", function() {
				$(".list-item").on("click", function() {
					addIdfinder(data, $(this));
				});
			});
		});

		$('.submit').on("click", function() {
			search = $(".filter .search").val();
			$.each(data, function(index, value) {
				if (value.product === search) {
					clearContent();
					removeActiveClass();
					appender([value], "all", function() {
					});
				} else {
					$('.filter .search').hide();
					$('.filter .not-found').css("display", "block");
					setTimeout(function() {
						$('.filter .not-found').css("display", "none");
						$('.filter .search').show();
					}, 1000);
				}
			});
		});
	}

	url = window.location.pathname;
	$.ajax({
		url: url,
		dataType: "json",
		cache: false,
		error: function (data) {
			console.log('error');
		},
		success: function (data) {
			clickHandlers(data);
			appender(data, "all", function() {
				$(".list-item").on("click", function() {
					addIdfinder(data, $(this));			
				});
			});
			$('.filter.all').addClass('active');	
		}	
	});
});




