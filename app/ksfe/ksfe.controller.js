(function(){

	function ksfeController($scope, $rootScope, $filter, utilityServices, $modal, ksfeServices, getreferences, storageServices){
	$scope.travel	={};
	$scope.reference	=	{};
	$scope.bigTotalItems	=	'';

	$scope.isEdit = false;
	$scope.ksfeRef	={};
	$scope.ksfeRef.referencesDataMap = {
		"genericStatus" 	: getreferences.referencesData.genericStatus
	};


	$rootScope.title = Messages['ksfe.breadcrumb'];
	$scope.pageHeader = "KSFE Details";

	$scope.getKsfeDetails = function(){
		$rootScope.showSpinner();
		ksfeServices.getKsfeDetails().then(function(data){
		$scope.ksfeBO	=	{};
		$scope.ksfeBO.ksfeData	=	data;
		$scope.bigTotalItems = data;
		$rootScope.hideSpinner();
		});
	}
	$scope.getKsfeDetails();

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



		// zone to add new items
		// add new BR entry
		$scope.addData = function (size) {
			var config= {};
				config.templateUrl = '../app/ksfe/ksfe.edit.html';
				config.controller = 'ksfeEditController';
				config.size		= 'm';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['addbr'];
				config.callback = function(status, item){
					if(status === 'success') {
						storageServices.remove("ksfe_", "getKsfeDetails");
						$scope.getKsfeDetails();
					}
				}
				utilityServices.openConfigModal($modal, config);
		}

		// edit BR entry
		$scope.editBR = function (data) {
			var config= {};
				config.templateUrl = '../app/dashboard/containers/edit/br.edit.html';
				config.controller = 'brEditController';
				config.size		= 'm';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['editbr'];
				config.passingValues.brBO = data;
				config.passingValues.isEdit = true;
				config.callback = function(status, item){
					if(status === 'success') {
						storageServices.remove("dashboard_", "getBR");
						$scope.getBR();
					}
				}
				utilityServices.openConfigModal($modal, config);
		}

		// recall the services to refresh the data - manual refresh is done here

		$scope.refresh	=	function(){
			storageServices.remove("ksfe_", "getKsfeDetails");
			$scope.getKsfeDetails();
		}

}
	angular.module('aswa').controller('ksfeController',['$scope', '$rootScope', '$filter', 'utilityServices', '$modal', 'ksfeServices', 'getreferences', 'storageServices', ksfeController]);
})();
