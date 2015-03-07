Goals = new Mongo.Collection('goals');

Goals.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});

Goals.helpers({
  datePosted: function () {
    // http://momentjs.com/
    return moment(this.createdAt).format('l');
  },
  author: function () {
    return Meteor.users.findOne({_id: this.userId});
  },
/*
  voters: function () {
    return Meteor.users.find({_id: {$in: this.voterIds}});
  }
*/
});

Goals.attachSchema(new SimpleSchema({
  desc: {
    type: String,
    label: "Answer",
    autoform: {
      'label-type': 'placeholder',
      placeholder: '一句话描述目标(两个月学会meteor)'
    },
    max: 200
  },
  background: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '自身基础(有两年c语言经验，web开发零基础)'
    },
    max: 200
  },
  result: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '期望达到效果(开发一个知乎类问答网站)'
    },
    max: 200
  },
  expense: {
    type: Number,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '可以承受费用(500元)'
    },
    max: 100000
  },
  userId: {
    type: String,
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
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else {
        this.unset();
      }
    }
  },
  teamMembers: {
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
    }
  }
}));
