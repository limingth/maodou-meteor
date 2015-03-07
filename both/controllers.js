AppController = RouteController.extend({
  layoutTemplate: 'layout'
});

WelcomeController = AppController.extend({
  waitOn: function () {
    return Meteor.subscribe('goals');
  },
  data: function () {
    return {
      goals: Goals.find({}, {sort: {}})
    };
  }
});

GoalsShowController = AppController.extend({
  waitOn: function () {
    return Meteor.subscribe('goal', this.params._id);
  },
  data: function () {
    return {
      goal: Goals.findOne({_id: this.params._id}),
      //comments: Comments.find({productId: this.params._id}, {sort: {createdAt: -1}})
    };
  }
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

UsersShowController = AppController.extend({
  waitOn: function () {
    return Meteor.subscribe('user', this.params._id);
  },
  data: function () {
    return {
      user: Meteor.users.findOne({_id: this.params._id})
    }
  }
});
