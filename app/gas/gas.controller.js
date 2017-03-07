(function(){

	function gasController($scope, $rootScope, $modal, gasService, utilityServices, storageServices, getreferences){
		$scope.gasBO						=	{};
		$scope.reference					=	{};
		$rootScope.title 					= 	Messages['gas.breadcrumb'];
		$scope.pageHeader 					= 	"Rent Details";

		$scope.reference.gasSubStatus		=	getreferences,references.gasSubStatus;
		$scope.reference.gasOrderStatus		=	getreferences.references.gasOrderStatus;
		$scope.bigTotalItems 				= 	"";

		

		//get agent data from the service
		$scope.getAgentDetails  =   function(){
            $rootScope.showSpinner();
            gasService.getAgentDetails().then(function (data) {
                $scope.gasBO.gasAgentDetails    =   [];
                $scope.gasBO.gasAgentDetails    =   data;
                $rootScope.hideSpinner();
                console.log('GAS AGENT :', 	$scope.gasBO.gasAgentDetails);
            })
        }
        $scope.getAgentDetails();

		// get rent data
		$scope.getGasData = function(){
			$rootScope.showSpinner();
			  console.log("before REACHED");
			gasService.getGasData().then(function(data){
				$scope.gasBO.gasData=[];
				$scope.gasBO.gasData = data;
				$scope.bigTotalItems = data;

				$rootScope.hideSpinner();
			});
		}
		$scope.getGasData();

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
						$scope.getRentData();
							console.log("REACHED IN CALLBACK ADD..");
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
						$scope.getRentData();
						console.log("REACHED IN CALLBACK..");
					}
				}
				utilityServices.openConfigModal($modal, config);
		}

		// for showMore functionality
		$scope.pagesShown	=	1; // default page
		$scope.maxSize	=	5; // how many records per page
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



	}

	angular.module('aswa').controller('gasController',['$scope', '$rootScope', '$modal', 'gasService', 'utilityServices', 'storageServices', 'getreferences', gasController]);
})();
