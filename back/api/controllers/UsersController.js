module.exports = {
  addPlayRecord: async function (req, res) {
    const json = req.allParams();
    const mediaId = json.mediaId;
    const srcType = json.srcType;
    const delRecord = await Users.destroy({srcType, mediaId}).fetch();
    const obj = await Users.create(json).fetch();
    res.json(obj);
  },
  getArt: async function (req, res) {
    let skip = req.query.start;
    let pageSize = req.query.pageSize;
    const arr = await Article.find().sort("id desc").skip(skip).limit(pageSize);
    res.json(arr);
  },
  getArtId: async function (req, res) {
    let id = req.query.id;
    const obj = await Article.findOne({id});
    const num = await Comment1.count({'artId': id});
    res.json({obj, num});
  },
  getAudioId: async function (req, res) {
    let id = req.query.id;
    const obj = await Audio.findOne({id});
    res.json(obj);
  },
  getRecord: async function (req, res) {
    let openId = req.query.openId;
    const arr = await Users.find({openId}).sort('id desc');
    res.json(arr);
  },
  getRecords: async function (req, res) {
    let userId = req.query.userId;
    const arr = await Record.find({userId}).sort('id desc').limit(50);
    res.json(arr);
  },
  getRecordsVideo: async function (req, res) {
    let userId = req.query.userId;
    const arr = await RecordVideo.find({userId}).sort('id desc').limit(50);
    res.json(arr);
  },
  getVedioId: async function (req, res) {
    let id = req.query.id;
    const obj = await Vedio.findOne({id});
    res.json(obj);
  },
  getAudioPrev: async function (req, res) {
    let id = req.query.id;
    let dataType = req.query.dataType;
    const arr = await Audio.find({id: {'<': id}, dataType}).sort('id desc').limit(1);
    if (arr.length === 0) {
      res.json(false);
    } else {
      res.json(arr[0]);
    }
  },
  getAudioNext: async function (req, res) {
    let id = req.query.id;
    let dataType = req.query.dataType;
    const arr = await Audio.find({id: {'>': id}, dataType}).sort('id asc').limit(1);
    if (arr.length === 0) {
      res.json(false);
    } else {
      res.json(arr[0]);
    }
  },
  getVedioPrev: async function (req, res) {
    let id = req.query.id;
    let dataType = req.query.dataType;
    const arr = await Vedio.find({id: {'<': id}, dataType}).sort('id desc').limit(1);
    if (arr.length === 0) {
      res.json(false);
    } else {
      res.json(arr[0]);
    }
  },
  getVedioNext: async function (req, res) {
    let id = req.query.id;
    let dataType = req.query.dataType;
    const arr = await Vedio.find({id: {'>': id}, dataType}).sort('id asc').limit(1);
    if (arr.length === 0) {
      res.json(false);
    } else {
      res.json(arr[0]);
    }
  },
  insertAudio: async function (req, res) {
    const arr = [];
    for (let i = 1; i <= 34; i++) {
      let json = {};
      json.title = i;
      json.url = '/images/肖战 - 野子.mp3';
      json.dataType = 'gz';
      json.smallSrc = 'sourceImg/a' + parseInt(Math.random() * 6 + 1) + '.jpg';
      arr.push(json);
    }
    const temp = await Audio.createEach(arr).fetch();
    res.json(temp);
  },
  insertVedio: async function (req, res) {
    const arr = [];
    for (let i = 1; i <= 34; i++) {
      let json = {};
      json.title = i;
      json.url = '/images/肖战 - 神奇 (梦圆东方·2020跨年盛典)_e0033w5pqqk_2_0 [mqms].mp4';
      json.dataType = 'ygy';
      json.smallSrc = 'sourceImg/a' + parseInt(Math.random() * 6 + 1) + '.jpg';
      arr.push(json);
    }
    const temp = await Vedio.createEach(arr).fetch();
    res.json(temp);
  },
  mediaData: async function (req, res) {
    let start = req.query.start;
    let dataType = req.query.dataType;
    let isAudio = req.query.isAudio;
    let pageSize = req.query.pageSize;
    if (isAudio) {
      const arr = await Audio.find({dataType}).sort('id asc').skip(start).limit(pageSize);
      res.json(arr);
    } else {
      const arr = await Vedio.find({dataType}).sort('id asc').skip(start).limit(pageSize);
      res.json(arr);
    }
  },
  receive: function (req, res) {
    req.file('file').upload({
        dirname: require('path').resolve(sails.config.appPath, 'assets/upload')
      },
      function (err, files) {
        if (err)
          return res.serverError(err);
        if (files.length === 0)
          return res.json(false);
        let filePath = files[0].fd.split('\\');
        filePath = filePath[filePath.length - 1];
        res.json(filePath);
      });
  },
  receiveImgs: function (req, res) {
    req.file('file').upload({
        dirname: require('path').resolve(sails.config.appPath, 'assets/photos')
      },
      function (err, files) {
        if (err)
          return res.serverError(err);
        if (files.length === 0)
          return res.json(false);
        let filePath = files[0].fd.split('\\');
        filePath = filePath[filePath.length - 1];
        res.json(filePath);
      });
  },
  postComment: async function (req, res) {
    const json = req.allParams();
    const obj = await Comment.create(json).fetch();
    res.json(obj);
  },
  postComment1: async function (req, res) {
    const json = req.allParams();
    const obj = await Comment1.create(json).fetch();
    res.json(obj);
  },
  getComment: async function (req, res) {
    const artId = req.query.artId;
    const skip = req.query.skip;
    const pageSize = req.query.pageSize;
    const arr = await Comment.find({artId}).sort("id desc").skip(skip).limit(pageSize);
    res.json(arr);
  },
  getComment1: async function (req, res) {
    const artId = req.query.id;
    let arr = await Comment1.find({artId}).sort("id desc");
    res.json(arr)
    // const arr1 = [];
    // arr.map(async row => {
    //   const phone = row.phone;
    //   const user = await Users1.findOne({phone});
    //   row.nickName = user.nickName;
    //   row.avatarUrl = user.avatarUrl;
    //   arr1.push(row)
    // })
    // setTimeout(_=>{
    //   res.json(arr1);
    // },500)

  },
  getSearchNews: async function (req, res) {
    const keyword = req.query.keyword;
    const arr = await Article.find({title: {contains: keyword}}).sort("id desc");
    res.json(arr);
  },
  insertUser: async function (req, res) {
    const json = req.allParams();
    const phone = json.phone;
    const row = await Users1.findOne({phone})
    if (row) {
      res.json(false)
    } else {
      const obj = await Users1.create(json).fetch();
      res.json(obj);
    }
  },
  login: async function (req, res) {
    const json = req.allParams();
    const obj = await Users1.findOne(json);
    if (obj) {
      delete obj.password
      res.json(obj)
    } else {
      res.json(false);
    }
  },
  getData:async function (req, res) {
    const fs=require('fs');
    let arr=await Comment1.find();
    arr=arr.map(el=>{
      delete el.id;
      delete el.createdAt;
      delete el.updatedAt;
      return el;
    });
    const str=JSON.stringify(arr);
    fs.writeFile('./Comment1.js',str,function (error) {
      if (error){
        console.log('写入失败')
      }else {
        console.log('写入成功')
      }
    })
    res.join(arr)
  },
  writeData:async function (req, res) {
    const fs=require('fs');
    let arr=await Comment1.find();
    const str=JSON.stringify(arr);
    fs.readFile('./Comment1.js',async function (error,data) {
      if (error){
        console.log('文件读取失败');
      }else {
        let arr=data.toString();//转换为字符串
        const json=JSON.parse(arr);//字符串还原为json
        const arr1= await Comment1.createEach(json).fetch();
        res.json(arr1)

      }
    })
    res.join(arr)
  },
  registed: async function (req, res) {
    const json=req.allParams();
    try {
      const obj = await Users1.create(json).fetch();
      delete obj.password;
      res.json(obj)
    }catch(error){
      res.json(false);
    }
  },
  writeRecord: async function (req, res) {
    const json = req.allParams();
    const obj = await Record.create(json).fetch();
    res.json(obj);
  },
  writeRecordVideo: async function (req, res) {
    const json = req.allParams();
    const obj = await RecordVideo.create(json).fetch();
    res.json(obj);
  },
};
