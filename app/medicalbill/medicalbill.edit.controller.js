(function(){

	medicalbillEditController = function($scope, $q, $rootScope, $filter, $modalInstance, getreferences, passingValues, medicalbillService, aswaValidationService){
		$scope.passingValues 				= 	{};
		$scope.isEdit 						= 	passingValues.isEdit;
		$scope.passingValues.title 			= 	passingValues.title;
		$scope.medicalbill  				= 	{};
		$scope.medicalbill.medicalbillBO 	= 	passingValues.medicalbillBO;
		$scope.reference					=	{};
		$scope.reference.medicalbillusers	=	getreferences.references.medicalbillUsers;
		$scope.reference.medicalbilltypes	=	getreferences.references.medicalbillTypes;

		$scope.saveMedicalbill = function () {
			var pushData = {};
			pushData			=	$scope.medicalbill.medicalbillBO;
			var error 			=	aswaValidationService.isMedicalbillValid($scope.medicalbill.medicalbillBO);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				if($scope.isEdit){
					$rootScope.showSpinner();
					medicalbillService.updateMedicalbillData(pushData).then(function(data){
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
					medicalbillService.pushMedicalbillData(pushData).then(function(data){
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

	angular.module('aswa').controller('medicalbillEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'getreferences', 'passingValues', 'medicalbillService', 'aswaValidationService', medicalbillEditController]);



})();
