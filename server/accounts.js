Accounts.onCreateUser(function(options, user) {
  user.watchedProjectIds = [];
  user.ownedProjectIds = [];
  return user;
});
