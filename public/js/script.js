$(function(){

	var images_container = $('#little_images_container')
	var images = []
	var clientid = 'af5f708adf794ad8a5ac2b26ee0c4912';
	var tag_name = 'notegraphy';
	var next_url = null;

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
			success: add_images_to_array
		});
	};

	var add_images_to_array = function(response){
		console.log(response.pagination.next_max_tag_id);
		next_url = response.pagination.next_url
		images = images.concat(response.data);
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
    	//console.log(image.images.standard_resolution.url);
    	var image_tag = '<img class="placeholder_image image" src="'+ image.images.standard_resolution.url +'">';
    	images_container.prepend(image_tag);
    };

    search_images_instagram();

    setInterval(search_images_instagram, 1000);
    setInterval(showing_image_list,300);
});