Meteor.startup(function () {

  if (Goals.find({}).count() === 0) {
    _(3).times(function(n){
        Goals.insert({
          desc: Fake.word(),
          tagline: Fake.sentence(),
          price: Fake.word().length,
          members: []
      });
    });
  }

});
