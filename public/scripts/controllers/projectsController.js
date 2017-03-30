'use strict';

(function(module) {
  const projectsController = {};

  projectsController.index = () => {
    $('section').hide();
    $('#projects').fadeIn();

  };

  module.projectsController = projectsController;
})(window);
