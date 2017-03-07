(function(){
	// Landlord with Rent...
	function llDetailsController($scope, $rootScope, $routeParams, rentService, getreferences, $modal, headerService, utilityServices){
		$scope.rentBO						=	{};
		$scope.reference					=	{};
		$rootScope.title 					= 	Messages['rent.breadcrumb'];
		$scope.pageHeader 					= 	"Landlord Details";

		$scope.reference.landlordStatus		=	getreferences.references.landlordStatus;
		$scope.reference.landlordName		=	getreferences.references.landlordNames;
		$scope.reference.filterStatus		=	getreferences.references.filterStatus;
		$scope.reference.rentStatus			=	getreferences.references.rentStatus;
		$scope.reference.rentReceipts		=	getreferences.references.rentReceipt;
		$scope.bigTotalItems				=	"";

		
		// get landlord data
		$scope.getLandLordDetails = function(){
			$rootScope.showSpinner();
			rentService.getLandLordDetails($routeParams.id).then(function(data){
				//console.log("$routeParams.id", $routeParams.id);
				$scope.rentBO.llData=[];
				$scope.rentBO.llData = data;
				$rootScope.hideSpinner();
			});
		}

		$scope.getLandLordDetails();

		$scope.getRentDataByll = function(){
			$rootScope.showSpinner();
			rentService.getRentDataByll($routeParams.id).then(function(data){
				$scope.rentBO.rentData=[];
				$scope.rentBO.rentData = data;
				$scope.bigTotalItems	=	data;
				// calculate total rent amount from the data.
				var rentAmtLength = data.length;
				$scope.totalAmount	=	0;
				angular.forEach(data, function(value, key){
					$scope.totalAmount = Number($scope.totalAmount)+ Number(value.amount);
				})
				console.log("Total Rent: ", $scope.totalAmount);
				$rootScope.hideSpinner();
			});
		}
		$scope.getRentDataByll();
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
				return $scope.pagesShown >= ($scope.bigTotalItems.length / $scope.maxSize);
			}

		}
		// to show more data based on the record
		$scope.hideMoreData	=	function(){
			$scope.pagesShown	=	1;
		}
		// close showMore functionality

	


	}

	angular.module('aswa').controller('llDetailsController',['$scope', '$rootScope', '$routeParams', 'rentService', 'getreferences', '$modal', 'headerService', 'utilityServices', llDetailsController]);
})();
