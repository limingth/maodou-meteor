Template.projects.helpers({
  projects: function () {
    return Projects.find({}, {limit:100, sort:{}});
  }
});