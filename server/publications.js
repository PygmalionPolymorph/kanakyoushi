Meteor.publish('appSymbols', function() {
	return Symbols.find();
});

Meteor.publish('appStatistics', function() {
	return Statistics.find();
});
