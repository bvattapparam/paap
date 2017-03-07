(function(){

	fuelEditController = function($scope, $q, $rootScope, $filter, $modalInstance, settings, getreferences, passingValues, carmanagerService, aswaValidationService){
		$scope.passingValues 							= 	{};
		$scope.isEdit 									= 	passingValues.isEdit;
		$scope.passingValues.title 						= 	passingValues.title;
		$scope.fuelBO									=	{};
		$scope.fuelBO.fuelData							=	passingValues.fuelBO;
		$scope.reference								=	{};
		$scope.reference.car							=	getreferences.references.car;
		$scope.reference.genericStatusTwo				=	[];

		
		$scope.saveFuelData = function () {
			var pushData = {};
			pushData			=	$scope.fuelBO.fuelData;
			var error 			=	aswaValidationService.isFuelDataValid(pushData);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				if($scope.isEdit){
					$rootScope.showSpinner();
					carmanagerService.putFuelData(pushData).then(function(data){
						if(data!=''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
							$modalInstance.close(pushData);
						}else{
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('Error', data.error);
						}
					})
				}else{
					$rootScope.showSpinner();
					carmanagerService.pushFuelData(pushData).then(function(data){
						if(data.msg!=''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.add.title'], Messages['modal.add.message']);
							$modalInstance.close(pushData);
						}
						else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('Error', data.error);
						}
					})
				}// if add/edit is close here
			}// check error close here
		};

		$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
		};



	}

	angular.module('aswa').controller('fuelEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'settings', 'getreferences', 'passingValues', 'carmanagerService', 'aswaValidationService', fuelEditController]);



})();
