(function(){

	function logoutController($location, $scope, $rootScope, i18nFilter, $modal, $filter, mainServices, utilityServices, storageServices, aswaValidationService){
		$scope.logout	=	function(){
			storageServices.removeAll();
			$location.path('/dashboard');

		}

	}
	angular.module('aswa').controller('logoutController',['$location', '$scope', '$rootScope','i18nFilter', '$modal', '$filter', 'mainServices', 'utilityServices', 'storageServices', 'aswaValidationService', logoutController]);
})();
