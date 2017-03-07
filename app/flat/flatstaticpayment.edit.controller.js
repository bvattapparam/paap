(function(){

	flatstaticpaymentEditController = function($scope, $q, $rootScope, $filter, $modalInstance, settings, getreferences, passingValues, flatBasicService, aswaValidationService){
		$scope.passingValues 							= 	{};
		$scope.isEdit 									= 	passingValues.isEdit;
		$scope.passingValues.title 						= 	passingValues.title;
		$scope.flatStaticPayment  						= 	{};
		$scope.flatStaticPayment.flatStaticPaymentBO 	= 	passingValues.flatStaticPaymentBO;
		$scope.reference								=	{};
		$scope.reference.paymentMode					=	getreferences.references.paymentMode;
		$scope.reference.genericStatusTwo				=	[];



		// EXCLUDE THE GENERIC STATUS WHICH ARE NOT REQUIRED FOR THIS PAGE....
		angular.forEach(getreferences.references.genericStatusTwo, function(val, key){
			if(val.code != settings.rootScope.EXCLUDE_GENERIC_STATUS_TWO_PENDING && val.code != settings.rootScope.EXCLUDE_GENERIC_STATUS_TWO_PAID){
				$scope.reference.genericStatusTwo.push(val);
			}

		});

		// TO HANDLE THE MODE OF PAYMENT AND RELATIVE FIELDS
		$scope.showMode	=	function(param){
			var currentMode	=	param;
			if(currentMode == 'CH'){
				$scope.mode	=	'CH';
			}else if(currentMode == 'DD'){
				$scope.mode 		=	'DD';
			}else if(currentMode == 'MCH'){
				$scope.mode 	=	'MCH';
			}else if(currentMode 	== 'WIRE'){
				$scope.mode 	=	'WIRE';
			}else if(currentMode == 'CSH'){
				$scope.mode 	=	'NA';
			}
		}
		
		// TO HANDLE RECEIPT STATUS AND RELATIVE FIELDS.
		$scope.showReceiptNo = false;
		$scope.showReceiptNumber	=	function(param){
			var receiptStatus	=	param;
			if(receiptStatus == 2){
				$scope.showReceiptNo =  true;
			}else{
				$scope.showReceiptNo = false;
			}
			
		}
		if(passingValues.flatStaticPaymentBO){
			$scope.showMode($scope.flatStaticPayment.flatStaticPaymentBO.MODE);
			$scope.showReceiptNumber($scope.flatStaticPayment.flatStaticPaymentBO.RECEIPT_STATUS);
			
		}
		
		$scope.saveFlatstaticpayment = function () {
			var pushData = {};

			pushData			=	$scope.flatStaticPayment.flatStaticPaymentBO;
			var error 			=	aswaValidationService.isFlatStaticPaymentValid($scope.flatStaticPayment.flatStaticPaymentBO);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				if($scope.isEdit){
					$rootScope.showSpinner();
					// TO HANDLE THE PAYMENT MODE NUMBERS BASED ON THE NEW VALUES.
					if(pushData.MODE === 'CH'){
						pushData.DD_NUMBER 			= 	'';
						pushData.WIRETRANSFER_ID	=	'';
						pushData.MCH_NUMBER			=	'';
					}else if(pushData.MODE === 'MCH'){
						pushData.DD_NUMBER 			=	'';
						pushData.WIRETRANSFER_ID	=	'';
						pushData.CHEQUE_NUMBER		=	'';
					}else if(pushData.MODE === 'DD'){
						pushData.MCH_NUMBER 		= 	'';
						pushData.WIRETRANSFER_ID	=	'';
						pushData.CHEQUE_NUMBER		=	'';
					}else if(pushData.MODE === 'WIRE'){
						pushData.MCH_NUMBER 		= 	'';
						pushData.DD_NUMBER			=	'';
						pushData.CHEQUE_NUMBER		=	'';
					}else if(pushData.MODE === 'CSH'){
						pushData.MCH_NUMBER 		=	'';
						pushData.DD_NUMBER 			=	'';
						pushData.WIRETRANSFER_ID 	=	'';
						pushData.CHEQUE_NUMBER 		=	'';
					}
					flatBasicService.putFlatStaticPaymentData(pushData).then(function(data){
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
					flatBasicService.pushFlatStaticPaymentData(pushData).then(function(data){
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

	angular.module('aswa').controller('flatstaticpaymentEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'settings', 'getreferences', 'passingValues', 'flatBasicService', 'aswaValidationService', flatstaticpaymentEditController]);



})();
