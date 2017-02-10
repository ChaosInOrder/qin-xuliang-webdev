(function(){
	angular
		.module("WebAppMaker")
		.factory("UserService",UserService);
		function UserService(){
			var users=[
                {_id: "1", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
                {_id: "2", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
                {_id: "3", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
                {_id: "4", username: "qin", password: "qin", firstName: "666",   lastName: "888" }
            ];
			var api={
		            "createUser": createUser,
		            "findUserById": findUserById,
		            "findUserByUsername": findUserByUsername,
		            "findUserByCredentials": findUserByCredentials,
		            "updateUser": updateUser,
		            "deleteUser": deleteUser
					};
			return api;


			function createUser(user){
				user._id=users.length+1;
				users.push(user);
				return user;

			}

			function findUserById(userId){
				for(var i in users){
					if (users[i]._id==userId)
						return users[i];

				}
				return null;
			}

			function findUserByUsername(username){
                for(var i in users){
                    if (users[i].username==username)
                        return users[i];

                }
                return null;
			}

            function findUserByCredentials(username, password) {
                for(var u in users) {
                    if( users[u].username == username &&
                        users[u].password == password ) {
                        return users[u];
                    }
                }
                return null;
            }

			function updateUser(userId,user){
                for(var i in users){
                    if (users[i]._id==userId)
                        users[i]=user;

                }
			}

			function deleteUser(userId){
                for(var i in users){
                    if (users[i]._id==userId)
                        users.splice(i,1);

                }
			}

		}
})();