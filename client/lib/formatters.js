UI.registerHelper('currency', function(number){
    return number.toFixed(2);
});

UI.registerHelper('dateFormat', function(datestring) {
    return moment(datestring, 'YYYYMMDD').format('l');
});
