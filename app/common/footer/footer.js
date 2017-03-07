(function(){
	function footerController($scope,$rootScope){
		$scope.copyright = "copyright reserved (2015-2016) to aswa2.0 ";
	}

	angular.module("aswa").controller('footerController',['$scope','$rootScope',footerController]);
})();