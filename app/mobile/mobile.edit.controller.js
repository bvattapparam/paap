(function(){

	mobileEditController = function($scope, $q, $rootScope, $filter, $modalInstance, passingValues, getreferences, rentService, aswaValidationService){
		$scope.passingValues 			= 	{};
		$scope.isEdit 					= 	passingValues.isEdit;
		$scope.passingValues.title 		= 	passingValues.title;
		$scope.mobile  					= 	{};
		$scope.mobile.mobileBO 			= 	passingValues.mobileBO;
		$scope.reference				=	{};
		$scope.reference.mobileusers	=	getreferences.references.mobileusers;

		$scope.saveMobile = function () {
			var pushData = {};
			pushData	=	$scope.mobile.mobileBO;
			var error =	aswaValidationService.isMobileValid($scope.mobile.mobileBO);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				if($scope.isEdit){
					$rootScope.showSpinner();
					rentService.updateRentData(record).then(function(status){
						if(status==200){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
							$modalInstance.close(record);
						}
					})
				}else{
					$rootScope.showSpinner();
					mobileService.pushRentData(pushData).then(function(status){
						if(data.msg!=''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.add.title'], Messages['modal.add.message']);
							$modalInstance.close(pushData);
						}
						else {
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

	angular.module('aswa').controller('mobileEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'passingValues', 'getreferences', 'rentService', 'aswaValidationService', mobileEditController]);



})();
