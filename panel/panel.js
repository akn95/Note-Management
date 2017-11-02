angular.module('myApp.panel',['ngRoute','firebase'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/panel',{
		templateUrl:'panel/panel.html',
		controller:'panelCtrl'
	})
}])
.controller('panelCtrl',['$scope','userPersistence','$firebaseArray','$firebaseAuth','$location','$firebaseObject',function($scope,userPersistence,$firebaseArray,$firebaseAuth,$location,$firebaseObject){
	
	$scope.userName=userPersistence.getCookieData();
	$scope.pass=userPersistence.getFlag();
	if($scope.pass)    //if return back from the edit section to the main panel
	{
		userPersistence.offFlag();
	}
	if(!$scope.userName)
	{
		$location.path('/home');
	}
	var firebaseObj=new Firebase("https://notify95.firebaseio.com/Notes").startAt($scope.userName).endAt($scope.userName);
	$scope.notes=$firebaseArray(firebaseObj);

	$scope.logoutUser=function()
	{
		userPersistence.logoutUser();
	}

	$scope.prompt=function(){
		$("#myModal_1").modal();
		$('#myModal_1').on('shown.bs.modal', function() {
 		 $(this).find('[autofocus]').focus();
         });
	}

	$scope.enter=function(event){
		//$('#myModal_1').modal('hide');
		//event.preventDefault();
		var username=$scope.userName;
		var password=$scope.user.password;

		var firebaseObj2=new Firebase("https://notify95.firebaseio.com");
		var auth=$firebaseAuth(firebaseObj2);

		auth.$authWithPassword({
			email:username,
			password:password
		})
		.then(function(authData){
			$('#myModal_1').modal('hide');
			$('#myModal_1').on('hidden.bs.modal',function(){
				userPersistence.setFlag(password);
				$scope.$apply(function(){

					$location.path('/edit_section');
				})
				
			})
			
		},function(error){
			console.log("Error "+ error);
		})
	}

	$scope.views=function(id){
		var firebaseObj3=new Firebase("https://notify95.firebaseio.com/Notes/"+id);
		$scope.noteToView=$firebaseObject(firebaseObj3);

		$("#myModal").modal();
		
	}
}])
.directive('myEnter',function(){
	return function(scope,element,attrs){
		element.bind("keydown keypress",function(event){
			if(event.which==13){
				scope.$apply(function(){
					scope.$eval(attrs.myEnter);
				});
		}
		})
	}
})