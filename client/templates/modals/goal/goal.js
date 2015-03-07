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
    var members = Goals.findOne(this._id).members;
    return members.length;
  },
});

Template._goalItem.helpers({
  numberOfMembers: function () {
    console.log ('members is :', this._id);
    var members = Goals.findOne(this._id).members;
    return members.length;
  },
});

Template._goalItem.events({
  'click [data-action=help]': function (event, template) {
    console.log ("Help him clicked!");
    console.log (this);
  },
  'click [data-action=join]': function (event, template) {
    console.log ("Join team clicked!");
    console.log (this);

    for (i = 0; i < this.members.length; i++) {
      var m = this.members[i];
      console.log("m id: ", m.id);
      console.log("current id:", Meteor.userId());
      if (m.id == Meteor.userId())
      {
        console.log ('you are in this group');
        alert('you are in this group Already');
        return;
      }
    }

    var g = this;
    console.log ("join id: ", Meteor.userId());
    console.log ("join picture: ", Meteor.user().username);
    g.members.push({ id: Meteor.userId(), picture: Meteor.user().username});

    var modifies = {
      count: g.members.length,
      members: g.members,
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