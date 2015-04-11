Goals.allow({
  'insert': function(userId, doc) {
    return userId;
  },
  'update': function(userId, doc, fields, modifier) {
    return userId === doc.userId;
  },
  'remove': function(userId, doc) {
    return true;
  }
});

Projects.allow({
  'insert': function(userId, doc) {
    return ownerId;
  },
  'update': function(userId, doc, fields, modifier) {
    return ownerId === doc.userId;
  },
  'remove': function(userId, doc) {
    return true;
  }
});
