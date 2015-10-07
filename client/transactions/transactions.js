Meteor.subscribe('categories');

Template.yearLinks.helpers({
    years: function() {
        return [
            { year: '2014' }, 
            { year: '2015' },
            { year: '2016' }
        ];
    }
});
Template.monthLinks.helpers({
    year: function () {
        return Router.current().params.year;
    },
    months: function () {
        return [1,2,3,4,5,6,7,8,9,10,11,12];
    },
});

Template.transactions.onCreated(function(){
    if (Router.current().params.year) {
        if (Router.current().params.month) {
            this.subscribe('transactionsByMonth', Router.current().params.year, Router.current().params.month);
        } else {
            this.subscribe('transactionsByYear', Router.current().params.year);
        }
    }
});

Template.transactions.helpers({
    nrOfTransactions: function () {
        return Transactions.find().count();
    },
    nrOfUncategorizedTransactions: function () {
        return Transactions.find({category : ''}).count();
    },
    transactions: function () {
        var filters = {};

        if (Router.current().params.month) {
            filters.month = ('0' + Router.current().params.month).slice(-2);
        }

        if (Router.current().params.year) {
            filters.year = Router.current().params.year;
        }

        return Transactions.find(filters);
    },    
    year: function () {
        return Router.current().params.year;
    },
    month: function () {
        return parseFloat(Router.current().params.month);
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

Template.categorySelect.helpers({
    options: function () {
        return Categories.find({}, {sort: {orderindex: 1}});
    }
});

Template.categorySelectOption.helpers({
    isSelected: function () {
        return Template.parentData(1).category === this._id;
    }
});

Template.categorySelect.events({
    'change .category': function (event) {
        var transactionId = this._id;
        var categoryId = $(event.target).val();
        Meteor.call('changeCategory', transactionId, categoryId );
    }
});

Template.filteredTransactions.onCreated(function(){
    this.subscribe('transactions');
});

Template.filteredTransactions.helpers({
    transactions: function () {
        var filters = {};

        if (Session.get('selectedMonth')) {
            filters.month = Session.get('selectedMonth');
        }

        if (Session.get('selectedYear')) {
            filters.year = Session.get('selectedYear');
        }

        if (Session.get('selectedCategory')) {
            filters.category = Session.get('selectedCategory');
        }

        return Transactions.find(filters);
    }
});
