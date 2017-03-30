'use strict';

(function(module) {
  const skillsController = {};

  skillsController.index = () => {
    $('section').hide();
    $('#skills').fadeIn();

  };

  module.skillsController = skillsController;
})(window);
