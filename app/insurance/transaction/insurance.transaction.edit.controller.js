(function(){

	insuranceTrnxEditController = function($scope, $q, $rootScope, $filter, $modalInstance, settings, getreferences, passingValues, insuranceService, storageServices, aswaValidationService){
		$scope.passingValues 							= 	{};
		$scope.isEdit 									= 	passingValues.isEdit;
		$scope.passingValues.title 						= 	passingValues.title;
		$scope.insurance  								= 	{};
		$scope.insurance.insuranceTrnxBO 				= 	passingValues.insuranceTrnxBO;
		$scope.reference								=	{};
		$scope.reference.paymentMode					=	getreferences.references.paymentMode;
		$scope.reference.policyType						=	getreferences.references.policyType;
		$scope.reference.genericStatusTwo				=	[];
		$scope.isEdit 									=	false;
		$scope.isEdit 									=	passingValues.isEdit;

		// EXCLUDE THE GENERIC STATUS WHICH ARE NOT REQUIRED FOR THIS PAGE....
		angular.forEach(getreferences.references.genericStatusTwo, function(val, key){
			if(val.code != settings.rootScope.EXCLUDE_GENERIC_STATUS_TWO_PENDING && val.code != settings.rootScope.EXCLUDE_GENERIC_STATUS_TWO_PAID){
				$scope.reference.genericStatusTwo.push(val);
			}

		});

		$scope.getRef					=	{};
		$scope.getRef.referencesDataMap = {
			"policyType" 	: 	getreferences.referencesData.insuranceType,
			"paymentMode" 	: 	getreferences.referencesData.paymentMode
		};

		$scope.getInsurancePolicy = function(){
			$rootScope.showSpinner();
			insuranceService.getInsurancePolicy().then(function(data){
				if(data.msg!=''){
					$scope.insurance.insurancePolicy 	=	[];
					$scope.insurance.insurancePolicy 	= 	data;
					$scope.reference.policyNo 			=	[];
					// CREATE NEW REFERENCE FOR POLICYNO..
						for(var i=0; i<data.length; i++){
							var node 	=	{};
							node.code 	= 	data[i].POLICYNO;
							node.name	=	data[i].POLICYNO+"-"+ $filter('reverseCode')($scope.getRef.referencesDataMap.policyType[data[i].POLICY_TYPE]);
							$scope.reference.policyNo.push(node);;
						}
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};
		$scope.getInsurancePolicy();
		

		
		
		$scope.saveInsuranceTrnx = function () {
			var pushData = {};
			pushData			=	$scope.insurance.insuranceTrnxBO;
			var error 			=	aswaValidationService.isInsuranceTrnxValid($scope.insurance.insuranceTrnxBO);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				if($scope.isEdit){
					$rootScope.showSpinner();
					
					insuranceService.putInsuranceTrnxData(pushData).then(function(data){
						if(data!=''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
							storageServices.remove("insuranceData_" + pushData.POLICYNO, "getInsuranceTrnxDetails");
							$modalInstance.close(pushData);
						}else{
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('Error', data.error);
						}
					})
				}else{
					$rootScope.showSpinner();
					insuranceService.pushInsuranceTrnxData(pushData).then(function(data){
						if(data.msg!=''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.add.title'], Messages['modal.add.message']);
							storageServices.remove("insuranceData_" + pushData.POLICYNO, "getInsuranceTrnxDetails");
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

	angular.module('aswa').controller('insuranceTrnxEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'settings', 'getreferences', 'passingValues', 'insuranceService', 'storageServices', 'aswaValidationService', insuranceTrnxEditController]);



})();
