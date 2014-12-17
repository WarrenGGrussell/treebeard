$(document).ready(function() {

	var productList = $(".product-list");
	var productSlider = $(".product-container ul");

	var appendList = function(index, value) {	
		productList.append("<div class='list-item small-12 medium-6 large-4 columns' data-id=" + value.id + ">" +
											"<div><img src=" + value.image.thumb.url + "></div>" +
											"<h3>" + value.product + "</h3>" +	
											"<h5>" + value.location + "</h5>" +
											"</div>");
	}

	var appendSlider = function(index, value) {
		productSlider.append("<li class='slide' ><img src=" + value.image.url + ">" +
												"<div class='orbit-caption'>" + 
												 value.product + "<br>" +
												 value.description + "<br>" +
												"</div></li>");
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
				productSlider.prepend("<li class='slide' ><img src=" + value.image.url + ">" +
												"<div class='orbit-caption'>" + 
												 value.product + "<br>" +
												 value.description + "<br>" +
												"</div></li>");
			}
		})
	}

	function clickHandlers(data) { 
		
		$(".filter.indica").on('click', function() {
			clearContent();
			$(this).addClass("active");
			appender(data, "indica", function() {
					$(".list-item").on("click", function() {
						id = $(this).data("id");
						findProduct(id, data)
				});
			});
		});

		$(".filter.sativa").on('click', function() {
			clearContent();
			$(this).addClass("active");
			appender(data, "sativa", function() {
					$(".list-item").on("click", function() {
						id = $(this).data("id");
						findProduct(id, data)
				});
			});
		});

		$('.filter.all').on("click", function() {
			clearContent();
			$(this).addClass("active");
			appender(data, "all", function() {
				$(".list-item").on("click", function() {
						id = $(this).data("id");
						findProduct(id, data)
				});
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
						id = $(this).data("id")
						findProduct(id, data);				
				});
			});
		}	
	});

});
