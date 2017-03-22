'use strict';
var portfolio = {
  projects: [],
  count: 0,
  githubUrl: 'https://api.github.com/users/W-Ely/repos',
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

portfolio.gatherLocalProjects = function(){
  console.log('getting localData');
  $.getJSON('data/projects.json', function(response){
    console.log('test');
    response.forEach(function(project) {
      portfolio.projects.push(new Project(project));
    });
    portfolio.buildProjectsPage();
  });
}

// bring in those sweet repos
portfolio.findGithubRepos = function() {
  // $.ajax({
  //   dataType: 'json',
  //   url: portfolio.githubUrl,
  //   success: function(response, status){
  //     if (status === 'success'){
  //       response.forEach(function(repo){
  //         if (!repo.fork){
  //           portfolio.projects.push(new Project(repo));
  //         }
  //       });
  //       portfolio.gatherLocalProjects();
  //     }
  //   }
  // });
  portfolio.gatherLocalProjects();
}

portfolio.sortThoseProjectsByDate = function(){
  portfolio.projects.sort(function(a, b){
    //regEx to remove hyphens. could use new Date() but didn't
    return b.lastUpdated.replace(/-/g, '') - a.lastUpdated.replace(/-/g, '');
  });
}

portfolio.buildProjectsPage = function(){
  portfolio.sortThoseProjectsByDate();

  portfolio.projects.forEach(function(project) {
    $('.projects-carousel').append(project.toHtml());
  });
  //wrap all 'article's in a table and row so it will scroll to the right
  $(".projects-carousel").wrapInner("<table><tr>");
  // put each 'article' in a column
  $("article").wrap("<td>");
}

portfolio.findGithubRepos();
