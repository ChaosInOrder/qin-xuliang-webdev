module.exports = function(app){
		app.get("/api/user",findUser);
		app.get("/api/user/:userId",findUserById);
		app.put("/api/user/:userId",updateUser);
		//app.delete();
		var users = [
			{_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
			{_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
			{_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
			{_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
		];

        function findUserById(req,res){
            console.log("findUserById sever service")
            var userId=req.params.userId;

            var user = users.find(function(user){
                return user._id == userId;
            });
            console.log(user);
            res.json(user);
        }

        function findUser(req,res){
            console.log("findUser sever service")
            var username=req.query.username;
            var password=req.query.password;
            if(username && password){
                findUserByCredentials(req,res);
            }
            else if(user){
                findUserByUsername(req,res);
            }
        }

        function findUserByUsername(req,res){
            var user = users.find(function (u) {
                return u.username == req.query.username;
            });

            console.log(user);

            if(user){
                res.json(user);
            }
            else{
                res.sendStatus(404);
            }
        }

        function findUserByCredentials(req,res) {
            var username=req.query.username;
            var password=req.query.password;
            console.log("User Service findUserByCredentials.");

            var user = users.find(function(user){
                return user.password == password && user.username == username;
            });
            console.log(user);
            res.json(user);

        }

        function updateUser(req,res){
            var userId=req.params.userId;
            var newUser=req.body;
            console.log("User server Service updateUser.");
            for(var i in users){
                if(users[i]._id==userId){
                    users[i].firstName=newUser.firstName;
                    users[i].lastName=newUser.lastName;
                    res.json(users[i]);
                }
            }
        }

}