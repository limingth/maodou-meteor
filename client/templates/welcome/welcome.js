
Template.welcome.helpers({
  username: function () {
    //return Meteor.user().emails[0].address;
    return Meteor.user().username;
  }
});


Template.welcome.helpers({
  goals: function () {
    return Goals.find({}, {limit:100, sort:{'numberOfVotes':-1, 'numberOfComments':-1}});
  }
});