(function(){
	angular
		.module("WebAppMaker")
        .factory("PageService", PageService);
		function PageService(){
			var pages=[
						  { "_id": "1", "name": "Post 1", "websiteId": "4", "title": "Lorem" },
						  { "_id": "2", "name": "Post 2", "websiteId": "4", "title": "Lorem" },
						  { "_id": "3", "name": "Post 3", "websiteId": "4", "title": "Lorem" }
						];
			var api={
			            "createPage": createPage,
			            "findPageByWebsiteId": findPageByWebsiteId,
			            "findPageById": findPageById,
			            "updatePage": updatePage,
			            "deletePage": deletePage
					};
			return api;


			function createPage(websiteId,page){
                page._id=pages.length+1;
                page.websiteId=websiteId;
                pages.push(page);
                return page;
			}

			function findPageByWebsiteId(websiteId){
				res=[]
				for(var i in pages){
					if(pages[i].websiteId==websiteId)
                    {res.push(pages[i]);}
				}
				return res
			}

			function findPageById(pageId){
				for(var i in pages){
					if(pages[i]._id==pageId)
                    {return pages[i];}
				}
				return null;
			}

			function updatePage(pageId,page){
				for(var i in pages)
					if(pages[i]._id==pageId)
					{
						pages[i].naem=page.name;
						pages[i].title=page.title;
					}
			}

			function deletePage(pageId){
				for(var i in pages){
					if(pages[i]._id==pageId)
                    {pages.splice(i,1)}
				}

			}

		}
})();