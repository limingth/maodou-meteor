Accounts.onCreateUser(function(options, user) {
  user.watchedProjectIds = [];
  return user;
});
