(function(){
  function mobileService($http, $q, urlsettings, storageServices){

      
          //get mobile details
          this.getMobile = function(param){

              var deferred = $q.defer();
              var cache = storageServices.get("mobile_" + param, "getMobile");
              if(cache){
                deferred.resolve(cache);
              }else{
                $http({
                  method  : "GET",
                  url     : urlsettings['mobile.getmobile'],
                  headers :   {'Content-Type' : 'application/json'}
                }).success(function(data){
                  storageServices.set(data, "mobile_" + param, "getMobile");
                  console.log("data:", data);
                  deferred.resolve(data);
                }).error(function(data){
                  deferred.reject(data);
                });
              }
                return deferred.promise;
            };

           

       
        //update travel data//to push a new data
        this.pushRentData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['rent.adddata'], //"../aswa-services/rent/update/?action=put_travel_data",
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        //update travel data//to push a new data
        this.updateRentData = function(putdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['rent.updatedata'], //"../aswa-services/rent/update/?action=put_travel_data",
            data    : putdata
          }).success(function(data, status, headers, config){
            //console.log("DATA,..", data);
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
       // return serviceReturn;

  }
  angular.module("aswa").service('mobileService',['$http', '$q', 'urlsettings', 'storageServices', mobileService]);
})();
