'use strict';

(function(module){

  const portfolio = {
    projects: [],
    count: 0,
    githubUrl: 'https://api.github.com/users/W-Ely/repos',
  };

  function Project(projectData){
    this.name = projectData.name;
    //TODO if the project has a live address use it. Maybe for thumbnail?
    this.address = projectData.html_url,
    this.summary = projectData.description,
    this.lastUpdated = projectData.updated_at.slice(0, 10),
    this.preview = 'assets/Sceenshot.png'
  }

  Project.prototype.toHtml = function() {
    // useing handlebars for javasript templeting.
    return Handlebars.compile($('#project-template').html())(this);
  };

  portfolio.gatherLocalProjects = () => {
    $.getJSON('data/projects.json', response => {
      response.forEach(project => {
        portfolio.projects.push(new Project(project));
      });
      portfolio.buildProjectsPage();
    });
  }

  // bring in those sweet repos
  portfolio.findGithubRepos = () => {
    $.ajax({
      dataType: 'json',
      url: portfolio.githubUrl,
      success: (response, status) => {
        response.forEach(repo => {
          if (!repo.fork) portfolio.projects.push(new Project(repo));
        });
        portfolio.gatherLocalProjects();
      }
    });
    // line remains for development, prevent unneed api calls during testing.
    // portfolio.gatherLocalProjects();
  }

  portfolio.sortThoseProjectsByDate = () => {
    portfolio.projects.sort((a, b) => {
      //regEx to remove hyphens. could use new Date() but didn't
      return b.lastUpdated.replace(/-/g, '') - a.lastUpdated.replace(/-/g, '');
    });
  }

  portfolio.buildProjectsPage = () => {
    portfolio.sortThoseProjectsByDate();
    portfolio.projects.forEach(project => {
      $('.projects-carousel').append(project.toHtml());
    });
    //wrap all 'article's in a table and row so it will scroll to the right
    $(".projects-carousel").wrapInner("<table><tr>");
    // put each 'article' in a column
    $("article").wrap("<td>");
    //a map and a reduce for educational purpose.
    // let projectNames = portfolio.projects.map( project => project.name).reduce((acc, name) => acc + ', ' + name);
    // console.log(projectNames);
  }

  portfolio.findGithubRepos();

  module.portfolio = portfolio;
  module.Project = Project;

}(window));
