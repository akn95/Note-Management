angular.module('myApp.home',['ngRoute','firebase'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/home',{
		templateUrl:'home/home.html',
		controller:'homeCtrl'
	});
}])
.controller('homeCtrl',['$scope','$firebaseAuth','$location','userPersistence',function($scope,$firebaseAuth,$location,userPersistence){
		var firebaseObj=new Firebase("https://notify95.firebaseio.com/");
		var auth = $firebaseAuth(firebaseObj);
		$scope.user={};

		$scope.signIn=function(event){
			event.preventDefault();
			var username=$scope.user.email;

			checks(username);
			function checks(username){
				var ref=new Firebase("https://notify95.firebaseio.com/users");
				ref.once('value',function(snapshot){
					var exists=false;
					snapshot.forEach(function(childSnapshot){
						
						if(username==childSnapshot.val().email){
							$scope.$apply(function(){
								exists=true;
							});
						}
					})
					userCallBack(username,exists);
				})
				
			}

			function userCallBack(username,exists){
				if(exists){
					userPersistence.setCookieData(username);
					$scope.$apply(function(){
						$location.path('/panel');
					});
					
				}
				else
				{
					console.log("Username is Wrong");
				}
			}
			
		}
}])