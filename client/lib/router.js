Router.configure({
    layoutTemplate: 'defaultLayout',
    loadingTemplate: 'loading'
});

Router.route('home', {
    path: '/'
});

Router.route('transactions');

Router.route('transactionsByYear', {
    path: '/transactions/:year',
    template: 'transactions'
});

Router.route('transactionsByMonth', {
    path: '/transactions/:year/:month',
    template: 'transactions'
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
