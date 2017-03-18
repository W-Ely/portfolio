'use strict';

//scroll that thing, may use later haven't decided...
// $('.nav ul').on('click', 'a', function(event){
//   event.preventDefault();
//   console.log('clicked');
//   $('body').animate({
//     scrollTop: $('.' + $(this).data('content')).offset().top
//   }, 1000);
// });
var nav = {};

//hide rather than scroll
nav.prepareTabs = function() {
  $('section').hide();
  $('#landing').show();
  $('.nav').on('click', 'li', function(event){
    event.preventDefault();
    $('section').hide();
    $( '#' + $(this).data('page') ).fadeIn();
  });
}

//TODO on click on mobile, menu hides, harder than it sounds with css..
// nav.manageMobile = function(){
//   $('nav ul').on('click', function(){
//     if ($(window).width() <= 762){
//       console.log('clicked');
//       $('.nav ul').attr('style', 'display: none')
//     }
//   });
// }

nav.prepareTabs();
// nav.manageMobile();
