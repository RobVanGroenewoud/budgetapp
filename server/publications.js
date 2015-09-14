Meteor.publish('transactions', function() {
    if (this.userId) {
        return Transactions.find();
    }
});

Meteor.publish('transactionsByYear', function(year) {
    if (this.userId) {
        return Transactions.find({year: year});
    }
});

Meteor.publish('transactionsByMonth', function(year, month) {
    if (this.userId) {
        return Transactions.find({year: year, month: month});
    }
});

Meteor.publish('categories', function(){
    if (this.userId) {
        return Categories.find();
    }
});
