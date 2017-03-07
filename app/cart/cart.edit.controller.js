(function(){

	cartEditController = function($scope, $q, $rootScope, $filter, $modalInstance, passingValues, cartService, aswaValidationService, getreferences){
		$scope.passingValues = {};
		$scope.isEdit = passingValues.isEdit;
		$scope.passingValues.title = passingValues.title;
		//console.log('passingValues', $scope.passingValues.title);
		$scope.cart  = {};
		$scope.cart.cartBO = passingValues.cartBO;

		//console.log('BO', $scope.rent.rentBO);
		$scope.reference					=	{};
		$scope.reference.cartStatus			=	getreferences.references.cartStatus;
		$scope.reference.cart				=	getreferences.references.cart;

		
		$scope.saveCart = function () {
			var pushData = {};
			pushData	=	$scope.cart.cartBO;
			console.log("DATA: ", pushData);
			var error =	aswaValidationService.isCartValid($scope.cart.cartBO);
			//console.log("EEEE", error);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				if($scope.isEdit){
					$rootScope.showSpinner();
					cartService.putCartData(pushData).then(function(data){
						if(data!=''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.update.title'], Messages['modal.update.message']);
							$modalInstance.close(pushData);
						}else{
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('Error', data.error);
						}
					})
				}else{
					$rootScope.showSpinner();
					cartService.pushCartData(pushData).then(function(data){
						if(data.msg!=''){
							$rootScope.hideSpinner();
							$rootScope.addnotification(Messages['modal.add.title'], Messages['modal.add.message']);
							$modalInstance.close(pushData);
						}
						else {
							$rootScope.hideSpinner();
							$rootScope.showErrorBox('Error', data.error);
						}
					})
				}// if add/edit is close here
			}// check error close here
		};

		$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
		};



	}

	angular.module('aswa').controller('cartEditController', ['$scope', '$q', '$rootScope', '$filter', '$modalInstance', 'passingValues', 'cartService', 'aswaValidationService', 'getreferences', cartEditController]);



})();
