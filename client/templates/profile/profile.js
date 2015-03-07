
Template.profile.helpers({
  email: function () {
    return Meteor.user().emails[0].address;
  },
  user: function () {
    return Meteor.user();
  },
});
