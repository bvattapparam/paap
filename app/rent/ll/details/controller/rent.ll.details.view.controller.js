(function(){
	// Landlord alone
	function rentLLController($scope, $rootScope,rentService, $modal, headerService, utilityServices, storageServices, getreferences){
		$scope.rentBO						=	{};
		$scope.reference					=	{};
		$rootScope.title 					= 	Messages['rent.breadcrumb'];

		$scope.reference.landlordStatus		=	getreferences.references.landlordStatus;
		$scope.reference.landlordName		=	getreferences.references.landlordNames;
		$scope.reference.rentStatus			=	getreferences.references.rentStatus;
		$scope.bigTotalItems 				= 	"";

		$scope.getLandLord = function(){
			$rootScope.showSpinner();
			rentService.getLandLord().then(function(data){
				$scope.llData		=	[];
				$scope.llData 		= 	data;
				$rootScope.hideSpinner();
			});
		}
		$scope.getLandLord();
			$scope.addLL = function () {
			var config= {};
				config.templateUrl 			= 	'../app/rent/ll/details/view/rent.ll.details.ll.edit.html';
				config.controller 			= 	'landlordEditController';
				config.size					= 	'md';
				config.backdrop				= 	'static';
				config.passingValues 		= 	{};
				config.passingValues.isEdit = 	false;
				config.passingValues.title 	= 	Messages['rent.ll.add.title'];
				config.callback 			= 	function(status, item){
					if(status === 'success') {
						storageServices.remove("rent_", "getLandLord");
						$scope.getLandLord();
					}
				}
				utilityServices.openConfigModal($modal, config);
		}

		$scope.editLL = function (data) {
			var config 						= 	{};
			config.templateUrl 				= 	'../app/rent/ll/details/view/rent.ll.details.ll.edit.html';
			config.controller 				= 	'landlordEditController';
				config.size					= 	'm';
				config.backdrop				= 	'static';
				config.passingValues 		= 	{};
				config.passingValues.title 	= 	Messages['rent.ll.edit.title'];
				config.passingValues.llBO 	= 	data;
				config.passingValues.isEdit = 	true;
				config.callback 			= 	function(status, item){
					if(status === 'success') {
						storageServices.remove("rent_", "getLandLord");
						storageServices.remove("rent_" + data.llcode, "getLandLordDetails");
						$scope.getLandLord();
					}
				}
				utilityServices.openConfigModal($modal, config);
		}

		$scope.refresh	=	function(){
			storageServices.remove("rent_", "getLandLord");
			$scope.getLandLord();
		}

	}

	angular.module('aswa').controller('rentLLController',['$scope', '$rootScope','rentService', '$modal', 'headerService', 'utilityServices', 'storageServices', 'getreferences', rentLLController]);
})();
