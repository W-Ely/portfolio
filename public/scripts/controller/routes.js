'use strict';

page('/', welcomeController.index);
page('/skills', skillsController.index);
page('/contact', contactController.index);
page('/projects', projectsController.index);

page();
