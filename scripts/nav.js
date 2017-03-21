'use strict';

var nav = {
  $clickedTab: undefined
};

//hide rather than scroll, replaces tab in place rather than simply hiding and showing.
nav.menuNav = function() {
  $('section').hide();
  // $('#landing').show();
  $('#projects').show();
  $('nav').on('click', '*[data-page]', function(event){
    event.preventDefault();
    if ($(this).data('page') === 'landing'){
      if (nav.$clickedTab){
        nav.$clickedTab.hide();
        $(this).next().find('ul').prepend(nav.$clickedTab);
        nav.$clickedTab.fadeIn();
        nav.$clickedTab = undefined;
      }
    }  else {
      if (!nav.$clickedTab){
        nav.$clickedTab = $(this).detach();
        nav.$clickedTab.hide();
        // debugger;
      } else {
        $(nav.$clickedTab).hide();
        $(this).replaceWith(nav.$clickedTab);
        nav.$clickedTab.fadeIn();
        nav.$clickedTab = $(this);
      }
    }
    $('section').hide();
    $( '#' + $(this).data('page') ).fadeIn();
  });
}

nav.projectNav = function(){
  var distanceLeftCSS = 0;
  $('.project-nav').on('click', function(){
    if ($(this).attr('id') === 'forward' && distanceLeftCSS > ($('article').length - 1) * -100){
      //take us forward
      distanceLeftCSS -= 100;
      $('.projects-carousel').animate({
        left: distanceLeftCSS + 'vw',
      }, 500 );
    } else if ($(this).attr('id') === 'back' && distanceLeftCSS < 0) {
      //take us back
      distanceLeftCSS += 100;
      $('.projects-carousel').animate({
        left: distanceLeftCSS + 'vw',
      }, 500 );
    }
  });
}

// Jquery solution to mobile nav not hiding on click
nav.mobileNavFix = function(){
  if ( $(window).width() < 777) {
    $('.side-menu').on('mouseenter', function(){
      $(this).find('ul').show();
    });
    $('.side-menu').on('mouseleave', function(){
      $('.side-menu').find('ul').hide();
    });
  }
  $('.side-menu').on('click', function(){
    if ($('.drop-nav').is(':visible')){
      $(this).find('ul').toggle();
    }
  });
  // this handles screen size changes. Perhaps a phone going to landscape, or more likely a tester draging the edge on window.
  $(window).on('resize', function(){
    if ( $(window).width() >= 777 && !$('.side.menu').find('ul').is(':visible') ){
      $('.side-menu').find('ul').show();
      $('.side-menu').off('mouseleave');
      $('.side-menu').off('mouseenter');
    } else if( $(window).width() < 777 ) {
      $('.side-menu').on('mouseenter', function(){
        $(this).find('ul').show();
      });
      $('.side-menu').on('mouseleave', function(){
        console.log('mouse is out');
        $('.side-menu').find('ul').hide();
      });
    }
  });
}

nav.preparePageNavigation = function(){
  nav.menuNav();
  nav.mobileNavFix();
  nav.projectNav();
}
nav.preparePageNavigation();
