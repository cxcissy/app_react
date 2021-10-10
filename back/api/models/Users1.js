
module.exports = {

  attributes: {
    username:{type:'string',required:true},
    nickName:{type:'string',required:true},
    password:{type:'string',required:true},
    phone:{type:'number',required:true,unique:true},
    love:{type:'json'},
    brithday:{type:'string'},
  },

};

