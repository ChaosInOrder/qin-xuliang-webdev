/**
 * Created by Chaos on 3/22/2017.
 */
module.exports = function (app, model) {
    app.get("/api/fkr", searchPhotos);

    function searchPhotos(req, res) {
        var searchTerm = req.query.searchTerm;
        // var key = process.env.FLCKR_KEY;
        // var secret = process.env.FLCKR_SECRET;
        var key = "983708e8fd4ad1fbe4f920b64b1ef141";
        var secret = "5114971b18a4d4b0";
        var Flickr = require("flickrapi"),
            flickrOptions = {
                api_key: key,
                secret: secret
            };

        Flickr.tokenOnly(flickrOptions, function(error, flickr) {
            // we can now use "flickr" as our API object,
            // but we can only call public methods and access public data
            flickr.photos.search({
                text : searchTerm
            }, function(err, result) {
                // result is Flickr's response
                if (err) {
                    res.sendStatus(500).send(err);
                } else {
                    res.json(result);
                }
            });
        });



    }

};
