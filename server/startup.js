Meteor.startup(function(){
    Meteor.methods({
        removeAllTransactions: function() {
            return Transactions.remove({});
        }
    });
});
