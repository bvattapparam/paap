(function(){

	function rentController($scope, $rootScope,rentService, $modal, headerService, utilityServices, storageServices, getreferences, mainServices){
		$scope.rentBO						=	{};
		$scope.reference					=	{};
		$rootScope.title 					= 	Messages['rent.breadcrumb'];
		$scope.pageHeader 					= 	"Rent Details";

		$scope.reference.landlordStatus		=	getreferences.references.landlordStatus;
		$scope.reference.landlordName		=	getreferences.references.landlordNames;
		$scope.reference.rentStatus			=	getreferences.references.rentStatus;
		$scope.reference.rentReceipts		=	getreferences.references.rentReceipt;
		$scope.bigTotalItems 				= 	"";

		$scope.rentRef						=	{};
		$scope.rentRef.referencesDataMap = {
			"landlordStatus" 	: 	getreferences.referencesData.landlordStatus,
			"landlordName" 		: 	getreferences.referencesData.landlordName,
			"rentStatus" 		: 	getreferences.referencesData.rentStatus,
			"rentReceipts" 		: 	getreferences.referencesData.rentReceipt
		};

		// Pagination section is here.
		$scope.currentPage = 1;
	 	$scope.limit= 30;
	 	$scope.maxSize = 5;

		$scope.pageChanged = function() {
	    	$scope.getRentData();
	  	};

		$scope.getRentData = function(){
			$rootScope.showSpinner();
			rentService.getRentData($scope.limit,$scope.currentPage).then(function(data){
				$scope.rentBO.rentData=[];
				$scope.rentBO.rentData = data[0].item;
				$scope.totalItems = data[1].total.TOTAL;
				console.log('RENT DATA :', 	data);
				$rootScope.hideSpinner();
			});
		}
		$scope.getRentData();

		// add new data
		$scope.addRent = function () {
			var config= {};
				config.templateUrl = '../app/rent/rent.edit.html';
				config.controller = 'rentEditController';
				config.size		= 'md';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.isEdit = false;
				config.passingValues.title = Messages['addrent'];
				config.callback = function(status, item){
					if(status === 'success') {
						storageServices.remove("rent_", "getRentData");
						storageServices.remove("rent_" + item.llcode, "getRentDataByll");
						$scope.getRentData();
						$scope.getGrandTotal();
					}
				}
				utilityServices.openConfigModal($modal, config);
		}
		$scope.editRent = function (data) {
			var config= {};
				config.templateUrl = '../app/rent/rent.edit.html';
				config.controller = 'rentEditController';
				config.size		= 'm';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['editrent'];
				config.passingValues.rentBO = data;
				config.passingValues.isEdit = true;
				config.callback = function(status, item){
					if(status === 'success') {
						storageServices.remove("rent_", "getRentData");
						storageServices.remove("rent_"+ data.llcode, "getRentDataByll");
						$scope.getRentData();
						$scope.getGrandTotal();
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

		// find the grand total of Rent.
		$scope.getGrandTotal = function(){
			$rootScope.showSpinner();
			mainServices.getGrandTotal().then(function(data){
				$scope.getGrandTotal.getGrandTotalBO = {};
					$scope.getGrandTotal.getGrandTotalBO.rent = data[0].rentTotal;
					$rootScope.hideSpinner();
			});
		}
		$scope.getGrandTotal();
		$scope.refresh	=	function(){
			console.log("refresh");
			storageServices.remove("rent_", "getRentData");
			$scope.getRentData();
		}


	}

	angular.module('aswa').controller('rentController',['$scope', '$rootScope','rentService', '$modal', 'headerService', 'utilityServices', 'storageServices', 'getreferences', 'mainServices', rentController]);
})();
