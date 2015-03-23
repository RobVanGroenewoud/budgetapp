Meteor.startup(function(){
    return Meteor.methods({
        removeAllTransactions: function() {
            return Transactions.remove({});
        }
    });
});
