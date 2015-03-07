Template.ionBody.events({
  'click [data-ion-modal]': function (event, template) {
    var templateName = $(event.currentTarget).data('ion-modal');
    IonModal.open(templateName, $(event.currentTarget).data());
  },
  'click [data-ion-menu-close]': function (event, template) {
    if (!IonSideMenu.snapper) {
      return;
    }
    console.log ("menu-close clicked!");
    IonSideMenu.snapper.close();
  },
  'click [data-ion-menu-profile]': function (event, template) {
    console.log ("menu-profile clicked!");
    Router.go('/profile');
    IonSideMenu.snapper.close();
  },
  'click [data-ion-menu-settings]': function (event, template) {
    console.log ("menu-settings clicked!");
    Router.go('/settings');
    IonSideMenu.snapper.close();
  },
});