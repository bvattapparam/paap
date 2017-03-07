(function(){

    angular.module("aswa").config(function($routeProvider){
        $routeProvider
        .when('/dashboard',{
            templateUrl : 'dashboard/dashboard.html',
            controller : 'dashboardController'
        })
        .when('/travel',{
            templateUrl : 'travel/travel.html',
            controller : 'travelController'
        })
        .when('/rent',{
            templateUrl : 'rent/rent.html',
            controller : 'rentController'
        })
        .when('/ll-details/:id',{
            templateUrl : 'rent/ll/details/view/rent.ll.details.view.details.html',
            controller : 'llDetailsController'
        })
        .when('/ll',{
            templateUrl : 'rent/ll/details/view/rent.ll.details.view.html',
            controller : 'rentLLController'
        })
        .when('/rent-details/:id',{
            templateUrl : 'rent/rent.html',
            controller : 'rentController'
        })
        .when('/login',{redirectTo : 'http://localhost/paap/app-login/#/login'})
        .when('/gas',{
            templateUrl : 'gas/gas.html',
            controller : 'gasController'
        })
        .when('/ksfe',{
            templateUrl : 'ksfe/ksfe.html',
            controller : 'ksfeController'
        })
        .when('/mobile',{
            templateUrl : 'mobile/mobile.html',
            controller : 'mobileController'
        })
        .when('/medicalbill',{
            templateUrl : 'medicalbill/medicalbill.html',
            controller : 'medicalbillController'
        })
        .when('/cart',{
            templateUrl : 'cart/cart.html',
            controller : 'cartController'
        })
        .when('/money',{
            templateUrl : 'money/money.html',
            controller : 'dashboardController'
        })
        .when('/logout',{
            templateUrl : 'logout.html',
            controller : 'logoutController'
        })
        .when('/flat',{
            templateUrl : 'flat/flat.html',
            controller : 'flatController'
        })
        .when('/insurance',{
            templateUrl : 'insurance/insurance.html',
            controller : 'insuranceController'
        })
        .when('/carmanager',{
            templateUrl : 'carmanager/carmanager.html',
            controller : 'carManagerController'
        }) 
        .when('/insurance-transaction/:policyno',{
            templateUrl : 'insurance/transaction/insurance.transaction.html',
            controller : 'insuranceTransactionController'
        })
        .otherwise({redirectTo : '/dashboard'});
    })
})();
