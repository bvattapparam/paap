(function(){

	rentEditController = function($scope, $q, $rootScope, $filter, $modalInstance, passingValues, getreferences, rentService, aswaValidationService){
		$scope.passingValues 			= 	{};
		$scope.isEdit 					= 	passingValues.isEdit;
		$scope.passingValues.title 		= 	passingValues.title;
		$scope.rent  					= 	{};
		$scope.rent.rentBO 				= 	passingValues.rentBO;
		$scope.reference				=	{};
		$scope.reference.landlord		=	getreferences.references.landlordNames;
		$scope.reference.rentStatus		=	getreferences.references.rentStatus;
		

		$scope.saveRent = function (record) {
			var pushData 		= 	{};
			pushData			=	record;
			var error 			=	aswaValidationService.isTravelValid(pushData);
			if(!error){
				$rootScope.showErrorBox('Error', error);
			}else{
				if($scope.isEdit){
					$rootScope.showSpinner();
					rentService.updateRentData(record).then(function(status){
						if(status==200){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
							$modalInstance.close();
						}
					})
				}else{
					$rootScope.showSpinner();
					rentService.pushRentData(pushData).then(function(status){
							if(status==200){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.add.title'], Messages['modal.add.message']);
							$modalInstance.close();
						}
						else {
							{
								console.log("error");
							}
						}
					})
				}// if add/edit is close here
			}// check error close here
		};

		$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
		};



	}

	angular.module('aswa').controller('rentEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'passingValues', 'getreferences', 'rentService', 'aswaValidationService', rentEditController]);



})();
