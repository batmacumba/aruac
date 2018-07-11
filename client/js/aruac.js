/************************************************
                    NAVBAR
************************************************/
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
/************************************************
                ISOTOPE(GRID)
************************************************/
var $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer',
    fitWidth: true
});

var filterFns = {
  // show if number is greater than 50
  numberGreaterThan50: function() {
    var number = $(this).find('.number').text();
    return parseInt( number, 10 ) > 50;
  },
  // show if name ends with -ium
  ium: function() {
    var name = $(this).find('.name').text();
    return name.match( /ium$/ );
  }
};
// bind filter button click
$('.filters-button-group').on( 'click', 'button', function() {
  var filterValue = $( this ).attr('data-filter');
  // use filterFn if matches value
  filterValue = filterFns[ filterValue ] || filterValue;
  $grid.isotope({ filter: filterValue });
});
// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});

$grid.imagesLoaded().progress( function() {
  $grid.isotope('layout');
});

/************************************************
                    GALLERY
************************************************/
$(document).ready(function(){
  $("#ficha").mouseover(function(){
   $("#completa").stop().slideDown("slow");
  });
  $("#ficha").mouseout(function(){
   $("#completa").slideUp("slow");
  });
 });

/**
 * jQuery alterClass plugin
 *
 * Remove element classes with wildcard matching. Optionally add classes:
 *   $( '#foo' ).alterClass( 'foo-* bar-*', 'foobar' )
 *
 * Copyright (c) 2011 Pete Boere (the-echoplex.net)
 * Free under terms of the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 */
(function ( $ ) {
	
$.fn.alterClass = function ( removals, additions ) {
	
	var self = this;
	
	if ( removals.indexOf( '*' ) === -1 ) {
		// Use native jQuery methods if there is no wildcard matching
		self.removeClass( removals );
		return !additions ? self : self.addClass( additions );
	}

	var patt = new RegExp( '\\s' + 
			removals.
				replace( /\*/g, '[A-Za-z0-9-_]+' ).
				split( ' ' ).
				join( '\\s|\\s' ) + 
			'\\s', 'g' );

	self.each( function ( i, it ) {
		var cn = ' ' + it.className + ' ';
		while ( patt.test( cn ) ) {
			cn = cn.replace( patt, ' ' );
		}
		it.className = $.trim( cn );
	});

	return !additions ? self : self.addClass( additions );
};

})( jQuery );
/************************************************
                    OUTROS
************************************************/
function tudo() {
    $grid.isotope({ filter: '*' });
    $('#filter').alterClass('switch-candy-*').addClass('switch-candy-white');
}
function cinema() {
    $grid.isotope({ filter: '.cinema' });
    $('#filter').alterClass('switch-candy-*').addClass('switch-candy-red');
}
function tv() {
    $grid.isotope({ filter: '.tv' });
    $('#filter').alterClass('switch-candy-*').addClass('switch-candy-blue');
}
function espetaculos() {
    $grid.isotope({ filter: '.teatro' });
    $('#filter').alterClass('switch-candy-*').addClass('switch-candy-yellow');
}

$( window ).one('scroll',function() {
  $('html, body').animate({
    scrollTop: $("#portifolio").offset().top
}, 500);
});

window.setTimeout(function(){$('.hidden-nav').addClass('esconde-nav');}, 1500);

$(function(){
    $("#footerload").load("footer.html");
});

$(document).ready(function(){
    $('#slider_cj, #slider_sutis, #slider_cn, #slider_abril, #slider_exilados, #slider_igor, #slider_guerrilheiras, #slider_noite, #slider_memoria, #slider_jards, #slider_larueda, #slider_transeunte, #slider_agreste, #slider_kogi, #slider_pachamama, #slider_selva, #slider_sintra, #slider_vida, #slider_intervalo, #slider_medula, #slider_quimera, #slider_rocha, #slider_mulher').lightSlider({
        gallery: true,
        item: 1,
        loop: true,
        slideMargin: 0,
        thumbItem: 10   
    });  
  });

$(".loadslider").click(function() {
     $(window).resize();
     $(window).resize();

 });
