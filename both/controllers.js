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

GoalsShowController = AppController.extend({
  waitOn: function () {
    return Meteor.subscribe('project', this.params._id);
  },
  data: function () {
    return {
      Project: Projects.findOne({_id: this.params._id}),
      //comments: Comments.find({productId: this.params._id}, {sort: {createdAt: -1}})
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

Goals.helpers({
  datePosted: function () {
    // http://momentjs.com/
    return moment(this.createdAt).format('l');
  },
  author: function () {
    return Meteor.users.findOne({_id: this.userId});
  },
/*
  voters: function () {
    return Meteor.users.find({_id: {$in: this.voterIds}});
  }
*/
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
