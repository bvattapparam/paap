(function(){

	function insuranceController($scope, $rootScope, insuranceService, $modal, headerService, utilityServices, storageServices, getreferences, mainServices){
		$scope.reference				=	{};
		$rootScope.title 				= 	Messages['insurance.breadcrumb'];

		$scope.reference	=	getreferences.referencesData;
		$scope.bigTotalItems 			= 	"";

		$scope.getRef					=	{};
		$scope.getRef.referencesDataMap = {
			"policyType" 	: 	getreferences.referencesData.insuranceType,
			"paymentMode" 	: 	getreferences.referencesData.paymentMode
		};
		
		$scope.insuranceMasterBO		=	{};
		
 			$scope.selectedRow = null;  // initialize our variable to null
		  $scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
		     $scope.selectedRow = index;
		  }
		$scope.getInsuranceMasterDetails = function(){
			$rootScope.showSpinner();
			insuranceService.getInsuranceMasterDetails().then(function(data){
				if(data.msg!=''){
					$scope.insuranceMasterBO.insuranceData=[];
					$scope.insuranceMasterBO.insuranceData = data;
					console.log("Service", data);
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		}
		
		$scope.getInsuranceMasterDetails();



		$scope.addInsurance = function () {
			var config 							=	{};
				config.templateUrl 				= 	'../app/insurance/insurance.edit.html';
				config.controller 				= 	'insuranceEditController';
				config.size						= 	'm';
				config.backdrop					= 	'static';
				config.passingValues 			= 	{};
				config.passingValues.title 		= 	Messages['addinsurance'];
				config.callback 				= 	function(status, item){
					if(status === 'success') {
						storageServices.remove("insuranceData_", "getInsuranceMasterDetails");
						$scope.getInsuranceMasterDetails();
						$scope.getGrandTotal();
					}
				}
				utilityServices.openConfigModal($modal, config);
		}

		$scope.editInsurance = function (data) {
			var config 										=	{};
				config.templateUrl 							=	'../app/insurance/insurance.edit.html';
				config.controller 							=	'insuranceEditController';
				config.size									= 	'm';
				config.backdrop								= 	'static';
				config.passingValues 						= 	{};
				config.passingValues.title 					= 	Messages['editinsurance'];
				config.passingValues.insuranceBO 			= 	data;
				config.passingValues.isEdit 				= 	true;
				config.callback 							= 	function(status, item){
					if(status === 'success') {
						storageServices.remove("insuranceData_", "getInsuranceMasterDetails");
						$scope.getInsuranceMasterDetails();
						$scope.getGrandTotal();
					}
				}
				utilityServices.openConfigModal($modal, config);
		}
		
		//$scope.getGrandTotal();
		$scope.getGrandTotal = function(){
			$rootScope.showSpinner();
			mainServices.getGrandTotal().then(function(data){
				$scope.getGrandTotal.getGrandTotalBO = {};
					$scope.getGrandTotal.getGrandTotalBO.INSURANCE_POLICY_TOTAL = data[0].INSURANCE_POLICY_TOTAL;
					console.log("Total:", $scope.getGrandTotal.getGrandTotalBO);
					$rootScope.hideSpinner();
			});
		}
		$scope.getGrandTotal();
		$scope.refresh	=	function(){
			storageServices.remove("insuranceData_", "getInsuranceMasterDetails");
			$scope.getInsuranceMasterDetails();
			$scope.getGrandTotal();
		}


	}

	angular.module('aswa').controller('insuranceController',['$scope', '$rootScope','insuranceService', '$modal', 'headerService', 'utilityServices', 'storageServices', 'getreferences', 'mainServices', insuranceController]);
})();
