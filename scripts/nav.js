'use strict';

//scroll that thing.
$('.nav ul').on('click', 'a', function(event){
  event.preventDefault();
  console.log('clicked');
  $('body').animate({
    scrollTop: $('.' + $(this).data('content')).offset().top
  }, 1000);
});
