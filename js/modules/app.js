angular.module('myApp',['ngRoute','myApp.home','myApp.panel','myApp.edit_section','myApp.add_post','ngCookies','myApp.register'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider.otherwise({
		redirectTo:'/home'
	});
}])
.factory('userPersistence',['$cookies','$location','$firebaseAuth',function($cookies,$location,$firebaseAuth){
	var user='';
	var pass='';
	var firebaseObj=new Firebase("https://notify95.firebaseio.com/");

	var auth=$firebaseAuth(firebaseObj);
	return{
		setCookieData:function(username){
			user=username;
			$cookies.put('user',user);
		},
		getCookieData:function(){
			user=$cookies.get('user');
			return user;
		},
		logoutUser:function(){
				auth.$unauth();
				$cookies.remove('user');

				console.log("Done logout");

				$location.path('/home');
		},
		setFlag:function(pass){
			$cookies.put('pass',pass);
		},
		offFlag:function(){
			$cookies.remove('pass');
		},
		getFlag:function(){
			pass=$cookies.get('pass');
			return pass;
		}
	}
                  
}]);