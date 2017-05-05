Meteor.subscribe('appSymbols');
Meteor.subscribe('appStatistics');

var statistics = Helpers.readStatisticsFromDB();

Template.kana.events({
  'keyup input': function(event) {
    if (event.target.className.includes('answer') && event.which == 13) {
      quiz.handleAnswer();
    };
  }
});

Template.head.events({
  'click .home': function() {
    Router.go('/');
  },
  'click .openStatistics': function() {
    Router.go('statistics');
    Helpers.openModal();
  },
  'click .logout': function() {
    if (Meteor.user()) {
      AccountsTemplates.logout();
    } else {
      Router.go('login');
      Helpers.openModal();
    }
  }
});

Template.controlsKana.events({
  'click .start': function() {
    console.log('stuff');
    if (parseInt($('.modal').css('top').substr('px', '')) < 0) {
      $('.modal').empty();
      window.history.back();
    }
    quiz = Quiz(mode);
  }
});

Template.statistics.helpers({
  'basic': function() {
    return Symbols.find({
      type: 'basic'
    }).fetch();
  },
  'dakuten': function() {
    return Symbols.find({
      type: 'dakuten'
    }).fetch();
  },
  'composite': function() {
    return Symbols.find({
      type: 'composite'
    }).fetch();
  }
});

Template.statistics.events({
  'click .openHiragana': function() {
    $('.active').toggleClass('active');
    $('.openHiragana').addClass('active');
    $('.katakana').hide();
    $('.hiragana').show();
  },
  'click .openKatakana': function() {
    $('.active').toggleClass('active');
    $('.openKatakana').addClass('active');
    $('.hiragana').hide();
    $('.katakana').show();
  },
  'click .closeModal': function() {
    Helpers.closeModal();
    window.history.back();
  }
});

Template.login.events({
  'click .closeModal': function() {
    Helpers.closeModal();
    window.history.back();
  }
});

Template.hiragana.helpers({
  'kana': function() {
    return this.hiragana;
  },
  'percentage': function() {
    return Helpers.getPercentage(Helpers.readStatisticsFromDB(), this, "hiragana");
  },
  'special': function() {
    if (['yu', 'yo', 'wo', 'n'].indexOf(this.romaji) != -1) {
      return this.romaji;
    }
  }
});

Template.katakana.helpers({
  'kana': function() {
    return this.katakana;
  },
  'percentage': function() {
    return Helpers.getPercentage(Helpers.readStatisticsFromDB(), this, "katakana");
  },
  'special': function() {
    if (['yu', 'yo', 'wo', 'n'].indexOf(this.romaji) != -1) {
      return this.romaji;
    }
  }
});
