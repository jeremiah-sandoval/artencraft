/**
* @app ReadMoreJS
* @desc Breaks the content of an element to the specified number of words
*/
;(function (win, doc, undef) {
	'use strict';

	/**
	 * @desc this object holds all functions
	*/
	var RM = {};

	/* ============================== */
	/*             HELPERS            */
	/* ============================== */
	RM.helpers = {
		extendObj: function() {
			for (var i = 1, l = arguments.length; i < l; i++) {
				for (var key in arguments[i]) {
		            if (arguments[i].hasOwnProperty(key)) {
		                if (arguments[i][key] && arguments[i][key].constructor && arguments[i][key].constructor === Object) {
		                	arguments[0][key] = arguments[0][key] || {};
		                	this.extendObj(arguments[0][key], arguments[i][key]);
		                } else {
		                	arguments[0][key] = arguments[i][key];
		                }
		            }
			    }
			}
			return arguments[0];
		}
	};

	/* ============================== */
	/*         MAIN FUNCTIONS         */
	/* ============================== */

	// Return the number of words of string.
	RM.countWords = function (str) {
  		return str.split(/\s+/).length;
	};

	// Rturn string starting from first word untill number specified.
	RM.generateTrimmed = function (str, wordsNum) {
		return str.split(/\s+/).slice(0, wordsNum).join(' ') + '...';
	};

	// Plugin Initialization
	RM.init = function (options) {
		var defaults = {
			target: '',
			numOfWords: 50,
			toggle: true,
			moreLink: 'read more...',
			lessLink: 'read less'
		};
		options = RM.helpers.extendObj({}, defaults, options);

		var target = doc.querySelectorAll(options.target),                                                // Get the node list of target elements specified by the user.
			targetLen = target.length,                                                                    // Length of the targets node list.
			targetContent,                                                                                // The initial text that is contained in the target element.
			trimmedTargetContent,                                                                         // The final (trimmed) text.
			targetContentWords,                                                                           // The number of words the initial text has.
			initArr = [],                                                                                 // Array to hold the initial text of each target element.
			trimmedArr = [],                                                                              // Array to hold the final (trimmed) text of each target element.
			i, j, l, moreContainer, rmLink, moreLinkID, index;

		// Loop through all target elements
		for (i = 0; i < targetLen; i++) {
			targetContent = target[i].innerHTML;                                                          // Get the initial text of each target element.
			trimmedTargetContent = RM.generateTrimmed(targetContent, options.numOfWords);                 // Generate the trimmed version of the initial text.
			targetContentWords = RM.countWords(targetContent);                                            // Count the number of words the initial text has.

			initArr.push(targetContent);                                                                  // Push the initial text to initArr.
			trimmedArr.push(trimmedTargetContent);                                                        // Push the trimmed text to trimmedArr.

			// Procceed only if the number of words specified by the user
			// is smaller than the number of words the target element has.
			if (options.numOfWords < targetContentWords - 1) {
				target[i].innerHTML = trimmedArr[i];                                                      // Populate the target element with the trimmed version of text.

				moreContainer = doc.createElement('div');                                                 // Create a div element to hold the More/Less link.
				moreContainer.innerHTML = '<a id="rm-more_'                                               // Create the More/Less link.
					+ i
					+ '" class="readmore-link" style="cursor:pointer;">'
					+ options.moreLink
					+ '</a>';
				target[i].parentNode.insertBefore(moreContainer, target[i].nextSibling);                  // Insert the More/Less link after the target element.
			}
		}

		rmLink = doc.querySelectorAll('.readmore-link');                                                        // Reference the More/Less link.

		// Loop through all links and attach event listeners.
		for (j = 0, l = rmLink.length; j < l; j++) {
			rmLink[j].onclick = function () {
				moreLinkID = this.getAttribute('id');                                                     // Get each link's unique identifier.
				index = moreLinkID.split('_')[1];                                                         // Extract index number from each link's 'id'.

				// if (!helpers.classList.contains(this, 'less')) {
				if (this.getAttribute('data-clicked') !== 'true') {
					target[index].innerHTML = initArr[index];
					if (options.toggle !== false) {
						this.innerHTML = options.lessLink;
						this.setAttribute('data-clicked', true);
					} else {
						this.innerHTML = '';
					}
				} else {
					target[index].innerHTML = trimmedArr[index];
					this.innerHTML = options.moreLink;
					this.setAttribute('data-clicked', false);
				}
			};
		}
	};

	// Return as global object
	window.$readMoreJS = RM;
}(this, this.document));

$(document).ready(function(){
  // Main Nav Menu
	function closeside(){
    $('#category-filter').css({'display':'none', 'width': '0px'});
		$('#main-nav').css({'display':'none', 'width': '0px'});
    $('#body-overlay').hide();
		$('body').css('overflow-y', 'scroll');
  }
  function opennav(){
    $('#main-nav').css({'display':'block', 'width': '300px'});
    $('#body-overlay').show();
		$('body').css('overflow-y', 'hidden');
  }
  $('#mainnav-trigger').click(function(){ opennav(); });
  $('#mainnav-close').click(function(){ closeside(); });
  $('#submenu-close').click(function(){ closeside(); });
  $('#main-nav > .navigation > ul > li').hover(function(){
    $(this).find('.submenu').toggle();
  });

	// Filter Menu
  function openfilter(){
    $('#category-filter').css({'display':'block', 'width': '300px'});
    $('#body-overlay').show();
		$('body').css('overflow-y', 'hidden');
  }
  $('#catfilter-trigger').click(function(){ openfilter(); });
  $('#catfilter-close').click(function(){ closeside(); });

	// Close Any Sidebar
	$('#body-overlay').click(function(){ closeside(); });

  // Sticky Header
  $(window).scroll(function(){
    if ($(window).scrollTop() >= 300) {
      $('header .top').addClass('sticky');
    }
    else {
      $('header .top').removeClass('sticky');
    }
  });

  //Smooth scroll
  $('a.smooth-scroll[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top + (-90)
      }, 1000);
      return false;
    }
  }
  });

  //Product Carousel
  $('#thumbcarousel .carousel-item .thumb').click(function() {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  });

  $readMoreJS.init({
    target: '.readmore-content',
    numOfWords: 100,
    toggle: true,
    moreLink: 'Lees meer',
    lessLink: 'Lees minder'
  });

	$('#prod-specs-btn').click(function(){
	    $(this).text(function(i,old){
	        return old=='Bekijk alle kenmerken' ?  'Sluit alle kenmerken' : 'Bekijk alle kenmerken';
	    });
	});

	//Price Filter
	var minVal = parseInt($('.min-price').text());
	var maxVal = parseInt($('.max-price').text());
	$( "#prices-range" ).slider({
			range: true,
			min: minVal,
			max: maxVal,
			step: 5,
			values: [ minVal, maxVal ],
			slide: function( event, ui ) {
					$('.min-price').text(ui.values[ 0 ]);
					$('.max-price').text(ui.values[ 1 ]);
			}
	});
	$('#price-filter .range-option').hide();
	$('#change-price a').on('click',
		function() {
			$('#price-filter .range-option, #price-filter .checkbox-option').toggle();
			$(this).text(function(i,old){
					return old=='Terug' ?  'Kies self een prijs' : 'Terug';
			});
		}
	);


	$('.more-less').on('click',
		function(e) {
			e.preventDefault();
				$(this).parent().find('.more').slideToggle(150, function(){
				});
				$(this).find('a').text(function(i,old){
					return old=='Toon minder' ?  'Toon meer' : 'Toon minder';
				});
		}
	);

});
