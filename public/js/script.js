$(function(){

	var images_showed = []
	var images_container = $('#little_images_container')
	var images = []
	var clientid = 'af5f708adf794ad8a5ac2b26ee0c4912';
	var tag_name = 'facingconnectivity';
	var next_url = null;
	var interval_get_images = 5000;
	var interval_print_image = 500;
	var first_call = true;

	var search_images_instagram = function(){
		if (next_url == null) {
			url = "https://api.instagram.com/v1/tags/" + tag_name + "/media/recent?client_id=" + clientid
		}
		else {
			url = next_url
		}
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			cache: false,
			url: url,
			success: add_images_to_array,
      		error: function (xhr, ajaxOptions, thrownError) {
        		console.error('Error code: ' + xhr.status + '. Message: ' + xhr.responseText);
      		}
		});
	};

	var add_images_to_array = function(response){
		//console.log(response.pagination.next_max_tag_id);
		data = response.data;
		if ( first_time() === true) {
			data = data.reverse();
		}
		next_url = response.pagination.next_url;
		images = images.concat(data);
	};

	var first_time = function (){
		if ( first_call === true ){
			result = true;
			first_call = false;
		} else {
			result = false;
		}
		return result;
	};

	var get_element_dimensions = function(element) {
        return [element.width(), element.height()]
    };

    var showing_image_list = function(){
    	if (images.length > 0) {
    		var image = images[0]
    		show_image(image);
    		images.shift();
    	}
    }; 

    var show_image = function(image){
    	var image_id = image.id;
    	if (images_showed.indexOf(image_id) == -1) {
    		console.log('Showing image: ');
    		console.log(image)
    		var image_tag = '<img class="placeholder_image image" src="'+ image.images.standard_resolution.url +'">';
    		images_container.prepend(image_tag);
    		images_showed.push(image_id);
    	} 

    };

    search_images_instagram();

    setInterval(search_images_instagram, interval_get_images);
    setInterval(showing_image_list, interval_print_image);
});