angular.module('myApp.register',['ngRoute','firebase'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/register',{
		templateUrl:'home/register.html',
		controller:'registerCtrl'
	});
}])
.controller('registerCtrl',['$scope','$firebaseAuth','$location',function($scope,$firebaseAuth,$location){
		var firebaseObj=new Firebase("https://notify95.firebaseio.com/users");
		var auth=$firebaseAuth(firebaseObj);

		$scope.signUp=function(){
			var email=$scope.user.email;
			var password=$scope.user.password;	
			if(email && password){
				auth.$createUser({
					email:email,
					password:password
				})
				.then(function(){
					//console.log('User creation success');
					firebaseObj.push({
						email:email
					},function(error){
						if(error)
							console.log("failed");
						else
						{
							$scope.$apply(function(){
								$location.path('/home');
							});
							
						}
					})
					
				},function(error){
					//$scope.regError=true;
					//$scope.regErrorMessage=error.message;
					console.log("Error!!: "+error);
				})
			}
		}
}])