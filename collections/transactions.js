Transactions = new Mongo.Collection('transactions', {
    transform: function(doc) {
        return new Transaction(doc._id, doc.date, doc.description, doc.amount, doc.category);
    }
});

Transactions.allow({
    insert: function(userId, doc){
        return true;
    },
    update: function(userId, doc, fields, modifier) {
        return true;
    },
    remove: function(userId, doc){
        return true;
    }
});

Transaction = function(id, date, description, amount, category) {
    this._id = id;
    this._date = date;
    this._description = description;
    this._amount = amount;
    this._category = category;
    this._hash =  date +'_'+ amount + '_' + description;
};

Transaction.prototype = {
    get id() {
        return this._id;
    },
    get date() {
        return this._date;
    },
    get description() {
        return this._description;
    },
    get amount() {
        return this._amount;
    },
    get hash() {
        return this._hash;
    },
    get category() {
        return this._category;
    },
    save: function(callback) {

        if (Transactions.findOne({ hash : this.hash })) {
            //already exists
            return;
        }

        var doc = {
            date : this.date,
            description: this.description,
            amount: this.amount,
            category: this.category,
            hash: this.hash
        };

        if (this.id) {
            Transactions.update(this.id, {$set: doc}, callback);
        } else {
            var that = this;

            Transactions.insert(doc, function(error, result) {
                that._id = result;

                if (callback) {
                    callback.call(that, error, result);
                }
            });
        }
    }
};
