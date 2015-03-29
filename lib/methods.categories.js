Meteor.methods({
    addCategory: function (name) {
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        var nrOfCategories = Categories.find().count();
        Categories.insert({
            name: name,
            orderindex: nrOfCategories
        });
    },
    updateCategory: function(categoryId, name) {
        Categories.update(categoryId, {$set: {name: name}});
    },
    removeCategory: function (categoryId) {
        Categories.remove(categoryId);
    },
    moveCategoryUp: function(categoryId) {
        var currentIndex = Categories.findOne({_id : categoryId}).orderindex;
        var newIndex = currentIndex - 1;
        if (newIndex < 0) {
            return;
        }

        var previous = Categories.findOne({orderindex: newIndex});
        if (previous) {
            Categories.update(previous._id, {$set: {orderindex: currentIndex}});
        }
        Categories.update(categoryId, {$set: {orderindex: newIndex}});
    },
    moveCategoryDown: function(categoryId) {
        var currentIndex = Categories.findOne({_id : categoryId}).orderindex;
        var newIndex = currentIndex + 1;
        if (newIndex === Categories.find().count()) {
            return;
        }

        var next = Categories.findOne({orderindex: newIndex});
        if (next) {
            Categories.update(next._id, {$set: {orderindex: currentIndex}});
        }
        Categories.update(categoryId, {$set: {orderindex: newIndex}});
    },
    changeCategory: function(transactionId, categoryId) {
        Transactions.update(transactionId, { $set: { category: categoryId }});
    }
});