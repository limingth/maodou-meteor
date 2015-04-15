
Template.profile.helpers({
  email: function () {
    return Meteor.user().emails[0].address;
  },
  user: function () {
    return Meteor.user();
  },
});

Template.registerHelper('get_avatar_url', function(usr) {
  var u = Meteor.users.findOne(usr._id);
  return Avatar.getUrl(u);
});

Meteor.users.helpers({
  isPageOwner: function () {
    return Meteor.user()._id == this._id;
  },
  watchedProjects: function () {
    return Projects.find({_id: {$in: this.watchedProjectIds || []}});
  },
  ownedProjects: function () {
    return Projects.find({_id: {$in: this.ownedProjectIds || []}})
  },
});