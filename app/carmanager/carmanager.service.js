(function(){
  function carmanagerService($http, $q, urlsettings, storageServices){

        //to push a new data
         this.getFuel = function(param,limit,currentpage){
           console.log("limit",limit, "current page", currentpage);
              var deferred = $q.defer();
                $http({
                  method  : "GET",
                  url     : urlsettings['carmanager.getFuel'] + "="+ param+"&offset="+(currentpage-1)*limit+"&limit="+limit,
                  headers :   {'Content-Type' : 'application/json'}
                }).success(function(data){
                  deferred.resolve(data);
                }).error(function(data){
                  deferred.reject(data);
                });
              
                return deferred.promise;
            };
             //to push a new data
         this.getService = function(param,limit,currentpage){
           console.log("limit",limit, "current page", currentpage);
              var deferred = $q.defer();
                $http({
                  method  : "GET",
                  url     : urlsettings['carmanager.getService'] + "="+ param+"&offset="+(currentpage-1)*limit+"&limit="+limit,
                  headers :   {'Content-Type' : 'application/json'}
                }).success(function(data){
                  deferred.resolve(data);
                }).error(function(data){
                  deferred.reject(data);
                });
              
                return deferred.promise;
            };

            // OTHERS
            this.getOthers = function(param,limit,currentpage){
              var deferred = $q.defer();
                $http({
                  method  : "GET",
                  url     : urlsettings['carmanager.getOthers'] + "="+ param+"&offset="+(currentpage-1)*limit+"&limit="+limit,
                  headers :   {'Content-Type' : 'application/json'}
                }).success(function(data){
                  deferred.resolve(data);
                }).error(function(data){
                  deferred.reject(data);
                });
              
                return deferred.promise;
            };
        // UPDATE  FUEL
        this.putFuelData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['carmanager.putFuelData'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
        // UPDATE SERVICE
        this.putServiceData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['carmanager.putServiceData'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
        // UPDATE  OTHERS
        this.putOthersData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['carmanager.putOthersData'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        // ADD NEW FUEL
         this.pushFuelData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['carmanager.pushFuelData'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
        // ADD NEW SERVICE
         this.pushServiceData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['carmanager.pushServiceData'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };
        // ADD NEW OTHERS
         this.pushOthersData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['carmanager.pushOthersData'],
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

         



  }
  angular.module("aswa").service('carmanagerService',['$http', '$q', 'urlsettings', 'storageServices', carmanagerService]);
})();
