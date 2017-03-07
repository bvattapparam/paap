(function(){

	insuranceEditController = function($scope, $q, $rootScope, $filter, $modalInstance, settings, getreferences, passingValues, insuranceService, aswaValidationService){
		$scope.passingValues 							= 	{};
		$scope.isEdit 									= 	passingValues.isEdit;
		$scope.passingValues.title 						= 	passingValues.title;
		$scope.insurance  								= 	{};
		$scope.insurance.insuranceBO 					= 	passingValues.insuranceBO;
		$scope.reference								=	{};
		$scope.reference.policyType						=	getreferences.references.insuranceType;
		$scope.reference.nomineeRelationship			=	getreferences.references.nomineeRelationship;
		$scope.reference.genericStatusTwo				=	[];
		$scope.isEdit 									=	false;
		$scope.isEdit 									=	passingValues.isEdit;

		// EXCLUDE THE GENERIC STATUS WHICH ARE NOT REQUIRED FOR THIS PAGE....
		angular.forEach(getreferences.references.genericStatusTwo, function(val, key){
			if(val.code != settings.rootScope.EXCLUDE_GENERIC_STATUS_TWO_PENDING && val.code != settings.rootScope.EXCLUDE_GENERIC_STATUS_TWO_PAID){
				$scope.reference.genericStatusTwo.push(val);
			}

		});

		
		
		$scope.saveInsurance = function () {
			var pushData = {};
			pushData			=	$scope.insurance.insuranceBO;
			var error 			=	aswaValidationService.isInsuranceValid($scope.insurance.insuranceBO);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				if($scope.isEdit){
					$rootScope.showSpinner();
					
					insuranceService.putInsuranceData(pushData).then(function(data){
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
					insuranceService.pushInsuranceData(pushData).then(function(data){
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

	angular.module('aswa').controller('insuranceEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'settings', 'getreferences', 'passingValues', 'insuranceService', 'aswaValidationService', insuranceEditController]);



})();
