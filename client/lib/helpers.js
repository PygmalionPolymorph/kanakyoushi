Helpers = new Object();

Helpers.prettify = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1) + '.';
}

Helpers.writeStatisticsToDB = function(statistics) {
  Meteor.call('updateStatistics', statistics);
}

Helpers.readStatisticsFromDB = function() {
  if (Meteor.user()) {
    if (Statistics.find({
        userId: Meteor.user()._id
      }).count() == 0) {
      console.log("WARNING: DID NOT FIND STATISTICS FOR USER ", Meteor.user()._id);
      Helpers.createEmptyStatisticsForUser();
      return {
        "userId": Meteor.user()._id,
        "totalTries": 0,
        "detail": {}
      };
    } else {
      return Statistics.findOne();
    }
  } else {
    return false;
  }
}

Helpers.createEmptyStatisticsForUser = function() {
  var statistics = {
    "userId": Meteor.user()._id,
    "totalTries": 0,
    "detail": {}
  };
  var symbols = Symbols.find().fetch();
  for (var i = 0; i < symbols.length; i++) {
    statistics["detail"][symbols[i]._id] = {
      "hiragana": {
        "tries": 0,
        "correct": 0
      },
      "katakana": {
        "tries": 0,
        "correct": 0
      }
    };
  }
  Meteor.call('newStatistics', statistics);
}

Helpers.getPercentage = function(statistics, symbol, mode) {
  if (typeof statistics == "undefined") {
    return 0;
  }
  var percentage = (statistics["detail"][symbol._id][mode]["correct"] / statistics["detail"][symbol._id][mode]["tries"]) * 100;
  return isNaN(percentage) ? 0 : Math.round(percentage);
}

Helpers.openModal = function() {
  $('.modal').css('top', "3%");
}

Helpers.closeModal = function() {
  $('.modal').css('top', "-200%");
}
