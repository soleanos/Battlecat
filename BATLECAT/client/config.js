
Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'username',
        fieldLabel: 'username',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Il manque le prénom !");
            return false;
          } else {
            return true;
          }
        }
    }]
});

Tracker.autorun(function () {
    if (Meteor.userId()) {
        try {
            UserStatus.startMonitor({
            threshold: 30000,
            interval: 1000,
            idleOnBlur: true
            });
        } catch(err) {
           //~ console.log(err);
        }
    } else {
        UserStatus.stopMonitor();
    }
});

Meteor.subscribe("allCats")
