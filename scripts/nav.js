'use strict';

//scroll that thing, may use haven't decided...
// $('.nav ul').on('click', 'a', function(event){
//   event.preventDefault();
//   console.log('clicked');
//   $('body').animate({
//     scrollTop: $('.' + $(this).data('content')).offset().top
//   }, 1000);
// });


//hide rather than scroll
$('section').hide();
$('.landing').show();
$('.nav').on('click', 'li', function(event){
  event.preventDefault();
  $('section').hide();
  $( '#' + $(this).data('page') ).fadeIn();
  // debugger;
});

//on click on mobile, menu hides
$();
