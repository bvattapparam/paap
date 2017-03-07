(function(){

	function travelController($scope, $rootScope, $modal, $filter, travelServices, utilityServices, storageServices, getreferences,$http){

		$scope.travel	={};
		$scope.reference					=	{};
		$scope.reference.travelIcon			=	getreferences.references.travelIcon;
		$scope.reference.travelStatus		=	getreferences.references.travelStatus;
		$scope.reference.filterStatus		=	getreferences.references.filterStatus;
		$scope.bigTotalItems	=	'';

		$scope.isEdit = false;
		$scope.travelRef	={};
		$scope.travelRef.referencesDataMap = {
			"travelStatus" 	: getreferences.referencesData.travelStatus,
			"travelIcon" 	: getreferences.referencesData.travelIcon,
			"filterStatus" 	: getreferences.referencesData.filterStatus
		};

		  $scope.selectedRow = null;  // initialize our variable to null
		  $scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
		     $scope.selectedRow = index;
		  }

		 
		$rootScope.title = Messages['travel.breadcrumb'];
		$scope.pageHeader = "Travel Details";


// Pagination section is here.
	$scope.currentPage = 1;
 	$scope.limit= 10;
 	$scope.maxSize = 5;
 	
	$scope.pageChanged = function() {
    	$scope.getTravelDetails();
  	};

		$scope.getTravelDetails = function(){
			$rootScope.showSpinner();
			travelServices.getTravelData($scope.limit,$scope.currentPage).then(function(data){
			$scope.travelData=[];
			$scope.travelData = data[0].item;
			$scope.totalItems = data[1].total.TOTAL;
			$rootScope.hideSpinner();
			});
		}
		$scope.getTravelDetails();
			



		// modal window class

		$scope.open = function (size) {
			var config= {};
				config.templateUrl = '../app/travel/travel.edit.html';
				config.controller = 'travelEditController';
				config.size		= 'm';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['addtravel'];
				config.callback = function(status, item){
					if(status === 'success') {
						storageServices.remove("travel_", "getTravelData");
						$scope.getTravelDetails();
						console.log("REACHED IN CALLBACK..");
					}
				}
				utilityServices.openConfigModal($modal, config);
		}
		$scope.editTravel = function (data) {
			var config= {};
				config.templateUrl = '../app/travel/travel.edit.html';
				config.controller = 'travelEditController';
				config.size		= 'm';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['edittravel'];
				config.passingValues.travelBO = data;
				config.passingValues.isEdit = true;
				config.callback = function(status, item){
					if(status === 'success') {
						storageServices.remove("travel_", "getTravelData");
						$scope.getTravelDetails();
						console.log("REACHED IN CALLBACK..");
					}
				}
				utilityServices.openConfigModal($modal, config);
		}

		$scope.refresh	=	function(){
			console.log("refresh");
			storageServices.remove("travel_", "getTravelData");
			$scope.getTravelDetails();
		}

		


	}

	angular.module('aswa').controller('travelController',['$scope', '$rootScope', '$modal', '$filter', 'travelServices', 'utilityServices', 'storageServices', 'getreferences', '$http',travelController]);
})();
