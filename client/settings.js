Template.settings.events({
  'click [data-action=logout]': function () {
    console.log('logout button clicked');
    AccountsTemplates.logout();
    Router.go('/welcome');
  }
});

AccountsTemplates.configure({
  negativeValidation: false,
  negativeFeedback: false,
  positiveValidation: false,
  positiveFeedback: false,
});

AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
    required: true,
    func: function(value){
        if (Meteor.isClient) {
            console.log("Validating username...");
            var self = this;
            Meteor.call("userExists", value, function(err, userExists){
                if (!userExists)
                    self.setSuccess();
                else
                    self.setError(userExists);
                self.setValidating(false);
            });
            return;
        }
        // Server
        return Meteor.call("userExists", value);
    },
});