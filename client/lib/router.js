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

Router.route('transactionsByYear', {
    path: '/transactions/:year',
    template: 'transactions',
    waitOn: function() {
        return Meteor.subscribe('transactionsByYear', this.params.year);
    },
    data: function() {
        return { 
            transactions: Transactions.find(),
            selectedYear: this.params.year
        };
    }
});

Router.route('transactionsByMonth', {
    path: '/transactions/:year/:month',
    template: 'transactions',
    waitOn: function() {
        return Meteor.subscribe('transactionsByMonth', this.params.year, this.params.month);
    },
    data: function() {
        return { 
            transactions: Transactions.find(),
            selectedYear: this.params.year,
            selectedMonth: this.params.month
        };
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
