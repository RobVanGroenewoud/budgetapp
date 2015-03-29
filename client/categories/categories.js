Template.newCategory.events({
    'submit .newCategory': function (event) {
        event.preventDefault();
        var input = $('.name', $(event.target));
        var newName = input.val();
        Meteor.call('addCategory', newName, function (error, result) {
            if(! error) {
                input.val('');
            }
        });
    }
});

Template.categories.events({
    'click .removeCategory': function () {
        Meteor.call('removeCategory', this._id);
    },
    'click .editCategory': function () {
        Session.set('categoryToEdit', this._id);
    },
    'click [data-action=up]': function() {
        Meteor.call('moveCategoryUp', this._id);
    },
    'click [data-action=down]': function() {
        Meteor.call('moveCategoryDown', this._id);
    },
    'submit .edit-category': function (event) {
        event.preventDefault();
        var input = $('.edited-name', $(event.target));
        Meteor.call('updateCategory', this._id, input.val(),function (error, result) {
            if (error) {
               console.log(error);
            } else {
                Session.set('categoryToEdit', null);
            }
        });
    }
});

Template.category.helpers({
    isBeingEdited: function () {
        return Session.equals('categoryToEdit', this._id);
    },
    isFirstCategory: function(){
        return this.orderindex === 0;
    },
    isLastCategory: function(){
        return this.orderindex === Categories.find().count() - 1;
    }
});
