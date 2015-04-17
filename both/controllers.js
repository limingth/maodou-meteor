AppController = RouteController.extend({
  layoutTemplate: 'layout'
});

WelcomeController = AppController.extend({
  waitOn: function () {
    return Meteor.subscribe('projects');
  },
  data: function () {
    return {
      Projects: Projects.find({}, {sort: {}})
    };
  }
});

ProjectsShowController = AppController.extend({
  waitOn: function () {
    return Meteor.subscribe('project', this.params._id);
  },
  data: function () {
    return {
      project: Projects.findOne({_id: this.params._id}),
    };
  }
});

Projects.helpers({
  datePosted: function () {
    // http://momentjs.com/
    return moment(this.createdAt).format('l');
  },
  author: function () {
    return Meteor.users.findOne({_id: this.userId});
  },
});

UsersShowController = AppController.extend({
  waitOn: function () {
    return Meteor.subscribe('user', this.params._id);
  },
  data: function () {
    return {
      user: Meteor.users.findOne({_id: this.params._id})
    }
  }
});
