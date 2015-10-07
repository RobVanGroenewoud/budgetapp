Template.filters.helpers({
    years: function() {
        return [
            { year: '2014' }, 
            { year: '2015' },
            { year: '2016' }
        ];
    },
    isActiveYear: function() {    
        return this.year === Session.get('selectedYear') ? 'active' : '';
    },
    months: function () {
        return [
            { monthNum: '01', monthName: 'Jan'},
            { monthNum: '02', monthName: 'Feb'},
            { monthNum: '03', monthName: 'Mar'},
            { monthNum: '04', monthName: 'Apr'},
            { monthNum: '05', monthName: 'May'},
            { monthNum: '06', monthName: 'Jun'},
            { monthNum: '07', monthName: 'Jul'},
            { monthNum: '08', monthName: 'Aug'},
            { monthNum: '09', monthName: 'Sep'},
            { monthNum: '10', monthName: 'Oct'},
            { monthNum: '11', monthName: 'Nov'},
            { monthNum: '12', monthName: 'Dec'},
        ];
    },
    isActiveMonth: function() {
        return this.monthNum === Session.get('selectedMonth') ? 'active' : '';
    }
});

Template.filters.events({
    'click .js-month': function (event) {
        event.preventDefault();
        if (Session.get('selectedMonth') === this.monthNum) {
            Session.set('selectedMonth', undefined);
        } else {      
            Session.set('selectedMonth', this.monthNum);
        }
    },
    'click .js-year': function (event) {
        event.preventDefault();
        if (Session.get('selectedYear') === this.year) {
            Session.set('selectedYear', undefined);
        } else {       
            Session.set('selectedYear', this.year );
        }
    }
});

Template.categoryFilter.onCreated(function() {
    this.subscribe('categories');
});

Template.categoryFilter.helpers({
    categories: function () {
        return Categories.find({});
    }
});

Template.categoryFilter.events({
    'click .js-category': function () {
        if (Session.get('selectedCategory') === this._id) {
            Session.set('selectedCategory', undefined);
        } else {      
            Session.set('selectedCategory', this._id);
        }  
    }
});
