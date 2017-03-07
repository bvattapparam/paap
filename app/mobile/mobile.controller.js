(function(){

	function mobileController($scope, $rootScope, mobileService, $modal, headerService, utilityServices, storageServices, getreferences, mainServices){
		$scope.reference		=	{};
		$rootScope.title 		= 	Messages['rent.breadcrumb'];
		$scope.bigTotalItems 	= 	"";
		$scope.mobileBO			=	{};

		$scope.rentRef			=	{};
		$scope.rentRef.referencesDataMap = {
			"landlordStatus" 	: 	getreferences.referencesData.landlordStatus,
			"landlordName" 		: 	getreferences.referencesData.landlordName,
			"rentStatus" 		: 	getreferences.referencesData.rentStatus,
			"rentReceipts" 		: 	getreferences.referencesData.rentReceipt
		};


		$scope.getMobile = function(){
			$rootScope.showSpinner();
			mobileService.getMobile().then(function(data){
				if(data.msg!=''){
					$scope.mobileBO.mobileData=[];
					$scope.mobileBO.mobileData = data;
					//console.log('RENT DATA :', 	$scope.mobileBO.mobileData);
					$scope.bigTotalItems = data;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		}
		$scope.getMobile();

		// add new data
		$scope.addMobile = function () {
			var config= {};
				config.templateUrl = '../app/mobile/mobile.edit.html';
				config.controller = 'mobileEditController';
				config.size		= 'md';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.isEdit = false;
				config.passingValues.title = Messages['addmobile'];
				config.callback = function(status, item){
					if(status === 'success') {
						storageServices.remove("mobile_", "getMobile");
						$scope.getMobile();
							//console.log("REACHED IN CALLBACK ADD..", item);
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
						//console.log("REACHED IN CALLBACK..", item);
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
		//$scope.getGrandTotal();
		$scope.refresh	=	function(){
			console.log("refresh");
			storageServices.remove("mobile_", "getMobile");
			$scope.getMobile();
		}


	}

	angular.module('aswa').controller('mobileController',['$scope', '$rootScope','mobileService', '$modal', 'headerService', 'utilityServices', 'storageServices', 'getreferences', 'mainServices', mobileController]);
})();
