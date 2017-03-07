(function(){
  function insuranceService($http, $q, urlsettings, storageServices){

      
          //get mobile details
          this.getInsuranceMasterDetails = function(){
              var deferred = $q.defer();
              var cache = storageServices.get("insuranceData_", "getInsuranceMasterDetails");
              if(cache){
                deferred.resolve(cache);
              }else{
                $http({
                  method  : "GET",
                  url     : urlsettings['insuranceData.getInsuranceMasterDetails'],
                  headers   :   {'Content-Type' : 'application/json'}
                }).success(function(data){
                  storageServices.set(data, "insuranceData_", "getInsuranceMasterDetails");
                  deferred.resolve(data);
                }).error(function(data){
                  deferred.reject(data);
                });
              }
                return deferred.promise;
            };

        //to push a new data
        this.pushInsuranceData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['insuranceData.pushInsuranceData'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
        //to push a new data
        this.putInsuranceData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['insuranceData.putInsuranceData'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

         // GET INSURANCE  TRANSACTION DATA
          this.getInsuranceTrnxDetails = function(param){
              var deferred = $q.defer();
              var cache = storageServices.get("insuranceData_" + param, "getInsuranceTrnxDetails");
              if(cache){
                deferred.resolve(cache);
              }else{
                $http({
                  method  : "GET",
                  url     : urlsettings['insuranceData.getInsuranceTrnxDetails'] + "=" + param,
                  headers   :   {'Content-Type' : 'application/json'}
                }).success(function(data){
                  storageServices.set(data, "insuranceData_"+ param, "getInsuranceTrnxDetails");
                  deferred.resolve(data);
                }).error(function(data){
                  deferred.reject(data);
                });
              }
                return deferred.promise;
            };
          
        // ADD NEW TRANSACTION DATA
        this.pushInsuranceTrnxData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['insuranceData.pushInsuranceTrnxData'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        // UPDATE INSURANCE TRANSACTIONS...
         this.putInsuranceTrnxData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['insuranceData.putInsuranceTrnxData'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        // GET INSURANCE POLICIES
          this.getInsurancePolicy = function(){
              var deferred = $q.defer();
              var cache = storageServices.get("insuranceData_", "getInsurancePolicy");
              if(cache){
                deferred.resolve(cache);
              }else{
                $http({
                  method  : "GET",
                  url     : urlsettings['insuranceData.getInsurancePolicy'],
                  headers   :   {'Content-Type' : 'application/json'}
                }).success(function(data){
                  storageServices.set(data, "insuranceData_", "getInsurancePolicy");
                  deferred.resolve(data);
                }).error(function(data){
                  deferred.reject(data);
                });
              }
                return deferred.promise;
            };



  }
  angular.module("aswa").service('insuranceService',['$http', '$q', 'urlsettings', 'storageServices', insuranceService]);
})();
