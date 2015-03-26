Goals = new Mongo.Collection('goals');

Projects = new Mongo.Collection('projects');

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
      placeholder: '项目Github Repo地址'
    },
    max: 200
  },
  steps: {
      type: Array,
      optional: true,
      minCount: 0,
      maxCount: 100
   },
   "steps.$": {
      type: Object,
      optional: true
   },
   "steps.$.description": {
      type: String
   },
   "steps.$.snapshot_url": {
      type: String
   }
}));
