Meteor.methods({
  'Users.delete': function (_id) {
    console.log ('Users.delete called')
    if (!Meteor.user()) {
      return;
    }

    console.log ('delete user id', _id);
    var user = Meteor.users.findOne(_id);

    console.log ('delete username is ', user.username);
    Meteor.users.remove(_id);
  }
});