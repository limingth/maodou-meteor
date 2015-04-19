Meteor.startup(function () {
process.env.MAIL_URL = 'smtp://postmaster%40sandbox0a17612ae2b74af1996afb94666dd84c.mailgun.org:cb0bcfa32063656881ed92a656a6ab17@smtp.mailgun.org:587';

  if (Projects.find({}).count() === 0) {
    Projects.remove({});
    return;
    Projects.insert({
      name: "毛豆网移动版",
      description: "在线协作学习社区",
      url: "https://github.com/limingth/maodou/",
      owner: -1,
      steps: [
      { description: "Step 1: 下载项目代码", snapshot_url: "http://7xia8g.com1.z0.glb.clouddn.com/maodou-github.png"},
      { description: "Step 2: 学习hands-on-meteor前5章 ", snapshot_url: "http://7xia8g.com1.z0.glb.clouddn.com/Snip20150326_13.png"},
      { description: "Step 3: 项目体验 maodou.meteor.com", snapshot_url: "http://7xia8g.com1.z0.glb.clouddn.com/Snip20150326_17.png"},
     ],
     watchers:[],
    });
    Projects.insert({
      name: "MeteorBB开源社区",
      description: "BBS论坛",
      url: "https://github.com/cobola/meteorbb",
      watchers:[],
      owner: -1,
    });
    Projects.insert({
      name: "滴滴拉屎Meteor版",
      description: "山寨版",
      url: "https://github.com/limingth/didipoop/",
      owner: -1,
      watchers:[],
    });
    Meteor.users.insert({
      "_id" : "-1",
      "createdAt" : new Date(),
      "services" : {
          "password" : {
              "bcrypt" : ""
          },
          "resume" : {
              "loginTokens" : [
                  {
                      "when" : new Date(),
                      "hashedToken" : "mFo5P4zoSFjAwWxBOSltNarp31dvef5WoqspNmnHJWg="
                  }
              ]
          }
      },
      "username" : "Franky",
      "emails" : [
          {
              "address" : "rsail@126.com",
              "verified" : false
          }
      ],
      "watchedProjectIds" : ["1", "2", "3"],
      "ownedProjectIds": ["1", "2", "3"],
    });
  }

  // 数据库升级时，补齐缺少的字段
  var checkUserPropsMap = {
    'watchedProjectIds': [],
    'ownedProjectIds': []
  };
  var checkProjectPropsMap = {'owner': '-1'};
  var checkAndUpdate = function (myCollections, propsMap, callback) {
    myCollections.find({}).fetch().forEach(function (value, index) {
      _.each(propsMap, function (initValue, prop) {
        var id = value._id;
        if (!value[prop] || typeof value[prop] != typeof initValue) {
          console.log("Miss the prop --> " + prop + ', add with default value --> ' + initValue);
          value[prop] = initValue;
          delete value._id;
          callback && callback({_id: id}, value);
        }
      });
    });
  };
  checkAndUpdate(Meteor.users, checkUserPropsMap, function (query, value) {
    Meteor.users.update(query, {$set: value});
  });
  // 带simpleSchema的，使用clean函数去同步缺失的字段，同步后，字段和设定的defaultValue一同补上
  checkAndUpdate(Projects, checkProjectPropsMap, function (query, value) {
    Projects.simpleSchema().clean(value);
  });

  /* 如果升级数据库的过程中，新的字段和旧的字段存在关联，则需要进行双向的更新，更新代码添加在此处，
     具体更新逻辑根据字段的业务逻辑的不同而不同 */

  // 双向同步users的ownedProjectIds和project的owner,
  Meteor.users.find({}).fetch().forEach(function (user, index) {
    if (!_.isArray(user.ownedProjectIds)) {
      user.ownedProjectIds = [];
    }
    user.ownedProjectIds.forEach(function (id, i) {
      Projects.find({_id: id}).fetch().forEach(function (project, j) {
        if (project.owner != user._id) {
          Projects.update(project._id, {
            $set: {owner: user._id}
          }, function(error) {
            if (error) {
              console.log(error.reason);
            }
          });
          console.log('Updating project owner --> ');
          console.log(user._id);
        }
      });
    });
  });
  Projects.find({}).fetch().forEach(function (value, index) {
    Meteor.users.find({_id: value.owner}).fetch().forEach(function (user, i) {
      if (!_.isArray(user.ownedProjectIds)) {
        user.ownedProjectIds = [];
      }
      if (!user.ownedProjectIds.some(function (id, j) {
        return id == value._id;
      })) {
        user.ownedProjectIds.push(value._id);
        Meteor.users.update({_id: value.owner}, {$set: {ownedProjectIds: user.ownedProjectIds}});
        console.log('Updating user ownedProjectIds --> ');
        console.log(user.ownedProjectIds)
      }
    });
  });

  // 双向同步users的watchedProjectIds和project的watchers
  Meteor.users.find({}).fetch().forEach(function (user, index) {
    if (!_.isArray(user.watchedProjectIds)) {
      user.watchedProjectIds = [];
    }
    user.watchedProjectIds.forEach(function (id, i) {
      Projects.find({_id: id}).fetch().forEach(function (project, j) {
        if (!_.contains(project.watchers, user._id)) {
          project.watchers.push(user._id);
          Projects.update(project._id, {$set: {watchers: project.watchers}}, function(error) {
            error && console.log("Error while updating project, reason: " + error.reason);
          });
          console.log('Updating project watchers --> ');
          console.log(project.watchers);
        }
      });
    });
  });
  Projects.find({}).fetch().forEach(function (project, index) {
    if (!_.isArray(project.watchers)) {
      project.watchers = [];
    }
    project.watchers.forEach(function (uId, uIndex) {
      Meteor.users.find({_id: uId}).fetch().forEach(function (user, i) {
        if (!_.contains(user.watchedProjectIds, project._id)) {
          user.watchedProjectIds.push(project._id);
          Meteor.users.update({_id: uId}, {$set: {watchedProjectIds: user.watchedProjectIds}}, function (err) {
            err && console.log("Error while updating user, reason: " + err.reason);
          });
          console.log('Updating user watchedProjectIds --> ');
          console.log(user.watchedProjectIds);
        }
      });
    });
  });
  /*
  Meteor.users.find({}).fetch().forEach(function (value, index) {
    value.ownedProjectIds && value.ownedProjectIds.forEach(function (id, i) {
      Projects.find({_id: id}).fetch().forEach(function (project, j) {
        if (project.owner != value._id) {
          Projects.update(project._id, {
            $set: {owner: value._id}
          }, function(error) {
            if (error) {
              console.log(error.reason);
            }
          });
        }
      })
    })
  });
  */
});
