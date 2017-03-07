(function(){

	serviceEditController = function($scope, $q, $rootScope, $filter, $modalInstance, settings, getreferences, passingValues, carmanagerService, aswaValidationService){
		$scope.passingValues 							= 	{};
		$scope.isEdit 									= 	passingValues.isEdit;
		$scope.passingValues.title 						= 	passingValues.title;
		$scope.serviceBO								=	{};
		$scope.serviceBO.serviceData					=	passingValues.serviceBO;
		$scope.reference								=	{};
		$scope.reference.car							=	getreferences.references.car;
		$scope.reference.genericStatusTwo				=	[];

		
		$scope.saveServiceData = function () {
			var pushData = {};
			pushData			=	$scope.serviceBO.serviceData;
			var error 			=	aswaValidationService.isServiceDataValid(pushData);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				if($scope.isEdit){
					$rootScope.showSpinner();
					carmanagerService.putServiceData(pushData).then(function(data){
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
					carmanagerService.pushServiceData(pushData).then(function(data){
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

	angular.module('aswa').controller('serviceEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'settings', 'getreferences', 'passingValues', 'carmanagerService', 'aswaValidationService', serviceEditController]);



})();
