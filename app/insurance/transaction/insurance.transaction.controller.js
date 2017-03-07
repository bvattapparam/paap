(function(){

	function insuranceTransactionController($scope, $rootScope, $routeParams, insuranceService, $modal, headerService, utilityServices, storageServices, getreferences, mainServices){
		$scope.reference				=	{};
		$rootScope.title 				= 	Messages['insurance.breadcrumb'];
		$scope.reference				=	getreferences.referencesData;
		$scope.insuranceTrnxBO			=	{};
		$scope.getRef					=	{};

		$scope.policyno					=	$routeParams.policyno;

		$scope.getRef.referencesDataMap = {
			"policyType" 	: 	getreferences.referencesData.insuranceType,
			"paymentMode" 	: 	getreferences.referencesData.paymentMode
		};
		
		
		$scope.selectedRow = null;  // initialize our variable to null
		 	$scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
		    	$scope.selectedRow = index;
		};

		$scope.getInsuranceTrnxDetails = function(){
			$rootScope.showSpinner();
			insuranceService.getInsuranceTrnxDetails($routeParams.policyno).then(function(data){
				if(data.msg!=''){
					$scope.insuranceTrnxBO.insuranceTrnxData=[];
					$scope.insuranceTrnxBO.insuranceTrnxData = data[0].item;
					$scope.totalItems = data[1].count.COUNT;
					$scope.totalAmount = data[2].total.TOTAL;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
			});
		};
		$scope.getInsuranceTrnxDetails();

		// PAAP WINDOW OPEN ON CLICK THE ROW...
		// PARAM: USED TO PASS THE VALUES, 
		// WINDOWMODE: USED TO DECIDE WHAT TYPE OF FUNCTION NEED TO CALL..
		// WANT TO ADD ANYTHING NEW AS ARGUMENT, THEN PLEASE APPEND LAST...
		$scope.openPaapWindow	=	function($event,param,windowMode){
			$event.stopPropagation();
			if(windowMode === 'edit'){
				$scope.editInsuranceTrnx(param);
			}else if(windowMode === 'delete'){
				$scope.showInfoBox('Info', 'generalinfoone', 'sm');
			}
		};

		$scope.addInsuranceTrnx = function () {
			var config 						=	{};
			config.templateUrl 				= 	'../app/insurance/transaction/insurance.transaction.edit.html';
			config.controller 				= 	'insuranceTrnxEditController';
			config.size						= 	'lg';
			config.backdrop					= 	'static';
			config.passingValues 			= 	{};
			config.passingValues.title 		= 	Messages['addinsurancetransaction'];
			config.callback 				= 	function(status, item){
				if(status === 'success') {
					// CLEARED STORAGE IN ADD METHOD...
					$scope.getInsuranceTrnxDetails();
				}
			}
			utilityServices.openConfigModal($modal, config);
		};

		$scope.editInsuranceTrnx = function (data) {
			var config 									=	{};
			config.templateUrl 							= 	'../app/insurance/transaction/insurance.transaction.edit.html';
			config.controller 							= 	'insuranceTrnxEditController';
			config.size									= 	'lg';
			config.backdrop								= 	'static';
			config.passingValues 						= 	{};
			config.passingValues.title 					= 	Messages['editinsurance'];
			config.passingValues.insuranceTrnxBO 		= 	data;
			config.passingValues.isEdit 				= 	true;
			config.callback 							= 	function(status, item){
				if(status === 'success') {
					// CLEARED STORAGE IN EDIT METHOD...
					$scope.getInsuranceTrnxDetails();
				}
			}
			utilityServices.openConfigModal($modal, config);
		};
		
		$scope.refresh	=	function(){
			storageServices.remove("insuranceData_" + $scope.policyno, "getInsuranceTrnxDetails");
			$scope.getInsuranceTrnxDetails();
		}


	}

	angular.module('aswa').controller('insuranceTransactionController',['$scope', '$rootScope', '$routeParams', 'insuranceService', '$modal', 'headerService', 'utilityServices', 'storageServices', 'getreferences', 'mainServices', insuranceTransactionController]);
})();
