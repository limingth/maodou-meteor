Projects.allow({
  'insert': function(userId, project) {
    return true;
  },
  'update': function(userId, project, fields, modifier) {
    return userId === project.owner;
  },
  'remove': function(userId, project) {
    return userId == project.owner;
  }
});
Meteor.users.allow({
  'insert': function(userId, user) {
    return true;
  },
  'update': function(userId, user) {
    return userId === user._id;
  },
  'remove': function(userId, user) {
    return false;
  }
});
