// Include Modules
var _ = require("underscore");
var path = require('path');
var template_meta_object = {
	post_types: [],
	taxonomies: [],
	terms: [],
	posts: [],
	active_post_type: ''
};

exports.convert = 
	/**
	 * Organize and clean-up post meta data
	 * @param posts_meta_array - meta data for every post
	 */

	function(posts_meta_array) {

		var post_types_collection = get_post_types(posts_meta_array)
		var taxonomies_collection = get_taxonomies(posts_meta_array);
		var terms_collection = get_terms(posts_meta_array);
		var posts_collection = get_posts(posts_meta_array);
		var active_post_type = get_active_post_type(posts_meta_array);

		template_meta_object = {
			post_types: post_types_collection,
			taxonomies: taxonomies_collection,
			terms: terms_collection,
			posts: posts_collection,
			active_post_type: active_post_type
		};

		template_meta_object = JSON.stringify(template_meta_object);

		return template_meta_object;
	};

/**
 * Form an array to be applied to posts_collection
 * @param posts_meta_array - meta data for every post
 */
function get_posts(posts_meta_array) {

	var posts_array = [];

	_.each(posts_meta_array, function(post_meta_object){
		var post_title_string = post_meta_object.title;
		var post_title_slug = slugify(post_title_string);
		var post_src = path.basename(post_meta_object.filename, '.json');
		var post_type = slugify(post_meta_object.post_type);
		var post_publish_date = new Date(post_meta_object.publish_date);
		var r_post_publish_date = post_meta_object.publish_date;
		var active = false;

		if (post_meta_object.homepost == true) {
			active = true;
		}

		if( (_.findWhere(posts_array, {slug: post_title_slug})) ) { // check to see if value already exists (slugs will be unique, not names)
    		// Alter post slug to a unique name
    		var title_counter = (_.where(posts_array, {name: post_title_string})).length; 
    		post_title_slug +=  '-' + title_counter;
    	} 

    	posts_array.push({name: post_title_string, slug: post_title_slug+'-'+title_counter,  date: post_publish_date, readable_date: r_post_publish_date, post_type: post_type, src: post_src, terms: get_post_terms(post_meta_object), active: active});

	});

	/**
	 * Return the terms the singular post is associated with
	 * @param post_meta_object - meta data associated with singular post
	 */
	function get_post_terms(post_meta_object) {

		var terms_object = {};

		_.each(post_meta_object, function(post_meta_value, post_meta_key){
			if (post_meta_key.substring(0, 9) == "taxonomy.") {
				push_terms(post_meta_key.slice(9), post_meta_value, post_meta_object.post_type);
			}
		});

		/**
		 * Return the terms the singular post is associated with
		 * @param taxonomy_name_string - the chosen taxonomy to push
		 * @param post_terms_array - terms within taxonomy chosen
		 * @param post_type_string - the post type associated with the post
		 */
		function push_terms(taxonomy_name_string, post_terms_array, post_type_string){
			var data_attr_string = taxonomy_name_string;
			_.each(post_terms_array, function(post_term_value, post_term_index){
				var post_term_slug = slugify(post_term_value);
				if(!( terms_object[data_attr_string] && _.contains(terms_object[data_attr_string], post_term_slug) )) {
					if (!terms_object[data_attr_string]) {
						terms_object[data_attr_string] = [];
					} 
					terms_object[data_attr_string].push(post_term_slug);
				}
			})
		}

		return terms_object;
	}	

	posts_array = _.sortBy(posts_array, function(o) { return o.date; }) // sort by date
	post_array = posts_array.reverse(); // desc order
	return posts_array;
}

/**
 * Return all post types found, removing dupes
 * @param posts_meta_array - meta data for every post
 */
function get_post_types(posts_meta_array) {

	var post_types_array = [];

	_.each(posts_meta_array, function(post_meta_object){
		var post_type_string = post_meta_object.post_type;
		var post_type_slug = slugify(post_type_string);
		var active = false;

		if (post_meta_object.homepost == true) {
			active = true;
			template_meta_object.active_post_type = post_type_slug;
		}
		if( !(_.findWhere(post_types_array, {name: post_type_string})) ) { // check to see if value already exists
    		post_types_array.push({name: post_type_string, slug: post_type_slug, active: active});
    	}
	});

	return post_types_array;
}

/**
 * Return active post type
 * @param posts_meta_array - meta data for every post
 */
function get_active_post_type(posts_meta_array) {
	var active_post_type = '';
	_.each(posts_meta_array, function(post_meta_object){
		if (post_meta_object.homepost == true) {
			active_post_type = slugify(post_meta_object.post_type);
		}
	});
	return active_post_type;
}

/**
 * Return all taxonomies, removing dupes
 * @param posts_meta_array - meta data for every post
 */
function get_taxonomies(posts_meta_array) {

	var taxonomies_array = [];

	_.each(posts_meta_array, function(post_meta_object, index){
		_.each(post_meta_object, function(post_meta_value, post_meta_key){
			if (post_meta_key.substring(0, 9) == "taxonomy.") {
				push_taxonomies(post_meta_key.slice(9), post_meta_object.post_type);
			}
		});
	});

	function push_taxonomies(taxonomy_name_string, post_type_string ){
		if(!(_.findWhere(taxonomies_array, {name: taxonomy_name_string, post_type: post_type_string}))) {
			taxonomies_array.push({
				name: taxonomy_name_string,
				slug: slugify(taxonomy_name_string),
				post_type: post_type_string
			})
		}
	}

	return taxonomies_array;
}

/**
 * Return all terms, removing dupes
 * @param posts_meta_array - meta data for every post
 */
function get_terms(posts_meta_array) {

	var terms_array = [];

	_.each(posts_meta_array, function(post_meta_object, index){
		_.each(post_meta_object, function(post_meta_value, post_meta_key){
			if (post_meta_key.substring(0, 9) == "taxonomy.") {
				push_terms(post_meta_key.slice(9), post_meta_value, post_meta_object.post_type);
			}
		});
	});

	function push_terms(taxonomy_name_string, post_terms_array, post_type_string){
		_.each(post_terms_array, function(post_term_value, post_term_index){
			if(!(_.findWhere(terms_array, {name: post_term_value, taxonomy: taxonomy_name_string, post_type: post_type_string}))) {
				terms_array.push({
					name: post_term_value,
					slug: slugify(post_term_value),
					post_type: post_type_string,
					taxonomy: taxonomy_name_string
				})
			}
		});

	}

	return terms_array;
}

// Slugify Helper Function
function slugify(text) {
	return text.toString().toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
}