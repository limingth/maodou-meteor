Meteor.publish('projects', function() {
  return Projects.find();
});
/*
Meteor.publish('concernedPeople', function() {
  return Projects.find();
});

*/

Meteor.publishComposite('project', function(_id) {
  return {
    find: function() {
      return Projects.find({_id: _id});
    },
    children: [
      {
        find: function(project) {
          return Meteor.users.find({_id: project.ownerId});
        }
      },
      {
        find: function(project) {
//            console.log('inside children', goal, goal.userId);
            // Find post author. Even though we only want to return
            // one record here, we use "find" instead of "findOne"
            // since this function should return a cursor.
            return Meteor.users.find(
                { _id: project.ownerId },
                { fields: {username: 1, emails: 1, createdAt: 1} });
        }
      },
    ]
  };
});
 
Meteor.publish("users", function (opts) {
   var userFields = { 
    'emails': 1,
    'username': 1,
    'createdAt': 1,
    'watchedProjectIds': 1,
  };  
  // userFields = {}
  // var res = Meteor.users.find( search ,{fields: userFields, sort:{updatedAt:-1} } );
  var res = Meteor.users.find({}, {fields: userFields});

  return res;
});

Meteor.publishComposite('user', function(_id) {
  return {
    find: function() {
      return Meteor.users.find({_id: _id});
    },
    children: [
      {
        find: function(user) {
          return Goals.find({userId: _id});
        }
      }
    ]
  };
});
