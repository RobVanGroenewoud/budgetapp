Meteor.publish('transactions', function() {
    if(this.userId) {
        return Transactions.find();
    }
});

Meteor.publish('categories', function(){
    return Categories.find();
});
