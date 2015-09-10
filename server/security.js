Meteor.methods({
  'updateStatistics': function(statistics) {
    Statistics.update(statistics._id, statistics);
  },
  'newStatistics': function(statistics) {
    if (Statistics.find({
        userId: Meteor.user()._id
      }).count() == 0) {
      Statistics.insert(statistics);
    }
  }
});

// Meteor.startup(function() {
// 	Symbols.remove({});
// });
