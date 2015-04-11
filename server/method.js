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
  },
   sendEmail: function(email) {
    // Important server-side check for security and data integrity
    console.log("server is sending email to ", email);
   // console.log(object)
    //check(doc, Emails);
    console.log(email);

    Email.send({
      to: email,
      from: Meteor.user().emails[0].address,
      subject: "Hi",
      text: "I love this project!"
      });
    
    //this.unblock();
  }
});

Meteor.methods({
  'Projects.watch': function (_id) {
    if (!Meteor.user()) {
      return;
    }

    if (_(Meteor.user().watchedProjectIds).include(_id)) {
      return;
    }

    //Projects.update({_id: _id}, {$addToSet: {watchers: this.userId}});
    Meteor.users.update({_id: this.userId}, {$addToSet: {'watchedProjectIds': _id}});
  }
});
