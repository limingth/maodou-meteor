/*AutoForm.hooks({
   
     'group-email-form': {
        onSubmit: function (doc) {
            //console.log("Send email");
          // console.log(Projects.findOne(this._id).teamMembersEmail[0]);
          var members  = Projects.findOne(this._id).teamMembersEmail;
          //console.log(members.length);
            Meteor.call('sendEmail',doc,members.teamMembersEmail);
            //IonModal.close();
           // Router.go('goals.show', {_id: result});
        }
    }
});*/

Template.projects.helpers({

  projects: function () {
    return Projects.find({}, {limit:100, sort:{}});
  },
  projectMember:function(){
    return concernedPeople.findOne(this._id).teamMembers
  }
});

Template.registerHelper('member_of_watchers', function(group) {
  return Meteor.userId() && _.find(group.watchers, function(member) {
    return member === Meteor.userId();
  });
});

Template.registerHelper('ownerOf', function(group) {
  return Meteor.userId() === group.userId;
});



Template.projectsShow.helpers({

  hisname: function () {
    //return Meteor.user().emails[0].address;
    return Meteor.user().username;
  },
  watchers_count: function () {
    //return Meteor.user().emails[0].address;
    return this.watchers.length-1;
  },
  watchers: function () {
    //return Meteor.user().emails[0].address;

    //Meteor.users.find({}, {limit:100, sort:{}});
    //_.each(this.watchers)
    var watchers = [];

    _.each(this.watchers, function(wid) {
      console.log (wid);
      var u = Meteor.users.findOne(wid);
      watchers.push(u);
    });

    console.log (watchers);
    return watchers;
  },



  numberOfMembers: function () {
//    console.log ('members is :', this._id);
    var members = concernedPeople.findOne(this._id).teamMembers;
    return members.length;
  },
  getusername: function (id) {
//    console.log ('user id is :', id);
    var u = Meteor.users.findOne(id);
    return u.username;
  },
  isTeamMember: function () {
//    console.log(this);
    if (!UI._globalHelpers.memberOf(this))
      return false;
    else
      return true;
  },
  isTeamOwner: function () {
//    console.log(this);
    if (!UI._globalHelpers.ownerOf(this))
      return false;
    else
      return true;
  }
});


Template.projectsShow.events({
 'click [data-action=email]': function (event, template) {
  console.log ("Join team clicked!");
    var modifies;

    if (Meteor.user() == null)
    {
      //alert('You should log in before join this team');
     // this.close();
      Router.go('profile');
      return;
    }

    if (UI._globalHelpers.memberOf(this))
    {
      alert('You are in this group already');
      return;
    }

    this.teamMembers.push(Meteor.userId());

    modifies = {
      teamMembers: this.teamMembers
    };

   Projects.update(this._id, {
      $set: modifies
    }, function(error) {
      if (error) {
        return alert(error.reason);
      }
    });

   this.teamMembersEmail.push(Meteor.user().emails[0].address);

    modifies = {
     teamMembersEmail: this.teamMembersEmail
    };

   Projects.update(this._id, {
      $set: modifies
    }, function(error) {
      if (error) {
        return alert(error.reason);
      }
    });
  },
 'click [data-action=watch]': function (event, template) {
    console.log ("Watch buttion clicked!");

    var modifies;

    if (Meteor.user() == null)
    {
      //alert('You should log in before join this team');
     // this.close();
      Router.go('profile');
      return;
    }

    if (UI._globalHelpers.member_of_watchers(this))
    {
      alert('You have watched already');
      return;
    }

    this.watchers.push(Meteor.userId());
    modifies = {
      watchers: this.watchers
    };

    Projects.update(this._id, {
      $set: modifies
    }, function(error) {
      if (error) {
        return alert(error.reason);
      }
    });
  },
   'click [data-action=share]': function (event, template) {
    console.log ("share!");
    var modifies;
  },
   'click [data-action=groupEmail]': function (event, template) {
      console.log ("groupEmail!");
      console.log (this);

       var watchers_emails = [];
     //  author_email = Meteor.users.findOne(this.author_Id).emails[0].address
    _.each(this.watchers, function(wid) {
      console.log (wid);
      //console.log(this);
      
      var u = Meteor.users.findOne(wid);
      watchers_emails.push(u.emails[0].address);
    });
       console.log(watchers_emails[0]);
       Meteor.call('sendEmail',watchers_emails[0]);
  },
}); 