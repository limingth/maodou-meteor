AutoForm.hooks({
    'goal-new-form': {
        onSuccess: function (operation, result, template) {
            IonModal.close();
            Router.go('goals.show', {_id: result});
        }
    }
});

Template.goalsShow.helpers({
  numberOfMembers: function () {
    console.log ('members is :', this._id);
    var members = Goals.findOne(this._id).teamMembers;
    return members.length;
  },
  getusername: function (id) {
    console.log ('user id is :', id);
    var u = Meteor.users.findOne(id);
    return u.username;
  },
});

Template._goalItem.helpers({
  numberOfMembers: function () {
    var members = this.teamMembers;
    return members? members.length: 0;
  },
  author: function () {
    console.log ('author is :', this.userId);
    var u = Meteor.users.findOne(this.userId);
    return u;
  },
  isTeamMember: function () {
    for (var i = 0; i < this.teamMembers.length; i++) {
      var mid = this.teamMembers[i];
      console.log("m id: ", mid);
      console.log("current id:", Meteor.userId());
      if (mid == Meteor.userId())
      {
        console.log ('you are in this group');
        return true;
      }
    }
    return false;
  },
  isMentorMember: function () {
    for (var i = 0; i < this.teamMembers.length; i++) {
      var mid = this.teamMembers[i];
      console.log("m id: ", mid);
      console.log("current id:", Meteor.userId());
      if (mid == Meteor.userId())
      {
        console.log ('you are in this group');
        return true;
      }
    }
    return false;
  }
});

Template._goalItem.events({
  'click [data-action=help]': function (event, template) {
    console.log ("Help him clicked!");
    console.log (this);
  },
  'click [data-action=join]': function (event, template) {
    console.log ("Join team clicked!");
    console.log (this);

    for (var i = 0; i < this.teamMembers.length; i++) {
      var mid = this.teamMembers[i];
      console.log(i, ": m id: ", mid);
      console.log("current id:", Meteor.userId());
      if (mid == Meteor.userId())
      {
        alert('you are in this group Already');
        return ;
      }
    }

    var g = this;
    console.log ("join id: ", Meteor.userId());
    console.log ("join picture: ", Meteor.user().username);
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