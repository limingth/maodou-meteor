Meteor.publish('goals', function() {
  return Goals.find();
});

Meteor.publishComposite('goal', function(_id) {
  return {
    find: function() {
      return Goals.find({_id: _id});
    },
    children: [
      {
        find: function(goal) {
          return Meteor.users.find({_id: goal.userId});
        }
      },
      {
        find: function(goal) {
//            console.log('inside children', goal, goal.userId);
            // Find post author. Even though we only want to return
            // one record here, we use "find" instead of "findOne"
            // since this function should return a cursor.
            return Meteor.users.find(
                { _id: goal.userId },
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
