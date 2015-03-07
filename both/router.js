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
  this.render('welcome', {
    data: function () { 
      return {
        goals: Goals.find()
      }
    }
  });
});

Router.route('/goals/:_id', {
  name: 'goals.show'
});

Router.route('/users/:_id', {
  name: 'users.show'
});

Router.map(function() {
  this.route('profile');
  this.route('welcome');
  this.route('settings');
  this.route('newGoal');
});
