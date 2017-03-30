'use strict';

(function(module) {
  const contactController = {};

  contactController.index = () => {
    $('section').hide();
    $('#contact').fadeIn();

  module.contactController = contactController;
})(window);
