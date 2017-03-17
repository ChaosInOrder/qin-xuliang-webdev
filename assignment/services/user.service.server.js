module.exports = function(app,model){
		app.get("/api/user",findUser);
		app.get("/api/user/:userId",findUserById);
		app.put("/api/user/:userId",updateUser);
		app.delete("/api/user/:userId",deleteUser);
        app.post("/api/user",createUser);

        function findUserById(req,res){
            console.log("findUserById sever service")
            var userId=req.params.userId;

            model.
                userModel.findUserById(userId)
                .then(
                    function (user) {
                        if (user){res.json(user);}
                        else {res.sendStatus(404)};

                    }
                );
        }

        function findUser(req,res){
            console.log("findUser sever service")
            var username=req.query.username;
            var password=req.query.password;
            if(username && password){
                findUserByCredentials(req,res);
            }
            else if(username){
                findUserByUsername(req,res);
            }
        }

        function findUserByUsername(req,res){
            var username= req.query.username;

            model.
            userModel.findUserByUsername(username)
                .then(
                    function (user) {
                        if (user){res.json(user);}
                        else {res.sendStatus(404)};
                    }
                );
        }

        function findUserByCredentials(req,res) {
            var username=req.query.username;
            var password=req.query.password;
            console.log("User Service findUserByCredentials.");

            model.
            userModel.findUserByCredentials(password,username)
                .then(
                    function (user) {res.json(user);}
                );

        }

        function updateUser(req,res){
            var userId=req.params.userId;
            var newUser=req.body;
            console.log("User server Service updateUser.");
            model.
            userModel
                .updateUser(userId,newUser)
                .then(function (user) {
                    res.json(user);
                },function (err) {
                    res.send(500).send(404);
                });
        }

    function createUser(req,res){
        var user=req.body;
        console.log(user)
        model.
            userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            },function (err) {
                res.send(500).send(404);
            });
    }

    function deleteUser(req,res) {
        var userId=req.params.userId;

        model.
            userModel
            .deleteUser(userId)
            .then(function () {
                res.send(200);
            },function (err) {
                res.sendStatus(500).sendStatus(404);

            });

    }

};