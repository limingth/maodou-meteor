Router.configure({
  layoutTemplate: 'layout'
});

Meteor.startup(function () {
  if (Meteor.isClient) {
    var location = Iron.Location.get();
    if (location.queryObject.platformOverride) {
      Session.set('platformOverride', location.queryObject.platformOverride);
    }
  }
});

Router.route('/', function () {
  this.render('welcome');
});

Router.route('/goals/:_id', {
  name: 'goals.show'
});

Router.route('/users/:_id', {
  name: 'users.show'
});

Router.route('/projects/:_id', {
  name: 'projects.show'
});

Router.map(function() {
  this.route('profile');
  this.route('welcome');
  this.route('settings');
  this.route('newGoal');
  this.route('newProject');
  this.route('groupEmail');
});

