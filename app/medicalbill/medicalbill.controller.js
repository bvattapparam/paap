(function(){

	function medicalbillController($scope, $rootScope, medicalbillService, $modal, headerService, utilityServices, storageServices, getreferences, mainServices){
		$scope.reference				=	{};
		$rootScope.title 				= 	Messages['medicalbill.breadcrumb'];

		$scope.reference.rentReceipts	=	getreferences.references.rentReceipt;
		$scope.bigTotalItems 			= 	"";

		$scope.getRef					=	{};
		$scope.getRef.referencesDataMap = {
			"medicalbillusers" 	: 	getreferences.referencesData.medicalbillUsers,
			"medicalbilltypes" 	: 	getreferences.referencesData.medicalbillTypes
		};
		
		$scope.medicalbillBO		=	{};
		$scope.searchParam			=	{}
		//$scope.searchParam.searchCriteria	= 	{};
		$scope.searchParam 	=	{
				"searchCriteria":{}
			};

		$scope.getMedicalbill = function(){
			$rootScope.showSpinner();
			medicalbillService.getMedicalbill($scope.searchParam.searchCriteria).then(function(data){
				if(data.msg!=''){
					$scope.medicalbillBO.medicalbillData=[];
					$scope.medicalbillBO.medicalbillData = data;
					$scope.currentTotal		=	0;
					angular.forEach(data, function(value,key){
						$scope.currentTotal = $scope.currentTotal + Number(value.amount);
					});
					$scope.bigTotalItems = data;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		}
		//$scope.getMedicalbill();


		// find the search criteria is in Cache then show that else fresh fetch.
		if(storageServices.get("medicalbill_","searchCriteria")){
			$scope.searchParam.searchCriteria 	=	storageServices.get("medicalbill_","searchCriteria");
			$scope.getMedicalbill();
		}else{
			$scope.getMedicalbill();
		}

		// find the grand total of Rent.
		$scope.getGrandTotal = function(){
			$rootScope.showSpinner();
			mainServices.getGrandTotal().then(function(data){
				$scope.getGrandTotal.getGrandTotalBO = {};
					$scope.getGrandTotal.getGrandTotalBO.totalAmt = data[0].medicalbillTotal;
					$rootScope.hideSpinner();
			});
		}
		$scope.getGrandTotal();

		// Seach medical bill

		$scope.searchMB 	= 	function(){
			storageServices.remove("medicalbill_", "searchCriteria");
			storageServices.set("medicalbill_", "searchCriteria");
			storageServices.remove("medicalbill_", "getMedicalbill");
			$scope.getMedicalbill();
		}

		$scope.clear	=	function(){
			$scope.searchParam.searchCriteria 		= 	{};
			$scope.medicalbillBO.medicalbillData 	= 	[];
			$scope.currentTotal						=	'';

		}

		// add new data
		$scope.addMedicalbill = function () {
			var config= {};
				config.templateUrl = '../app/medicalbill/medicalbill.edit.html';
				config.controller = 'medicalbillEditController';
				config.size		= 'md';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.isEdit = false;
				config.passingValues.title = Messages['addmedicalbill'];
				config.callback = function(status, item){
					if(status === 'success') {
						storageServices.remove("medicalbill_", "getMedicalbill");
						$scope.getMedicalbill();
					}
				}
				utilityServices.openConfigModal($modal, config);
		}
		$scope.editMedicalbill = function (data) {
			var config= {};
				config.templateUrl = '../app/medicalbill/medicalbill.edit.html';
				config.controller = 'medicalbillEditController';
				config.size		= 'm';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['editmedicalbill'];
				config.passingValues.medicalbillBO = data;
				config.passingValues.isEdit = true;
				config.callback = function(status, item){
					if(status === 'success') {
						storageServices.remove("medicalbill_", "getMedicalbill");
						$scope.getMedicalbill();
					}
				}
				utilityServices.openConfigModal($modal, config);
		}

		// for showMore functionality
		$scope.pagesShown	=	1; // default page
		$scope.maxSize	=	10; // how many records per page
		// for filter to show number of record
		$scope.dataLimit	=	function(){
			return $scope.maxSize * $scope.pagesShown;
		}
		// decide to whether to show / hide the showmore button default / based on data
		$scope.hasMoreDataToShow	=	function(){
			return $scope.pagesShown < ($scope.bigTotalItems.length / $scope.maxSize);
		}
		// to show more data based on the record
		$scope.showMoreData	=	function(){
			$scope.pagesShown	=	$scope.pagesShown+1;
		}

		// decide to whether to show / hide the showmore button default / based on data
		$scope.hasMoreDataToHide	=	function(){
			if($scope.bigTotalItems.length === 0 || $scope.bigTotalItems.length < $scope.maxSize){
				return false;
			}else{
				return $scope.pagesShown > ($scope.bigTotalItems.length / $scope.maxSize);
			}
		}
		// to show more data based on the record
		$scope.hideMoreData	=	function(){
			$scope.pagesShown	=	1;
		}
		// close showMore functionality

		
		//$scope.getGrandTotal();
		$scope.refresh	=	function(){
			storageServices.remove("medicalbill_", "getMedicalbill");
			storageServices.remove("dashboard_", "getGrandTotal");
			storageServices.remove("medicalbill_", "searchCriteria");
			$scope.getMedicalbill();
			$scope.getGrandTotal();
		}


	}

	angular.module('aswa').controller('medicalbillController',['$scope', '$rootScope','medicalbillService', '$modal', 'headerService', 'utilityServices', 'storageServices', 'getreferences', 'mainServices', medicalbillController]);
})();
