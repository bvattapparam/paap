(function(){

	function carManagerController($scope, $rootScope, carmanagerService, $modal, headerService, utilityServices, storageServices, getreferences, mainServices, aswaValidationService){
		$scope.reference				=	{};
		$rootScope.title 				= 	Messages['medicalbill.breadcrumb'];

		$scope.reference				=	getreferences.references;
		$scope.reference.car			=	getreferences.references.car;
		$scope.reference.carModuleType	= 	getreferences.references.carModuleType;
		$scope.bigTotalItems 			= 	"";

		$scope.getRef					=	{};
		$scope.getRef.referencesDataMap = {
			"genericStatusTwo" 		: 	getreferences.referencesData.genericStatusTwo,
			"car" 					: 	getreferences.referencesData.car
		};

		$scope.carmanagerBO			=	{};
		$scope.fuleShow				=	false;
		$scope.service 				=	false;
		$scope.others				=	false;

		// PAGINATION VARIABLE ASSIGN HERE.
		$scope.carmanagerBO.currentPage=1;
	 	$scope.limit= 10;
	 	$scope.maxSize = 5;

		$scope.showModule			=	function(showParam){
			$scope.service 	=	false;
			$scope.others	=	false;
			$scope.fuleShow = 	false;
			$scope.showModuleParam	=	showParam;
			var error 		=	aswaValidationService.isCarmanagerShowModule(showParam);
			if(error){
				$rootScope.showErrorBox('Error', error);
			}else{
				$scope.showModule_data(showParam);
				if(showParam.carModuleType == 1){
					$scope.service 	=	false;
					$scope.others	=	false;
					$scope.fuleShow = 	true;
				}else if(showParam.carModuleType == 2){
					$scope.fuleShow = 	false;
					$scope.others	=	false;
					$scope.service 	=	true;
				}else if(showParam.carModuleType == 3){
					$scope.fuleShow = 	false;
					$scope.service 	=	false;
					$scope.others	=	true;
				}
			}
			
		};

		$scope.showModule_data		=	function(showParam){
			if(showParam.carModuleType == 1){
				$scope.getFuel(showParam.car);
			}else if(showParam.carModuleType == 2){
				$scope.getService(showParam.car);
			}else if(showParam.carModuleType == 3){
				$scope.getOthers(showParam.car);
			}
		};
	

		$scope.pageChangedvalue = function() {
	    	$scope.getFuel($scope.showModuleParam.car);
	  	};

		$scope.getFuel = function(car){
			$rootScope.showSpinner();
			//travelServices.getTravelData($scope.limit,$scope.currentPage).then(function(data){
			carmanagerService.getFuel(car,$scope.limit,$scope.carmanagerBO.currentPage).then(function(data){
				if(data.msg!=''){
					$scope.carmanagerBO.fuleData=[];
					$scope.carmanagerBO.fuleData = data[0].item;
					$scope.totalItems = data[1].count.COUNT;
					$scope.totalAmount = data[2].total.TOTAL;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};

		$scope.getService = function(car){
			$rootScope.showSpinner();
			//travelServices.getTravelData($scope.limit,$scope.currentPage).then(function(data){
			carmanagerService.getService(car,$scope.limit,$scope.carmanagerBO.currentPage).then(function(data){
				if(data.msg!=''){
					$scope.carmanagerBO.serviceData=[];
					$scope.carmanagerBO.serviceData = data[0].item;
					$scope.totalItems = data[1].count.COUNT;
					$scope.totalAmount = data[2].total.TOTAL;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};
		$scope.getOthers = function(car){
			$rootScope.showSpinner();
			//travelServices.getTravelData($scope.limit,$scope.currentPage).then(function(data){
			carmanagerService.getOthers(car,$scope.limit,$scope.carmanagerBO.currentPage).then(function(data){
				if(data.msg!=''){
					$scope.carmanagerBO.othersData=[];
					$scope.carmanagerBO.othersData = data[0].item;
					$scope.totalItems = data[1].count.COUNT;
					$scope.totalAmount = data[2].total.TOTAL;
					$rootScope.hideSpinner();
				}else{
					$rootScope.hideSpinner();
					$rootScope.showErrorBox('Error', data.error);
				}
				
			});
		};
		
 		$scope.selectedRow = null;  // initialize our variable to null
		$scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
		    $scope.selectedRow = index;
		};

		$scope.addFuel = function (showModuleParam) {
			var config 							=	{};
				config.templateUrl 				= 	'../app/carmanager/edit/fuel/fuel.edit.html';
				config.controller 				= 	'fuelEditController';
				config.size						= 	'm';
				config.backdrop					= 	'static';
				config.passingValues 			= 	{};
				config.passingValues.title 		= 	Messages['addfuel'];
				config.car 						=	showModuleParam.car;
				config.carModuleType 			= 	showModuleParam.carModuleType;
				config.callback 				= 	function(status, item){
					if(status === 'success') {
						$scope.getFuel(config.car);
					}
				}
				utilityServices.openConfigModal($modal, config);
		};
		$scope.addService = function (showModuleParam) {
			var config 							=	{};
				config.templateUrl 				= 	'../app/carmanager/edit/service/service.edit.html';
				config.controller 				= 	'serviceEditController';
				config.size						= 	'm';
				config.backdrop					= 	'static';
				config.passingValues 			= 	{};
				config.passingValues.title 		= 	Messages['addservice'];
				config.car 						=	showModuleParam.car;
				config.carModuleType 			= 	showModuleParam.carModuleType;
				config.callback 				= 	function(status, item){
					if(status === 'success') {
						$scope.getService(config.car);
					}
				}
				utilityServices.openConfigModal($modal, config);
		};
		$scope.addOthers = function (showModuleParam) {
			var config 							=	{};
				config.templateUrl 				= 	'../app/carmanager/edit/others/others.edit.html';
				config.controller 				= 	'othersEditController';
				config.size						= 	'm';
				config.backdrop					= 	'static';
				config.passingValues 			= 	{};
				config.passingValues.title 		= 	Messages['addothers'];
				config.car 						=	showModuleParam.car;
				config.carModuleType 			= 	showModuleParam.carModuleType;
				config.callback 				= 	function(status, item){
					if(status === 'success') {
						$scope.getOthers(config.car);
					}
				}
				utilityServices.openConfigModal($modal, config);
		};

		$scope.editFuel = function (data,showModuleParam) {
			var config 										=	{};
				config.templateUrl 							=	'../app/carmanager/edit/fuel/fuel.edit.html';
				config.controller 							=	'fuelEditController';
				config.size									= 	'm';
				config.backdrop								= 	'static';
				config.passingValues 						= 	{};
				config.passingValues.title 					= 	Messages['editfuel'];
				config.passingValues.fuelBO 				= 	data;
				config.passingValues.isEdit 				= 	true;
				config.car 									=	showModuleParam.car;
				config.callback 							= 	function(status, item){
					if(status === 'success') {
						$scope.getFuel(config.car);
					}
				}
				utilityServices.openConfigModal($modal, config);
		};
		$scope.editService = function (data,showModuleParam) {
			var config 										=	{};
				config.templateUrl 							=	'../app/carmanager/edit/service/service.edit.html';
				config.controller 							=	'serviceEditController';
				config.size									= 	'm';
				config.backdrop								= 	'static';
				config.passingValues 						= 	{};
				config.passingValues.title 					= 	Messages['editservice'];
				config.passingValues.serviceBO 				= 	data;
				config.passingValues.isEdit 				= 	true;
				config.car 									=	showModuleParam.car;
				config.callback 							= 	function(status, item){
					if(status === 'success') {
						$scope.getService(config.car);
					}
				}
				utilityServices.openConfigModal($modal, config);
		};
		$scope.editOthers = function (data,showModuleParam) {
			var config 										=	{};
				config.templateUrl 							=	'../app/carmanager/edit/others/others.edit.html';
				config.controller 							=	'othersEditController';
				config.size									= 	'm';
				config.backdrop								= 	'static';
				config.passingValues 						= 	{};
				config.passingValues.title 					= 	Messages['editothers'];
				config.passingValues.othersBO 				= 	data;
				config.passingValues.isEdit 				= 	true;
				config.car 									=	showModuleParam.car;
				config.callback 							= 	function(status, item){
					if(status === 'success') {
						$scope.getOthers(config.car);
					}
				}
				utilityServices.openConfigModal($modal, config);
		};

		$scope.getGrandTotal = function(){
			$rootScope.showSpinner();
			mainServices.getGrandTotal().then(function(data){
				$scope.getGrandTotal.getGrandTotalBO = [];
					$scope.getGrandTotal.getGrandTotalBO = data;
					$rootScope.hideSpinner();
			});
		}
		$scope.getGrandTotal();
		

		$scope.refresh	=	function(){
			$scope.getFuel($scope.showModuleParam.car);
		}


	}

	angular.module('aswa').controller('carManagerController',['$scope', '$rootScope','carmanagerService', '$modal', 'headerService', 'utilityServices', 'storageServices', 'getreferences', 'mainServices', 'aswaValidationService', carManagerController]);
})();
