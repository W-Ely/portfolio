'use strict';
var count = 0;

//hope to pass in an object instead of like this, but then why sue the constructor? to be continued...
function Project(name, link, summery, thumb){
  this.name = name;
  this.address = link;
  this.summery = summery;
  this.thumb = thumb;
}

Project.prototype.pageProject = function () {
  var parity;
  if (count % 2 === 0){
    parity = 'even';
  } else {
    parity = 'odd';
  }
  //jquery to populate projects to page
  // $(document).ready(function(){
  //   var $projectsEl = $('#projects');
  //   var $projectEl = $(document).html('<div class="project ' + parity + '"></div>')
  //   var $thumbEl = $('img')
  // });
  count++;
};
// hopeful rough project layout
// <div class="project even">
//   <div class="thumb">
//
//   </div>
//   <div class="sum">
//
//   </div>
// </div>
