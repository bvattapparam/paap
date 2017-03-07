(function(){

	travelEditController = function($scope, $q, $rootScope, $filter, $modalInstance, passingValues, travelServices, aswaValidationService, storageServices, getreferences, utilityServices){
		$scope.passingValues 				= 	{};
		$scope.isEdit 						= 	passingValues.isEdit;
		$scope.passingValues.title 			= 	passingValues.title;
		$scope.travel  						= 	{};
		$scope.travel.travelBO 				= 	passingValues.travelBO;
		$scope.reference					=	{};
		$scope.reference.travelIcon			=	getreferences.references.travelIcon;
		$scope.reference.travelStatus		=	getreferences.references.travelStatus;

		$scope.travelRef					=	{}
		$scope.travelRef.referencesDataMap 	= {
			"travelStatus" 	: getreferences.referencesData.travelStatus,
			"travelIcon" 	: getreferences.referencesData.travelIcon
		};
		$scope.saveTravel = function (record) {
			console.log("record", record);
			var pushData = {};
			pushData = record;
			var error =	aswaValidationService.isTravelValid(record);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				if($scope.isEdit){
					$rootScope.showSpinner();
					travelServices.updateTravelData(record).then(function(status){
						if(status==200){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message'])
							$modalInstance.close();
						}else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('error', error);
						}
					})
				}else{
					$rootScope.showSpinner();
					travelServices.pushTravelData(record).then(function(status){
							if(status==200){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.add.title'], Messages['modal.add.message'])
							$modalInstance.close();
						}
						else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('error', error);
						}
					})
				}// if add/edit is close here
			}// check error close here
		};

		$scope.cancel = function (frm) {
			var title 		= 	Messages["travel.edit.form.confirmation.title"];
			var message 	=	Messages["travel.edit.form.confirmation.body"];
			utilityServices.closeModelConfiguration($modalInstance,frm,title,message);
		//$modalInstance.dismiss('cancel');
		};
	}

	angular.module('aswa').controller('travelEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'passingValues', 'travelServices', 'aswaValidationService', 'storageServices', 'getreferences', 'utilityServices', travelEditController]);



})();
