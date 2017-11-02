angular.module('myApp.add_post',['ngRoute','firebase'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/add_post',{
		templateUrl:'add_post/add_post.html',
		controller:'addPostCtrl'
	})
}])
.controller('addPostCtrl',['$scope','$location','userPersistence',function($scope,$location,userPersistence){

	$scope.userName=userPersistence.getCookieData();
	$scope.pass=userPersistence.getFlag();
	if(!$scope.pass)
	{
		$location.path('/panel');
	}
	if(!$scope.userName)
	{
		$location.path('/home');
	}
	$scope.logoutUser=function()
	{
		userPersistence.offFlag();
		userPersistence.logoutUser();
	}
	$scope.addNote=function(event){
		event.preventDefault();
		var firebaseObj=new Firebase("https://notify95.firebaseio.com/Notes");
		var title=$scope.note.title;
		var paradigm=$scope.note.paradigm;
		var timec=$scope.note.timec;
		var spacec=$scope.note.spacec;
		var textb=$scope.note.textb;
		var half="";
		//alert(textb[0]);
		for(var i=0;i<textb.length && i<200;i++)
		{
			half=half+textb[i];
		}
		half=half+"...";
		
		var user=userPersistence.getCookieData();

		firebaseObj.push({
			title:title,
			paradigm:paradigm,
			timec:timec,
			spacec:spacec,
			textb:textb,
			emailId:user,
			half:half,
			'.priority':user
		},function(error){
			if(error)
			{
				console.log(error);
			}
			else
			{
				$scope.$apply(function() {
    				$location.path('/edit_section');
				});
			}
		})
	}
}])