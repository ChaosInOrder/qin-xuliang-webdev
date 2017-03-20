/**
 * Created by Chaos on 3/15/2017.
 */
module.exports=function () {
    var mongoose=require("mongoose");
    var websiteSchema=mongoose.Schema({
        _user:{type:mongoose.Schema.Types.ObjectId,ref:"userModel"},
        name:{type:String,reuqired:true},
        description:String,
        pages:[],
        dateCreated:{type:Date,deafult:Date.now()}},
    {collection:"website"});
    return websiteSchema;
}