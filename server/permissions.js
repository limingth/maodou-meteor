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
Emails.allow({
  'insert': function(userId, email) {
    return userId === email.owner;
  },
  'update': function (userId, email, fields, modifier) {
    return userId === email.owner;
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
