Meteor.startup(function () {
process.env.MAIL_URL = 'smtp://postmaster%40sandbox0a17612ae2b74af1996afb94666dd84c.mailgun.org:cb0bcfa32063656881ed92a656a6ab17@smtp.mailgun.org:587';
/*
  if (Goals.find({}).count() === 0) {
    _(3).times(function(n){
        var members = ["me"];
        Goals.insert({
          desc: Fake.word(),
          background: Fake.sentence(),
          result: Fake.sentence(),
          expense: Fake.word().length,
          teamMembers: members
      });
    });
  }
*/
  if (Projects.find({}).count() == 0) {
    //Projects.remove({});
    Projects.insert({
      name: "毛豆网移动版",
      description: "在线协作学习社区",
      url: "https://github.com/limingth/maodou/",
      steps: [
      { description: "Step 1: 下载项目代码", snapshot_url: "http://7xia8g.com1.z0.glb.clouddn.com/maodou-github.png"},
      { description: "Step 2: 学习hands-on-meteor前5章 ", snapshot_url: "http://7xia8g.com1.z0.glb.clouddn.com/Snip20150326_13.png"},
      { description: "Step 3: 项目体验 maodou.meteor.com", snapshot_url: "http://7xia8g.com1.z0.glb.clouddn.com/Snip20150326_17.png"},
     ],
     teamMembers:["AAAA"],
     teamMembersEmail:["liu_kun3211@163.com"],
      titles:"邮件主题",
       message:"邮件内容"
    });
    Projects.insert({
      name: "MeteorBB开源社区",
      description: "BBS论坛",
      url: "https://github.com/cobola/meteorbb",
      teamMembers:["AAAA"],
       teamMembersEmail:["liu_kun3211@163.com"],
       titles:"邮件主题",
       message:"邮件内容"

    });
    Projects.insert({
      name: "滴滴拉屎Meteor版",
      description: "山寨版",
      url: "https://github.com/limingth/didipoop/",
      teamMembers:["AAAA"],
       teamMembersEmail:["liu_kun3211@163.com"],
        titles:"邮件主题",
       message:"邮件内容"
    });
  }

});
