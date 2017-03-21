/**
 * Created by Chaos on 3/15/2017.
 */
module.exports=function () {
    console.log("Models sever side!")
    var mongoose=require('mongoose');

    var connectionString = 'mongodb://127.0.0.1:27017/test';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    var mongoose = require("mongoose");
    var Promise = require('bluebird');
    mongoose.createConnection(connectionString);

    var options = { promiseLibrary: require('bluebird') };
    var model={
        userModel: require("./user/user.model.server")(),
        websiteModel: require("./website/website.model.server")()
    }
    return model;
};