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
    data: function () { return; }
  });
});

Router.map(function() {
  this.route('profile');
  this.route('welcome');
  this.route('settings');
});

