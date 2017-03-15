'use strict';
var count = 0;
var projects = [];

//hope to pass in an object instead of like this, but then why sue the constructor? to be continued...
function Project(projectData){
  this.name = projectData.name;
  this.address = projectData.link;
  this.summery = projectData.summery;
  this.preview = projectData.preview;
}

Project.prototype.toHtml = function () {
  var parity;
  var $projectEl = $('#template').clone();
  $projectEl.removeClass();

  if (count % 2 === 0){
    parity = 'even';
  } else {
    parity = 'odd';
  }
  $projectEl.attr('class', 'project ' + parity); //change parity

  $projectEl.find('.name').text(this.name);
  $projectEl.find('.sum').text(this.summery);
  $projectEl.find('a').attr({href: this.address, target: '_blank'});
  $projectEl.find('img').attr('src', this.preview);

  count++;
  return $projectEl;
};

projectData.forEach(function(project) {
  projects.push(new Project(project));
});

projects.forEach(function(project) {
  $('#projects').append(project.toHtml());
});
