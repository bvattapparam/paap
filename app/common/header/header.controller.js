(function(){

	function headerController($rootScope, $scope, headerService, storageServices, dashboardServices){

		$rootScope.breadcrumbMain = "Aswa";
		$scope.userBO	=	{};
		// watch added to keep track the change in the rooscope for user details from cache.
		$scope.$watch("loggedInFlag", function(newValue, oldValue){
				$scope.userBO.userData	=	storageServices.get("user_", "getUser");
				if($scope.userBO.userData)
				{
					$scope.userBO.userData.firstname	=	$scope.userBO.userData[0].firstName;
					$scope.userBO.userData.lastname	=	$scope.userBO.userData[0].lastName;
					$scope.userBO.userData.role	=	$scope.userBO.userData[0].role;
				}
		});

		// notificatiion..
		$scope.br	=	{};
		$scope.getBR = function(){
			$rootScope.showSpinner();
			dashboardServices.getBR().then(function(data){
				$scope.br.brBO = [];
					$scope.br.brBO = data;
					$scope.brLength	=	data.length;
					$rootScope.hideSpinner();
			});
		}
		$scope.getBR();





	}

	angular.module('aswa').controller("headerController",["$rootScope", "$scope","headerService", "storageServices", "dashboardServices", headerController]);

})();
