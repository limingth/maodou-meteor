
Template.welcome.helpers({
  hisname: function () {
    //return Meteor.user().emails[0].address;
    return Meteor.user().username;
  },
  usercount: function () {
    //return Meteor.user().emails[0].address;
    return Meteor.users.find().fetch().length;
  },
  users: function () {
    //return Meteor.user().emails[0].address;
    return Meteor.users.find().fetch();
  },
});


