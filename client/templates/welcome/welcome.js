
Template.welcome.helpers({
  username: function () {
    //return Meteor.user().emails[0].address;
    return Meteor.user().username;
  }
});


