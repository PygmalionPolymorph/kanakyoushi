Quiz = function(mode) {

  var init = function() {
    statistics = Helpers.readStatisticsFromDB();

    prepareRound();
  };

  var handleAnswer = function() {
    isCorrect = validate();
    if (isCorrect) {
      $('.stage').addClass("correct");
      var feedback = "<span>Correct.</span>";
    } else {
      $('.stage').addClass("incorrect");
      var feedback = "<span>Incorrect.</span><span>The correct answer was: " + choice["romaji"] + "</span>";
    }

    //Save Statistics, if user is logged in
    if (Meteor.user()) {
      saveToDB();
      feedback += "<span>" + choice[mode] + " - " + Helpers.getPercentage(statistics, choice, mode).toString() + "%</span>";
    }

    $('.feedback').html(feedback);
    setTimeout(function() {
      $('.stage').removeClass('correct').removeClass('incorrect');
      prepareRound();
    }, 500);
  }

  var prepareRound = function() {
    var array = Symbols.find().fetch();
    var randomIndex = Math.floor(Math.random() * array.length);
    choice = array[randomIndex];
    blitCharacter(choice[mode]);

    $('.modeControls').html('<input type="text" class="answer"/>');
    $('.answer').focus();
  }

  var validate = function(string) {
    var answer = $('.answer').val();
    if (answer.toLowerCase() == choice["romaji"]) {
      return true;
    } else if (choice.hasOwnProperty("alternatives")) {
      for (var i = 0; i < choice["alternatives"].length; i++) {
        if (answer == choice["alternatives"][i]) {
          return true;
        }
      }
    }
    return false;
  }

  var blitCharacter = function(character) {
    $('.stage').html("<span class='character'>" + character + "</span>");
  }

  var saveToDB = function() {
    //Update Statistics
    statistics["totalTries"] += 1;
    statistics["detail"][choice._id][mode]["tries"] += 1;
    if (isCorrect) {
      statistics["detail"][choice._id][mode]["correct"] += 1;
    }
    //Write Statistics to the DB
    Helpers.writeStatisticsToDB(statistics);
  }

  init();

  return {
    "handleAnswer": handleAnswer
  }

};
