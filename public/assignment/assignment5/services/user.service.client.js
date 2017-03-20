(function(){
	angular
		.module("WebAppMaker")
		.factory("UserService",UserService);
		function UserService($http){
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
			    console.log("createUser client server!");
			    console.log(user);
			    return $http.post("/api/user",user);
			}

			function findUserById(userId){
                return $http.get("/api/user/"+userId);
			}

			function findUserByUsername(username){
                return $http.get("/api/user?username="+username);
			}

            function findUserByCredentials(username, password) {
                // for(var u in users) {
                //     if( users[u].username == username &&
                //         users[u].password == password ) {
                //         return users[u];
                //     }
                // }
                // return null;
				console.log(password)
                return $http.get("/api/user?username="+username+"&password="+password);
            }

			function updateUser(userId,newUser){
                return $http.put("/api/user/"+userId, newUser);
			}

			function deleteUser(userId){
			    return $http.delete("/api/user/"+userId);
			}

		}
})();