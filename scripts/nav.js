'use strict';

//scroll that thing, may use later haven't decided...
// $('.side-menu ul').on('click', 'a', function(event){
//   event.preventDefault();
//   console.log('clicked');
//   $('body').animate({
//     scrollTop: $('.' + $(this).data('content')).offset().top
//   }, 1000);
// });
var nav = {
  $clickedTab: undefined
};
//TODO once nav tab has been clicked, the replacment tab fades in where the other tab hides.

//hide rather than scroll
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
        // $('nav').find('*').fadeIn();
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
      $(this).siblings().fadeIn();
    }
    $('section').hide();
    $( '#' + $(this).data('page') ).fadeIn();
  });
}

//TODO on click on mobile, menu hides, harder than it sounds with css..
// nav.manageMobile = function(){
//   $('nav ul').on('click', function(){
//     if ($(window).width() <= 762){
//       console.log('clicked');
//       $('.side-menu ul').attr('style', 'display: none')
//     }
//   });
// }

nav.prepareTabs();
// nav.manageMobile();
