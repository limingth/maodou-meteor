AutoForm.hooks({
    'goal-new-form': {
        onSuccess: function (operation, result, template) {
            IonModal.close();
            Router.go('goals.show', {_id: result});
        }
    }
});