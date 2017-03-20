'use strict';

var nav = {
  $clickedTab: undefined
};

//hide rather than scroll, replaces tab in place rather than simply hiding and showing. The below code fixes the hover problem for as well mobile. Menu now acts as expected.
nav.prepareTabs = function() {
  $('section').hide();
  $('#landing').show();
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

//scroll the project carousel
$('.side-menu ul').on('click', 'a', function(event){
  event.preventDefault();
  console.log('clicked');
  $('body').animate({
    scrollTop: $('.' + $(this).data('content')).offset().top
  }, 1000);
});

nav.prepareTabs();
