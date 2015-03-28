Meteor.publish('transactions', function() {
    if(this.userId) {
        return Transactions.find();
    }
});
