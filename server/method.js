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
   sendEmail: function(groupEmail) {
    // Important server-side check for security and data integrity
    console.log("Send email");
   // console.log(object)
    //check(doc, Emails);
    console.log(groupEmail);
    /*
    for(i = 1;i<groupEmail.length;i++){
          Email.send({
          to: groupEmail[i],
          from: "80994016@qq.com",//Meteor.user().emails[0].address,
          subject: doc.titles,
          text: doc.message
      });
    }*/
   //this.unblock();

    // Send the e-mail
   //  console.log(groupEmail[0]);
    
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
