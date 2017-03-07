(function(){

	function flatController($scope, $rootScope, flatBasicService, $modal, headerService, utilityServices, storageServices, getreferences, mainServices){
		$scope.reference				=	{};
		$rootScope.title 				= 	Messages['medicalbill.breadcrumb'];

		$scope.reference	=	getreferences.referencesData;
		$scope.bigTotalItems 			= 	"";

		$scope.getRef					=	{};
		$scope.getRef.referencesDataMap = {
			"genericStatusTwo" 	: 	getreferences.referencesData.genericStatusTwo,
			"paymentMode" 	: 	getreferences.referencesData.paymentMode
		};
		
		$scope.flatBO		=	{};
		
 		


// Pagination section is here.
	$scope.currentPage = 1;
 	$scope.limit= 10;
 	$scope.maxSize = 5;
 	
	$scope.pageChanged = function() {
    	$scope.getFlatStaticPaymentData();
  	};


		$scope.getFlatBasicDetails = function(){
			$rootScope.showSpinner();
			flatBasicService.getFlatBasicDetails().then(function(data){
				if(data.msg!=''){
					$scope.flatBO.flatBasicData=[];
					$scope.flatBO.flatBasicData = data;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		}
		
		$scope.getFlatBasicDetails();


		$scope.getFlatStaticPaymentData = function(){
			$rootScope.showSpinner();
			flatBasicService.getFlatStaticPaymentData($scope.limit,$scope.currentPage).then(function(data){
				if(data.msg!=''){
					$scope.flatBO.flatBasicPaymentData=[];
					$scope.flatBO.flatBasicPaymentData = data[0].item;
					$scope.totalItems = data[1].total.TOTAL;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		}
		
		$scope.getFlatStaticPaymentData();

		// add new entry
		// modal window class

		$scope.addFlatBasicPayment = function () {
			var config 							=	{};
				config.templateUrl 				= 	'../app/flat/flatstaticpayment.edit.html';
				config.controller 				= 	'flatstaticpaymentEditController';
				config.size						= 	'm';
				config.backdrop					= 	'static';
				config.passingValues 			= 	{};
				config.passingValues.title 		= 	Messages['addflatbasicpayment'];
				config.callback 				= 	function(status, item){
					if(status === 'success') {
						storageServices.remove("flatData_", "getFlatStaticPaymentData");
						$scope.getFlatStaticPaymentData();
						$scope.getGrandTotal();
						console.log("REACHED IN CALLBACK..");
					}
				}
				utilityServices.openConfigModal($modal, config);
		}

		$scope.editFlatBasicPayment = function (data) {
			var config 										=	{};
				config.templateUrl 							=	'../app/flat/flatstaticpayment.edit.html';
				config.controller 							=	'flatstaticpaymentEditController';
				config.size									= 	'm';
				config.backdrop								= 	'static';
				config.passingValues 						= 	{};
				config.passingValues.title 					= 	Messages['editflatbasicpayment'];
				config.passingValues.flatStaticPaymentBO 	= 	data;
				config.passingValues.isEdit 				= 	true;
				config.callback 							= 	function(status, item){
					if(status === 'success') {
						storageServices.remove("flatData_", "getFlatStaticPaymentData");
						$scope.getFlatStaticPaymentData();
						$scope.getGrandTotal();
						console.log("REACHED IN CALLBACK..");
					}
				}
				utilityServices.openConfigModal($modal, config);
		}
		
		//$scope.getGrandTotal();
		$scope.getGrandTotal = function(){
			$rootScope.showSpinner();
			mainServices.getGrandTotal().then(function(data){
				$scope.getGrandTotal.getGrandTotalBO = {};
					$scope.getGrandTotal.getGrandTotalBO.FLATBASIC_PAYMENT_TOTAL = data[0].FLATBASIC_PAYMENT_TOTAL;
					$rootScope.hideSpinner();
			});
		}
		$scope.getGrandTotal();
		$scope.refresh	=	function(){
			storageServices.remove("flatData_", "getFlatStaticPaymentData");
			storageServices.remove("flatData_", "getFlatBasicDetails");
			$scope.getFlatStaticPaymentData();
			$scope.getFlatBasicDetails();
		};
			$scope.selectedRow = null;  // initialize our variable to null
		  $scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
		     $scope.selectedRow = index;
		  };


	}

	angular.module('aswa').controller('flatController',['$scope', '$rootScope','flatBasicService', '$modal', 'headerService', 'utilityServices', 'storageServices', 'getreferences', 'mainServices', flatController]);
})();
