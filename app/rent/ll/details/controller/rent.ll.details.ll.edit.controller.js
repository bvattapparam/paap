(function(){

	landlordEditController = function($scope, $q, $rootScope, $filter, $modalInstance, passingValues, rentService, aswaValidationService, storageServices, getreferences){
		$scope.passingValues 				= 	{};
		$scope.isEdit 						= 	passingValues.isEdit;
		$scope.passingValues.title 			= 	passingValues.title;
		$scope.ll  							= 	{};
		$scope.ll.llBO 						= 	passingValues.llBO;
		$scope.reference					=	{};
		$scope.reference.landlordTypes		=	getreferences.references.landlordTypes;
		$scope.reference.landlordStatus		=	getreferences.references.landlordStatus;

		$scope.rentRef						=	{};
		$scope.rentRef.referencesDataMap = {
			"llTypes" 			: getreferences.referencesData.landlordTypes,
			"landlordStatus" 	: getreferences.referencesData.landlordStatus,
			"landlordTypeIcon"	: getreferences.referencesData.landlordTypeIcon
		};


		$scope.saveLandlord = function (record) {
			var pushData 		=	 	{};
			pushData 			= 		record;
			var error 			=		aswaValidationService.isLandlordValid(pushData);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				if($scope.isEdit){
					//console.log("pushData", pushData);
					$rootScope.showSpinner();
					rentService.updateLandlord(pushData).then(function(data){
						if(data.msg!=''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message'])
							$modalInstance.close();
						}else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('Error', data.error);
						}
					})
				}else{
					$rootScope.showSpinner();
					// generate llcode 
					var first2Char 	= 	pushData.name.slice(0,2);
					var dopDate 	= 	pushData.dop;
					var regExp 		= 	/[^\w\s]/gi;
					var dopNumber 	= 	dopDate.replace(regExp, '');
					var llCode 		=	first2Char.concat(dopNumber);
					//console.log('CODE', llCode);
					pushData.llcode = llCode; // Landlord code.
					rentService.addLandlord(pushData).then(function(data){
							if(data.msg != ''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.add.title'], Messages['modal.add.message'])
							$modalInstance.close();
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

	angular.module('aswa').controller('landlordEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'passingValues', 'rentService', 'aswaValidationService', 'storageServices', 'getreferences', landlordEditController]);



})();
