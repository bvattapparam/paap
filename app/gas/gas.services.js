(function(){
  function gasService($http, $q, urlsettings, storageServices){

      // getting the GAS agency details

      this.getAgentDetails  =   function(){
          var deferred  = $q.defer();
          var cache     =   storageServices.get("agent_", "getAgentDetails");
          if(cache){
              deferred.resolve(cache);
          }else{
              $http({
                  method    :   "GET",
                  url       :   urlsettings['gas.getagent'],
                  headers   :   {'Content-Type' : 'application/json'}
              }).success(function(data){
                  storageServices.set("agent_", "getAgentDetails");
                  deferred.resolve(data);
              }).error(function (data) {
                  deferred.reject(data);
              });
          }
          return deferred.promise;
      }


        //get landlord list
        // this.getLandLord = function(){
        //     var deferred = $q.defer();
        //     var cache = storageServices.get("rent_", "getLandLord");
        //     if(cache){
        //       deferred.resolve(cache);
        //     }else{
        //       $http({
        //         method  : "GET",
        //         url     : urlsettings['rent.getll'],
        //         headers :   {'Content-Type' : 'application/json'}
        //       }).success(function(data){
        //         storageServices.set(data, "rent_", "getLandLord");
        //         deferred.resolve(data);
        //       }).error(function(data){
        //         deferred.reject(data);
        //       });
        //     }
        //       return deferred.promise;
        //   };



        // //update travel data//to push a new data
        // this.pushRentData = function(pushdata){
        //   var deferred = $q.defer();
        //   $http({
        //     method  : "POST",
        //     url     : urlsettings['rent.adddata'], //"../aswa-services/rent/update/?action=put_travel_data",
        //     data    : pushdata
        //   }).success(function(data, status, headers, config){
        //     deferred.resolve(status);
        //   }).error(function(data, status, headers, config){
        //     deferred.reject(data, status, headers, config);
        //   });
        //     return deferred.promise;
        // };
        //
        // //update travel data//to push a new data
        // this.updateRentData = function(putdata){
        //   var deferred = $q.defer();
        //   $http({
        //     method  : "POST",
        //     url     : urlsettings['rent.updatedata'], //"../aswa-services/rent/update/?action=put_travel_data",
        //     data    : putdata
        //   }).success(function(data, status, headers, config){
        //     deferred.resolve(status);
        //   }).error(function(data, status, headers, config){
        //     deferred.reject(data, status, headers, config);
        //   });
        //     return deferred.promise;
        // };

        // get rent data
        //update travel data//to push a new data
        this.getGasData = function(){
          console.log("REACHED");
            var deferred = $q.defer();
            var cache = storageServices.get("gas_", "getGasData");
            if(cache){
              deferred.resolve(cache);
            }else{
              $http({
                method  : "GET",
                url     : urlsettings['gas.getdata'],
                headers :   {'Content-Type' : 'application/json'}
              }).success(function(data){
              //  storageServices.set(data, "gas_", "getGasData");
                deferred.resolve(data);
              }).error(function(data){
                deferred.reject(data);
              });
            }
              return deferred.promise;
          };

       // return serviceReturn;

  }
  angular.module("aswa").service('gasService',['$http', '$q', 'urlsettings', 'storageServices', gasService]);
})();
