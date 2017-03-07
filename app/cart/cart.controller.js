(function(){

	function cartController($scope, $rootScope, cartService, $modal, headerService, utilityServices, storageServices, getreferences, mainServices){
		
		$rootScope.title = Messages['cart.breadcrumb'];
		$scope.bigTotalItems = "";

		//console.log('BO', $scope.rent.rentBO);
		$scope.reference					=	{};
		$scope.reference.cartStatus			=	getreferences.references.cartStatus;
		$scope.reference.cart				=	getreferences.references.cart;
		$scope.getRef	={};
		$scope.getRef.referencesDataMap = {
			"cart" 	: 	getreferences.referencesData.cart,
			"cartStatus" 	: 	getreferences.referencesData.cartStatus
		};


		$scope.cartBO		=	{};
		$scope.searchParam			=	{}
		//$scope.searchParam.searchCriteria	= 	{};
		$scope.searchParam 	=	{
				"searchCriteria":{}
			};

		$scope.getCart = function(){
			$rootScope.showSpinner();
			cartService.getCart($scope.searchParam.searchCriteria).then(function(data){
				if(data.msg!=''){
					$scope.cartBO.cartData=[];
					$scope.cartBO.cartData = data;
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
		if(storageServices.get("cart_","searchCriteria")){
			$scope.searchParam.searchCriteria 	=	storageServices.get("cart_","searchCriteria");
			$scope.getCart();
		}else{
			$scope.getCart();
		}

		

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
		$scope.addCart = function () {
			var config= {};
				config.templateUrl = '../app/cart/cart.edit.html';
				config.controller = 'cartEditController';
				config.size		= 'md';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.isEdit = false;
				config.passingValues.title = Messages['addcart'];
				config.callback = function(status, item){
					if(status === 'success') {
						storageServices.remove("cart_", "getCart");
						$scope.getCart();
					}
				}
				utilityServices.openConfigModal($modal, config);
		}
		$scope.editCart = function (data) {
			var config= {};
				config.templateUrl = '../app/cart/cart.edit.html';
				config.controller = 'cartEditController';
				config.size		= 'm';
				config.backdrop	= 'static';
				config.passingValues = {};
				config.passingValues.title = Messages['editcart'];
				config.passingValues.cartBO = data;
				config.passingValues.isEdit = true;
				config.callback = function(status, item){
					if(status === 'success') {
						storageServices.remove("cart_", "getCart");
						$scope.getCart();
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
			
			storageServices.remove("cart_", "getCart");
			storageServices.remove("cart_", "searchCriteria");
			$scope.getCart();
		}


	}

	angular.module('aswa').controller('cartController',['$scope', '$rootScope','cartService', '$modal', 'headerService', 'utilityServices', 'storageServices', 'getreferences', 'mainServices', cartController]);
})();
