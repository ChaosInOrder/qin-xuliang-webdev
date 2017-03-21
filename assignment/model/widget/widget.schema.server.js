/**
 * Created by Chaos on 3/15/2017.
 */
module.exports=function () {
    var mongoose=require("mongoose");
    var widgetSchema=mongoose.Schema({
        _website:{type:mongoose.Schema.Types.ObjectId,ref:"website"},
        name:{type:String,reuqired:true},
        title:String,
        widgets:[],
        dateCreated:{type:Date,deafult:Date.now()}
    },{collection:widget});
    return widgetSchema

}