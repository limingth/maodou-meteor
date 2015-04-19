Projects = new Mongo.Collection('projects');

Emails = new Mongo.Collection('emails');

Projects.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});

Projects.after.insert(function (userId, doc) {
  var projectId = this._id;
  Meteor.users.find({_id: userId}).fetch().forEach(function (user, i) {
    user.watchedProjectIds.push(projectId);
    user.ownedProjectIds.push(projectId);
    delete user._id;
    Meteor.users.update({_id: userId}, {$set: user});
  })
});

// refer to https://developer.github.com/v3/repos/
Projects.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Answer",
    autoform: {
      'label-type': 'placeholder',
      placeholder: '项目名称(毛豆网)'
    },
    max: 200
  },
  description: {
    type: String,
    label: "Answer",
    autoform: {
      'label-type': 'placeholder',
      placeholder: '一句话描述项目(在线协作学习社区)'
    },
    max: 200
  },
  url: {
    type: String,
    label: "Answer",
    autoform: {
      'label-type': 'placeholder',
      placeholder: '项目Github Repo地址，如果没有可以放项目网站URL链接'
    },
    max: 200
  },
  steps: {
      type: Array,
      optional: true,
      minCount: 0,
      maxCount: 100,
      label: "步骤"
   },
  "steps.$": {
      type: Object,
      optional: true
   },
  "steps.$.description": {
      type: String,
      label: "Answer",
    autoform: {
      'label-type': 'placeholder',
      placeholder: '学习知识点描述'
    },
   },
  "steps.$.snapshot_url": {
      type: String,
      label: "Answer",
    autoform: {
      'label-type': 'placeholder',
      placeholder: '填写参考资料链接，如链接结尾是jpg/png，则此链接会显示为图片'
    },
   },
  watchers: {
    type: [String],
    autoValue: function () {
      if (this.isSet) {
        return;
      }
      if (this.isInsert) {
        return [Meteor.userId()];
      } else {
        this.unset();
      }
    },
  },
  owner: {
    type: String,
    optional: false,
    autoValue: function () {
      if (this.isSet) {
        return;
      }
      if (this.isInsert) {
        return Meteor.userId();
      } else {
        this.unset();
      }
    }
  },

}));

Emails.attachSchema(new SimpleSchema({
  titles: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '邮件主题'
    },
    max: 50
  },
  message: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '邮件内容',
      rows: 5
    },
    min: 20,
    max: 1000
  },
  owner: {
    type: String,
    optional: false,
    autoValue: function () {
      if (this.isSet) {
        return;
      }
      if (this.isInsert) {
        return Meteor.userId();
      } else {
        this.unset();
      }
    }
  },
  receiver: {
    type: String,
    optional: false
  }
}));
