(function(){
  function cartService($http, $q, urlsettings, storageServices){

      
          //get mobile details
          this.getCart = function(param){

              var deferred = $q.defer();
              var cache = storageServices.get("cart_", "getCart");
              if(cache){
                deferred.resolve(cache);
              }else{
                $http({
                  method  : "POST",
                  url     : urlsettings['cart.getcart'],
                  data    :   param
                }).success(function(data){
                  storageServices.set(data, "cart_", "getCart");
                  deferred.resolve(data);
                }).error(function(data){
                  deferred.reject(data);
                });
              }
                return deferred.promise;
            };

           

       
        //update travel data//to push a new data
        this.pushCartData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['cart.adddata'], //"../aswa-services/rent/update/?action=put_travel_data",
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        //update travel data//to push a new data
        this.putCartData = function(putdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['cart.updatedata'], //"../aswa-services/rent/update/?action=put_travel_data",
            data    : putdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
       // return serviceReturn;

  }
  angular.module("aswa").service('cartService',['$http', '$q', 'urlsettings', 'storageServices', cartService]);
})();
