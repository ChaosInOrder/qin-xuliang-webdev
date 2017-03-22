/**
 * Created by Chaos on 3/15/2017.
 */
module.exports=function () {
    var mongoose=require("mongoose");
    var widgetSchema=mongoose.Schema({
        _page:{type:mongoose.Schema.Types.ObjectId,ref:"page"},
        widgetType: {
            type: String,
            enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT'],
            required: true
        },
        index: Number,
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated:{type:Date,deafult:Date.now()}
    },{collection:"widget"});
    return widgetSchema

}