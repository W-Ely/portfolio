'use strict';
var portfolio = {
  projects: [],
};

function Project(projectData){
  this.name = projectData.name;
  //TODO if the project has a live address use it. Maybe for thumbnail?
  this.address = projectData.html_url;
  this.summery = projectData.description;
  this.lastUpdated = projectData.updated_at.slice(0, 10);
  this.preview = 'assets/Sceenshot.png'
}

Project.prototype.toHtml = function() {
  // useing handlebars for javasript templeting.
  return Handlebars.compile($('#project-template').html())(this);
};

// bring in those sweet repos
portfolio.findGithubRepos = function() {
  // $.ajax({
  //   dataType: 'json',
  //   url: 'https://api.github.com/users/W-Ely/repos',
  //   success: function(response, status){
  //     if (status === 'success'){
  //       response.forEach(function(repo){
  //         if (!repo.fork){
  //           portfolio.projects.push(new Project(repo));
  //         }
  //       });
  //       portfolio.buildProjectsList();
  //     }
  //   }
  // });
  //duplicate not need to keep spamming api calls while testing
  portfolio.buildProjectsList();
}

portfolio.sortThoseProjectsByDate = function(){
  portfolio.projects.sort(function(a, b){
    //regEx to remove hyphens. could use new Date() but didn't
    return b.lastUpdated.replace(/-/g, '') - a.lastUpdated.replace(/-/g, '');
  });
}

portfolio.buildProjectsList = function(){

  projectData.forEach(function(project) {
    portfolio.projects.push(new Project(project));
  });

  portfolio.sortThoseProjectsByDate();

  portfolio.projects.forEach(function(project) {
    $('.projects-carousel').append(project.toHtml());
  });
}

portfolio.findGithubRepos();
