Router.route('/', function () {
  this.render('home', {
  });
});

Router.route('/hiragana', function () {
  mode = "hiragana";
  this.render('kana', {
  });
});

Router.route('/katakana', function () {
  mode = "katakana";
  this.render('kana', {
  });
});

Router.route('/statistics', function () {
  if ($('.modal').length == 0) {
    Router.go('/');
  }
  this.render('statistics', {
    to: 'modal'
  });
});

Router.route('/login', function () {
  if ($('.modal').length == 0) {
    Router.go('/');
  }
  this.render('login', {
    to: 'modal'
  });
});
