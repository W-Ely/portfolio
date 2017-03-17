'use strict';
var count = 0;
var projects = [];

function Project(projectData){
  this.name = projectData.name;
  //TODO if the project has a live address use it.
  this.address = projectData.html_url;
  this.summery = projectData.description;
  //TODO need to better handle this date.
  this.lastUpdated = projectData.updated_at.slice(0, 10);
  this.preview = 'assets/Sceenshot.png'
}

Project.prototype.toHtml = function () {
  var parity;
  if (count % 2 === 0){
    parity = 'even';
  } else {
    parity = 'odd';
  }
  // TODO add the handlebars code
  count++;
  return $projectEl;
};

// bring in those sweet repos
function findGithubRepos(){
  $.ajax({
    dataType: 'json',
    url: 'https://api.github.com/users/W-Ely/repos',
    success: function(response, status){
      if (status === 'success'){
        response.forEach(function(repo){
          if (!repo.fork){
            projects.push(new Project(repo));
          }
        });
        buildProjectsPage();
      }
    }
  });
}

function sortThoseProjectsByDate(){
  projects.sort(function(a, b){
    //regEx to remove hyphens. could use new Date() but didn't
    return b.lastUpdated.replace(/-/g, '') - a.lastUpdated.replace(/-/g, '');
  });
}

function buildProjectsPage(){

  projectData.forEach(function(project) {
    projects.push(new Project(project));
  });

  sortThoseProjectsByDate();

  projects.forEach(function(project) {
    $('.projects').append(project.toHtml());
  });
}

findGithubRepos();
