Router.configure({
    layoutTemplate: 'defaultLayout'
});

Router.route('home', {
    path: '/'
});
Router.route('transactions', {
    path: '/transactions',
    waitOn: function() {
        return Meteor.subscribe('transactions');
    },
    data: function() {
        return { transactions: Transactions.find({}) };
    }
});
Router.route('categories');
