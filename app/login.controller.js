(function(){

	function loginController($location, $scope, $rootScope, i18nFilter, $modal, $filter, mainServices, loginServices, utilityServices, storageServices, aswaValidationService){

		$scope.reference	=	{};
		$scope.reference.travelIcon			=	reference.travelIcon;
		$scope.reference.travelStatus		=	reference.travelStatus;
		$scope.reference.filterStatus		=	reference.filterStatus;

		$scope.login										=	{};
  	$rootScope.loggedInFlag 				= false;
		$scope.getAuthenticate 	= function(param){
			var error 		= 	aswaValidationService.isLoginValid(param);
			if(error){
					$rootScope.showErrorBox('error', error, 'sm');
			}else{
				loginServices.getUser(param).then(function(data){
					if(data.length > 0){
						console.log("REACHED");
						$location.path('/dashboard');
					}else{
						$scope.errordetails 	= 	Messages['login.failure.message'];
						$rootScope.showErrorBox('error', $scope.errordetails, 'sm');
					}
		 		});
			}
		}
	}
	angular.module('aswa').controller('loginController',['$location', '$scope', '$rootScope','i18nFilter', '$modal', '$filter', 'mainServices', 'loginServices', 'utilityServices', 'storageServices', 'aswaValidationService', loginController]);
})();
