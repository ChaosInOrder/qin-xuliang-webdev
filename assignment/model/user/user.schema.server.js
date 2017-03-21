/**
 * Created by Chaos on 3/15/2017.
 */
module.exports=function () {
    var mongoose=require("mongoose");
    // var WebsiteSchema=require("../website/website.schema.server")();
    var UserSchema=mongoose.Schema({
        username:String,
        password:String,
        firstName:String,
        lastName:String,
        email:String,
        phone:String,
        websites:[{type:mongoose.Schema.Types.ObjectId,ref:"website"}],
        dateCreated:{type:Date,default:Date.now()}
    },{collection:"user"});
    return UserSchema;
};