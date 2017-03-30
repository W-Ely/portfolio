'use strict';

(function(module) {
  const welcomeController = {};

  welcomeController.index = () => {
    $('section').hide();
    $('#landing').fadeIn();
  };

  module.welcomeController = welcomeController;
})(window);
