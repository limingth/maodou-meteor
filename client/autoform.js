Meteor.startup(function () {
  T9n.map('zh-cn', {
    Email: "电子邮箱",
    Username: "用户名"
  });

  T9n.setLanguage('zh-cn');
  AutoForm.setDefaultTemplate('ionic');
});
