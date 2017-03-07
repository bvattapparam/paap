(function(){
  function medicalbillService($http, $q, urlsettings, storageServices){

      
          //get mobile details
          this.getMedicalbill = function(param){

              var deferred = $q.defer();
              var cache = storageServices.get("medicalbill_", "getMedicalbill");
              if(cache){
                deferred.resolve(cache);
              }else{
                $http({
                  method  : "POST",
                  url     : urlsettings['medicalbill.getmedicalbill'],
                  data    :   param
                }).success(function(data){
                  storageServices.set(data, "medicalbill_", "getMedicalbill");
                  deferred.resolve(data);
                }).error(function(data){
                  deferred.reject(data);
                });
              }
                return deferred.promise;
            };

           

       
        //update travel data//to push a new data
        this.pushMedicalbillData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['medicalbill.adddata'], //"../aswa-services/rent/update/?action=put_travel_data",
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        //update travel data//to push a new data
        this.updateMedicalbillData = function(putdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['medicalbill.updatedata'], //"../aswa-services/rent/update/?action=put_travel_data",
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
  angular.module("aswa").service('medicalbillService',['$http', '$q', 'urlsettings', 'storageServices', medicalbillService]);
})();
