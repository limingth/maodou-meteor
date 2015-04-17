
Template.welcome.helpers({
  hisname: function () {
    return Meteor.user().username;
  },
  usercount: function () {
    return Meteor.users.find().fetch().length;
  },
  users: function () {
    // 用不同的颜色去渲染当前参与学习的用户的名字
    var colors = ['#b6b6b4', '#7a7fb6', '#95d0de', '#938ea5', '#d6a7c9', '#c3d0c9'];
    var users = Meteor.users.find().fetch();
    _.each(users, function (item, i) {
      item.usercolor = colors[i % 6];
    });
    return users;
  },
});


