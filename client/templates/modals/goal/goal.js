AutoForm.hooks({
    'goal-new-form': {
        onSuccess: function (operation, result, template) {
            IonModal.close();
            Router.go('goals.show', {_id: result});
        }
    }
});

AutoForm.hooks({
    'project-new-form': {
        onSuccess: function (operation, result, template) {
            IonModal.close();
            Router.go('projects.show', {_id: result});
        }
    },
      'group-email-form': {
        onSubmit: function (doc) {
            //console.log("Send email");
          // console.log(Projects.findOne(this._id).teamMembersEmail[0]);
          //var members  = Projects.findOne(result).teamMembersEmail;
          //console.log(members.length);
            //console.log(this);
            Meteor.call('sendEmail',doc);
            IonModal.close();
            //console.log("Send email");
            //Router.go('goals.show', {_id: result});
        }
    }
});

Template.registerHelper('memberOf', function(group) {
  return Meteor.userId() && _.find(group.teamMembers, function(member) {
    return member === Meteor.userId();
  });
});

Template.registerHelper('ownerOf', function(group) {
  return Meteor.userId() === group.userId;
});

Template.goals.helpers({
  goals: function () {
    return Goals.find({}, {limit:100, sort:{'numberOfVotes':-1, 'numberOfComments':-1}});
  }
});

Template.goalsShow.helpers({
  numberOfMembers: function () {
//    console.log ('members is :', this._id);
    var members = Goals.findOne(this._id).teamMembers;
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


Template.goalsShow.events({

 'click [data-action=join]': function (event, template) {
//    console.log ("Join team clicked!");
    var modifies;

    if (Meteor.user() == null)
    {
      //alert('You should log in before join this team');
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

    Goals.update(this._id, {
      $set: modifies
    }, function(error) {
      if (error) {
        return alert(error.reason);
      }
    });
  },
   'click [data-action=delete]': function (event, template) {
//    console.log ("Delete goal clicked!");

    Goals.remove(this._id);
    Router.go('welcome');
  },
  'click [data-action=outgroup]': function (event, template) {
            //console.log ("Member  out");
            var g = this;
            var i ;
            for(i = 0 ;i < g.teamMembers.length ; i++){
                  if(g.teamMembers[i] == Meteor.userId()){
                            break;
                  }
            }
            g.teamMembers.splice( i , 1 );

             var modifies = {
              teamMembers: g.teamMembers,
            }

            Goals.update(this._id, {$set: modifies}, function(error) {
              if (error) {
                // display the error to the user
                alert(error.reason);
              } else {
                Router.go('welcome');
              }
            });
          },
});

Template._goalItem.helpers({
  numberOfMembers: function () {
    var members = this.teamMembers;
    return members? members.length: 0;
  },
  author: function () {
//    console.log ('author is :', this.userId);
    var u = Meteor.users.findOne(this.userId);
    return u;
  },
  isTeamMember: function () {
    for (var i = 0; i < this.teamMembers.length; i++) {
      var mid = this.teamMembers[i];
      if (mid == Meteor.userId())
      {
  //    console.log ('You are in this group');
        return true;
      }
    }
    return false;
  },
  isMentorMember: function () {
    for (var i = 0; i < this.teamMembers.length; i++) {
      var mid = this.teamMembers[i];
      if (mid == Meteor.userId())
      {
  //    console.log ('you are in this group');
        return true;
      }
    }
    return false;
  }
});

Template._goalItem.events({
  'click [data-action=help]': function (event, template) {
 //   console.log ("Help him clicked!");
 //   console.log (this);
  },
  'click [data-action=join]': function (event, template) {
//    console.log ("Join team clicked!");
//    console.log (this);

    if (Meteor.user() == null)
    {
      //alert('You should log in before join this team');
      Router.go('profile');
      return;
    }

    for (var i = 0; i < this.teamMembers.length; i++) {
      var mid = this.teamMembers[i];
//      console.log(i, ": m id: ", mid);
//      console.log("current id:", Meteor.userId());
      if (mid == Meteor.userId())
      {
        alert('You are in this group already');
        return ;
      }
    }

    var g = this;
//    console.log ("join id: ", Meteor.userId());
//    console.log ("join picture: ", Meteor.user().username);
    g.teamMembers.push(Meteor.userId());

    var modifies = {
      teamMembers: g.teamMembers,
    }

    Goals.update(this._id, {$set: modifies}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('welcome');
      }
    });
  },
});