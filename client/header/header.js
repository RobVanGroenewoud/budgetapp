Template.userInfo.events({
    'click .login': function (event) {
        event.preventDefault();

        Meteor.loginWithGoogle({
            requestPermissions: []
        }, function(err) {
            if(err) {
                // error handling
            } else {
                //show alert
            }
        });
    },
    'click .logout': function (event) {
        event.preventDefault();

        Meteor.logout(function(err) {
            if(err) {
                // error handling
            } else {
                //show alert
            }
        });
    }
});
