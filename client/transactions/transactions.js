Template.transactions.helpers({
    nrOfTransactions: function () {
        return Transactions.find().count();
    }
});

Template.transaction.helpers({
    amountClass: function () {
        return this.amount < 0 ? 'negative' : 'positive';
    }
});


Template.transactions.events({
    'click .clearall': function (event) {
        event.preventDefault();
        Meteor.call('removeAllTransactions');
    }
});
