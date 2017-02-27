module.exports=(function(app){
		app.get("/api/user",findUser);
		app.get("/api/user:userId",findUserById);
		app.get("/api/user/:userId",updateUser);
		function UserService(){
			var users=[
                {_id: "1", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" ,email:"" },
                {_id: "2", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",email:""  },
                {_id: "3", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  ,email:""},
                {_id: "4", username: "qin", password: "qin", firstName: "Xuliang",   lastName: "Qin",email:"" }
            ];



			function updateUser(res,req){
                var userId=req.param.userId;
                var newUser=req.body;
                console.log(newUser);

				for(var i in users){
                    if (users[i]._id==userId)
                        users[i].firstName=newUser.firstName;
                    	user[i].lastName=newUser.lastName;
                    	res.json(user[i]);
                    	return;

                }
			}



		}
})();