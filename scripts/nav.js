'use strict';

var nav = {
  $clickedTab: undefined,
  state: {
    mobile: true,
    dropNav: false,
  },
};

nav.getState = function(){
  if ( $(window).width() < 777 ) {
    nav.state.mobile = true;
  } else if ( $(window).width() >= 777) {
    nav.state.mobile = false;
  }
};

nav.setEvents = function(){
  // this handles screen size changes. Perhaps a phone going to landscape, or more likely a tester draging the edge on window.
  $(window).on('resize', function(){
    nav.getState();
    if (!nav.state.mobile){
      console.log('state changed show menu', nav.state.mobile );
      $('.side-menu').find('ul').show();
    } else {
      console.log('state changed show menu', nav.state.mobile );
      $('.side-menu').find('ul').hide();
    }
  });
  $('.side-menu').on('click', function(){
    if (nav.state.mobile){
      nav.state.dropNav = !nav.state.dropNav;
      console.log('menu clicked and shown', nav.state.dropNav);
      $(this).find('ul').toggle();
    }
  });
  $('.side-menu').on('mouseleave', function(){
    nav.state.dropNav = false;
    console.log('mouse left, menu shown', nav.state.dropNav);
    $('.side-menu').find('ul').hide();
  });
  $('.side-menu').on('mouseenter', function(){
    if (!nav.state.dropNav){
      nav.state.dropNav = true;
      console.log('mouse entered, menu shown', nav.state.dropNav);
      $('.side-menu').find('ul').show();
    }
  });
};

//hide rather than scroll, replaces tab in place rather than simply hiding and showing.
nav.setMenu = function() {
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

nav.setProjectArrows = function(){
  var distanceLeftCSS = 0;
  $('.project-nav').on('click', '.arrow', function(){
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

nav.preparePageNavigation = function(){
  nav.getState();
  nav.setMenu();
  nav.setEvents();
  nav.setProjectArrows();
}

nav.preparePageNavigation();
