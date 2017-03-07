(function(){
  function rentService($http, $q, urlsettings, storageServices){

        //get landlord list
        this.getLandLord = function(){
            var deferred = $q.defer();
            var cache = storageServices.get("rent_", "getLandLord");
            if(cache){
              deferred.resolve(cache);
            }else{
              $http({
                method  : "GET",
                url     : urlsettings['rent.getll'],
                headers :   {'Content-Type' : 'application/json'}
              }).success(function(data){
                storageServices.set(data, "rent_", "getLandLord");
                deferred.resolve(data);
              }).error(function(data){
                deferred.reject(data);
              });
            }
              return deferred.promise;
          };

          //get landlord details
          this.getLandLordDetails = function(param){
              var deferred = $q.defer();
              var cache = storageServices.get("rent_" + param, "getLandLordDetails");
              if(cache){
                deferred.resolve(cache);
              }else{
                $http({
                  method  : "GET",
                  url     : urlsettings['rent.getlandlorddetails'] + "="+ param,
                  headers :   {'Content-Type' : 'application/json'}
                }).success(function(data){
                  storageServices.set(data, "rent_" + param, "getLandLordDetails");
                  deferred.resolve(data);
                }).error(function(data){
                  deferred.reject(data);
                });
              }
                return deferred.promise;
            };

            this.getRentDataByll = function(param){
                var deferred = $q.defer();
                var cache = storageServices.get("rent_" + param, "getRentDataByll");
                if(cache){
                  deferred.resolve(cache);
                }else{
                  $http({
                    method  : "GET",
                    url     : urlsettings['rent.getrentdatabyll'] + "="+ param,
                    headers :   {'Content-Type' : 'application/json'}
                  }).success(function(data){
                    storageServices.set(data, "rent_" + param, "getRentDataByll");
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

        // get rent data
        //update travel data//to push a new data
        this.getRentData = function(limit,currentpage){
          console.log("limit",limit, "current page", currentpage);
            var deferred = $q.defer();
            var cache = storageServices.get("rent_", "getRentData");
            if(cache){
              deferred.resolve(cache);
            }else{
              $http({
                method  : "GET",
                url     : urlsettings['rent.getdata'] + "&offset="+(currentpage-1)*limit+"&limit="+limit,
                headers :   {'Content-Type' : 'application/json'}
              }).success(function(data){
                //storageServices.set(data, "rent_", "getRentData");
                deferred.resolve(data);
              }).error(function(data){
                deferred.reject(data);
              });
            }
              return deferred.promise;
          };

          // update landlord
          this.addLandlord = function(pushdata){
         // console.log("putdata", putdata);
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['landlord.adddata'], 
            data    : pushdata
          }).success(function(data, status, headers, config){
            console.log("DATA Server side", data, "msssg", data.msg);
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            //console.log("DATA,", data);
            deferred.reject(data);
          });
            return deferred.promise;
        };
          //update travel data//to push a new data
        this.updateLandlord = function(putdata){
         // console.log("putdata", putdata);
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : urlsettings['landlord.updatedata'], 
            data    : putdata
          }).success(function(data, status, headers, config){
            //console.log("DATA Server side", data, "msssg", data.msg);
            deferred.resolve(data);
          }).error(function(data, status, headers, config){
            //console.log("DATA,", data);
            deferred.reject(data);
          });
            return deferred.promise;
        };

       // return serviceReturn;

  }
  angular.module("aswa").service('rentService',['$http', '$q', 'urlsettings', 'storageServices', rentService]);
})();
