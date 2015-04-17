AutoForm.addHooks("project-edit-form", {
  docToForm: function(doc) {
    return Projects.findOne(Session.get('current-project'));
  },
  onSuccess: function(formType, result) {
    var projectId = this.docId;
    IonModal.close();
  }
});

AutoForm.addHooks("project-new-form", {
  onSuccess: function(formType, result) {
    console.log('Success submit!');
    console.log(result);
    var projectId = this.docId;
    IonModal.close();
    projectId && Router.go('/projects/' + projectId);
  }
});

Template.projects.helpers({

  projects: function () {
    return Projects.find({}, {limit:100, sort:{}});
  },
  watchers_count:function(){
    var p = Projects.findOne(this._id);
    if (p && p.watchers) {
      return p.watchers.length;
    };
    return 0;
  }
});

// 欢迎横条点击后展示当前用户情况功能的事件绑定
Template.projects.rendered = function () {
  $('.welcome-header').on('click', function () {
    $('.welcome-brief').toggle(500);
  })
}

// 一个project展示的时候，使用session存储其ID，方便从当前页面出发，对project做各种操作
Template.projectsShow.rendered = function () {
  this.data && this.data.project && Session.set('current-project', this.data.project._id)
}

Template.editProject.helpers({
  project: function () {
    var pId = Session.get('current-project');
    return Projects.findOne(pId);
  }
});

Template.registerHelper('member_of_watchers', function(project) {
  var uid = Meteor.userId();
  return uid && _.find(project.watchers, function(member) {
    return member === uid;
  });
});

Template.registerHelper('ownerOf', function(project) {
  return Meteor.userId() === project.owner;
});

Template.registerHelper('get_project_avatar_url', function(project) {
  var u = Meteor.users.findOne(project.owner);
  return Avatar.getUrl(u) || "http://alaframboise.github.io/presentations/esrigithub/images/github.png";
});

Template.projectsShow.helpers({

  hisname: function () {
    return Meteor.user().username;
  },
  watchers_count: function () {
    return this.watchers.length;
  },
  watchers: function () {
    var watchers = [];

    _.each(this.watchers, function(wid) {
      console.log (wid);
      var u = Meteor.users.findOne(wid);
      watchers.push(u);
    });

    return watchers;
  },

  numberOfMembers: function () {
    var members = concernedPeople.findOne(this._id).teamMembers;
    return members.length;
  },
  owner: function () {
    console.log ('this is :', this);
    var u = Meteor.users.findOne(this.owner);
    return u;
  },
  isWatcher: function () {
    if (!UI._globalHelpers.member_of_watchers(this))
      return false;
    else
      return true;
  },
  isTeamOwner: function () {
    console.log('Is team owner? ')
    console.log(this);
    if (!UI._globalHelpers.ownerOf(this))
      return false;
    else
      return true;
  },
  snapshot_is_img: function () {
    var fullPath = this.snapshot_url;
    var filename = fullPath.replace(/^.*[\\\/]/, '');
    var type = filename.split('.').pop();

    if (type == "png" || type == "jpg" || type == "gif" || type == "jpeg" || type == "bmp") 
      return true;
    else
      return false;
  },
});

Template._projectWatchItem.events({
 'click .unwatch-item': function (event, template) {
    event.preventDefault();
    Meteor.call('Projects.unwatch', this._id);
  }
});

Template._projectOwnerItem.events({
 'click .del-item': function (event, template) {
    event.preventDefault();
    if (confirm("删除后不可恢复，确定？")) {
      Projects.remove(this._id);
    }
  }
});

Template.projectsShow.events({
 'click [data-action=email]': function (event, template) {
    console.log ("Join team clicked!");
    var modifies;

    if (Meteor.user() == null)
    {
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

    Meteor.call('Projects.watch', this._id);
  },
 'click [data-action=unwatch]': function (event, template) {
    console.log ("unWatch buttion clicked!");
    Meteor.call('Projects.unwatch', this._id);
  },
   'click [data-action=share]': function (event, template) {
    console.log ("share!");
    alert('you will share this project ' + this.name + ' to public');
  },
   'click [data-action=groupEmail]': function (event, template) {
      console.log ("groupEmail!");
      console.log (this);

      _.each(this.watchers, function(wid) {
        console.log (wid);
        var u = Meteor.users.findOne(wid);
        var email = u.emails[0].address;
        console.log('sending email to ', email);
        Meteor.call('sendEmail', email); 
      });
      alert('Your application email is sent to this project watchers: ' + this.watchers.length);
  },
}); 
