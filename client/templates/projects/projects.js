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
  watchers_count:function(){
    return Projects.findOne(this._id).watchers.length;
  }
});

Template.projects.rendered = function () {
  /*setTimeout(function () {
    $('.welcome-hint').hide(1000);
  }, 2000);*/
  $('.welcome-header').on('click', function () {
    $('.welcome-brief').toggle(500);
  })
}

Template.registerHelper('member_of_watchers', function(group) {
  return Meteor.userId() && _.find(group.watchers, function(member) {
    return member === Meteor.userId();
  });
});

Template.registerHelper('ownerOf', function(group) {
  return Meteor.userId() === group.userId;
});

Template.registerHelper('get_project_avatar_url', function(project) {
  var u = Meteor.users.findOne(project.owner);
  return Avatar.getUrl(u) || "http://alaframboise.github.io/presentations/esrigithub/images/github.png";
  // '/maodou-logo.png';
});

Template.projectsShow.helpers({

  hisname: function () {
    //return Meteor.user().emails[0].address;
    return Meteor.user().username;
  },
  watchers_count: function () {
    //return Meteor.user().emails[0].address;
    return this.watchers.length;
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
  owner: function () {
    console.log ('this is :', this);
    var u = Meteor.users.findOne(this.owner);
    return u;
  },
  isWatcher: function () {
//    console.log(this);
    if (!UI._globalHelpers.member_of_watchers(this))
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
  },
  snapshot_is_img: function () {
    //console.log('this is ', this);
    var fullPath = this.snapshot_url;
    var filename = fullPath.replace(/^.*[\\\/]/, '');
    //console.log(filename);
    var type = filename.split('.').pop();
    //console.log(type);
    if (type == "png" || type == "jpg" || type == "gif" || type == "jpeg" || type == "bmp") 
      return true;
    else
      return false;
  },
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

    //Meteor.user().watchedProjects.push(this._id);
    Meteor.call('Projects.watch', this._id);
  },
 'click [data-action=unwatch]': function (event, template) {
    console.log ("unWatch buttion clicked!");
    //Meteor.user().watchedProjects.push(this._id);
    Meteor.call('Projects.unwatch', this._id);
  },
   'click [data-action=share]': function (event, template) {
    console.log ("share!");
    
    alert('you will share this project ' + this.name + ' to public');
  },
   'click [data-action=groupEmail]': function (event, template) {
      console.log ("groupEmail!");
      console.log (this);

      //  author_email = Meteor.users.findOne(this.author_Id).emails[0].address
      _.each(this.watchers, function(wid) {
        console.log (wid);
        //console.log(this);
        var u = Meteor.users.findOne(wid);
        var email = u.emails[0].address;
        console.log('sending email to ', email);
        Meteor.call('sendEmail', email); 
      });
      alert('Your application email is sent to this project watchers: ' + this.watchers.length);
  },
}); 
