Meteor.methods({
  'Users.delete': function (_id) {
    console.log ('Users.delete called')
    if (!Meteor.user()) {
      return;
    }

    var user = Meteor.users.findOne(_id);

    console.log ('delete username is ', user.username);
    Meteor.users.remove(_id);
  },
  sendEmail: function(email) {
    console.log("server is sending email to ", email);
    console.log(email);
    Email.send(email);
  }
});

Meteor.methods({
  'Projects.watch': function (_id) {
    console.log('watch pid is ', _id);
    if (!Meteor.user()) {
      return;
    }

    if (_(Meteor.user().watchedProjectIds).include(_id)) {
      return;
    }

    Projects.update({_id: _id}, {$addToSet: {watchers: this.userId}});
    Meteor.users.update({_id: this.userId}, {$addToSet: {'watchedProjectIds': _id}});
  }
});

Meteor.methods({
  'Projects.unwatch': function (_id) {
    console.log('unwatch pid is ', _id);

    if (!Meteor.user()) {
      return;
    }
/*
    if (!_(Meteor.user().watchedProjectIds).include(_id)) {
      return;
    }
*/
    Projects.update({_id: _id}, {$pull: {watchers: this.userId}});
    Meteor.users.update({_id: this.userId}, {$pull: {'watchedProjectIds': _id}});
    console.log('unwatch ok');
  }
});

