'use strict';

var nav = {
  $clickedTab: undefined
};

//hide rather than scroll, replaces tab in place rather than simply hiding and showing. The below code fixes the hover problem for as well mobile. Menu now acts as expected.
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
    if ($(this).attr('id') === 'forward'){
      //take us forward
      distanceLeftCSS -= 100;
      $('.projects-carousel').animate({
        left: distanceLeftCSS + 'vw',
     }, 1500 );
      console.log('forward');
    } else if ($(this).attr('id') === 'back') {
      //take us back
      distanceLeftCSS += 100;
      $('.projects-carousel').animate({
        left: distanceLeftCSS + 'vw',
     }, 1500 );
      console.log('back');
    }
  });
}

nav.preparePageNavigation = function(){
  nav.menuNav();
  nav.projectNav();
}
nav.preparePageNavigation();
