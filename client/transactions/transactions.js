Meteor.subscribe('categories');

Template.transactions.helpers({
    nrOfTransactions: function () {
        return Transactions.find().count();
    },
    nrOfUncategorizedTransactions: function () {
        return Transactions.find({category : ''}).count();
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

        if (Session.get('selectedMonth')) {
            filters.year = Session.get('selectedYear');
        }

        return Transactions.find(filters);
    }
});
