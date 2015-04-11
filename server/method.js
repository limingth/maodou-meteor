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
   sendEmail: function(doc,groupEmail) {
    // Important server-side check for security and data integrity
    console.log("Send email");
   // console.log(object)
    //check(doc, Emails);
    
   //this.unblock();

    // Send the e-mail
   //  console.log(groupEmail[0]);
    Email.send({
        to: "lkmcudevelope@gmail.com" ,
        from: "80994016@qq.com",//Meteor.user().emails[0].address,
        subject: doc.titles,
        text: doc.message
    });
  }
});