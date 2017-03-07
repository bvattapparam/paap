(function(){
  function flatBasicService($http, $q, urlsettings, storageServices){

      
          //get mobile details
          this.getFlatBasicDetails = function(limit,currentpage){
              var deferred = $q.defer();
              var cache = storageServices.get("flatData_", "getFlatBasicDetails");
              if(cache){
                deferred.resolve(cache);
              }else{
                $http({
                  method  : "GET",
                  url     : urlsettings['flatData.getflatbasicdetails'],
                //  url     : urlsettings['carmanager.getFuel'] + "="+ param+"&offset="+(currentpage-1)*limit+"&limit="+limit,
                  headers   :   {'Content-Type' : 'application/json'}
                }).success(function(data){
                  //storageServices.set(data, "flatData_", "getFlatBasicDetails");
                  deferred.resolve(data);
                }).error(function(data){
                  deferred.reject(data);
                });
              }
                return deferred.promise;
            };

        //to push a new data
        this.pushFlatStaticPaymentData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['flatData.pushFlatStaticPaymentData'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
        //to push a new data
        this.putFlatStaticPaymentData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['flatData.putFlatStaticPaymentData'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

         //get mobile details
          this.getFlatStaticPaymentData = function(limit,currentpage){
              var deferred = $q.defer();
              
                $http({
                  method  : "GET",
                  url     : urlsettings['flatData.getFlatStaticPaymentData']+"?offset="+(currentpage-1)*limit+"&limit="+limit,
                  headers   :   {'Content-Type' : 'application/json'}
                }).success(function(data){
                  //storageServices.set(data, "flatData_", "getFlatStaticPaymentData");
                  deferred.resolve(data);
                }).error(function(data){
                  deferred.reject(data);
                });
              
                return deferred.promise;
            };




  }
  angular.module("aswa").service('flatBasicService',['$http', '$q', 'urlsettings', 'storageServices', flatBasicService]);
})();
