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
        return Template.parentData(1).category ===  this._id;
    }
});

Template.categorySelect.events({
    'change .category': function (event) {
        var transactionId = this._id;
        var categoryId = $(event.target).val();
        Meteor.call('changeCategory', transactionId, categoryId );
    }
});

Template.filters.helpers({
    years: function () {
        return [2014,2015];
    }
});

Template.filters.events({
    'click .item': function (event) {
        var clickedItem = $(event.target);
        var month = clickedItem.attr('data-month');
        Session.set('monthFilter', month);
        clickedItem.addClass('active');
    }
});
