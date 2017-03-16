'use strict';
var count = 0;
var projects = [];

//hope to pass in an object instead of like this, but then why sue the constructor? to be continued...
function Project(projectData){
  this.name = projectData.name;
  this.address = projectData.html_url;
  this.summery = projectData.description;
  this.lastUpdated = projectData.updated_at;
  this.preview = 'assets/Sceenshot.png'
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

function findGithubRepos(){
  $.ajax({
    dataType: 'json',
    url: 'https://api.github.com/users/W-Ely/repos',
    success: function(response, status){
      if (status === 'success'){
        response.forEach(function(repo){
          if (!repo.fork){
            projectData.push(new Project(repo));
          }
        });
        buildProjectsPage();
      }
    }
  });
}

function buildProjectsPage(){
  // bring in those sweet repos

  projectData.forEach(function(project) {
    projects.push(new Project(project));
  });

  projects.forEach(function(project) {
    $('#projects').append(project.toHtml());
  });
}

findGithubRepos();
