Router.configure({
    layoutTemplate: 'defaultLayout',
    loadingTemplate: 'loading'
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

Router.route('categories',{
    path: 'categories',
    waitOn: function() {
        return Meteor.subscribe('categories');
    },
    data: function() {
        return { categories: Categories.find({}, {sort: {orderindex: 1}}) };
    }
});
