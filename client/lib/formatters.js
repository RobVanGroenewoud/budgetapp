UI.registerHelper('currency', function(number){
    return number.toFixed(2);
});

UI.registerHelper('dateFormat', function(datestring) {
    return moment(datestring, 'YYYYMMDD').format('l');
});

UI.registerHelper('monthName', function(monthNum) {
    return moment.months(monthNum - 1);
});

UI.registerHelper('shortMonthName', function(monthNum) {
    return moment.monthsShort(monthNum - 1);
});
