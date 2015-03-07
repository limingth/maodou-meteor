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

/*
Goals.attachSchema(new SimpleSchema({
  desc: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '目标一句话描述'
    },
    max: 200
  },
  tagline: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '技术关键字'
    },
    max: 200
  },
  price: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: '可以承受的学费'
    },
    max: 200
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
    type: Date
  },
  members: {
    type: [{}]
  }
}));
*/ 