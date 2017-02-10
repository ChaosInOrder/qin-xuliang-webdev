(function(){
	angular
		.module("WebAppMaker")
		.factory("WebsiteService",WebsiteService);
		function WebsiteService(){
			var websites=[
			  { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
			  { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
			  { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
			  { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
			  { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
			  { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
			];
			var api={
		            "createWebsite": createWebsite,
		            "findWebsitesByUser": findWebsitesByUser,
		            "findWebsiteById": findWebsiteById,
		            "updateWebsite": updateWebsite,
		            "deleteWebsite": deleteWebsite
					};
			return api;
			function createWebsite(userId,Website){
				Website._id=websites.length+1;
				Website.developerId=userId;
				websites.push(Website);
				return Website;

			}

			function findWebsitesByUser(userId){
				res=[];
				for(var i in websites){
					if(websites[i].developerId == userId)
                    {res.push(websites[i]);}
				}
				return res;
			}

			function findWebsiteById(websiteId){
                for(var i in websites){
                    if(websites[i]._id==websiteId)
                    { return websites[i];}
                }
                return null;
			}

			function updateWebsite(websiteId, website){
                for(var i in websites){
                    if(websites[i]._id==websiteId)
                    { websites[i].name==website.name;
                    websites[i].description=website.description;}
                }
			}

			function deleteWebsite(websiteId){
                for(var i in websites){
                    if(websites[i]._id==websiteId)
                        websites.splice(i,1);
                }
			}

		}
})();