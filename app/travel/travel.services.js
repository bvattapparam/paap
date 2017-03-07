(function(){
  // create factory for header service to retun object in deffered way
  function travelServices($rootScope, $q, $http, storageServices){

        // to get the user details
        this.getTravelData = function(limit,currentpage){
          console.log("limit",limit, "current page", currentpage);
          console.log("cal",(currentpage-1)*limit);
          var param = '1';
           console.log("here", + "="+ param +"&offset="+(currentpage-1)*limit+"&limit="+limit)
            var deferred = $q.defer();
            var cache = storageServices.get("travel_", "getTravelData");
            if(cache){
              deferred.resolve(cache);
            }else{
              var URLs = "../aswa-services/travel/index.php?action=get_travel_data&offset="+(currentpage-1)*limit+"&limit="+limit;
              $http({
                method  : "GET",
                url     : URLs,
                headers :   {'Content-Type' : 'application/json'}
              }).success(function(data){
                //storageServices.set(data, "travel_", "getTravelData");
                deferred.resolve(data);
              }).error(function(data){
                deferred.reject(data);
              });
            }
              return deferred.promise;
          };

        //to push a new data
        this.pushTravelData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : "../aswa-services/travel/add.php?action=push_travel_data",
            data    : pushdata
          }).success(function(data, status, headers, config){
            console.log("data", data);
						console.log("STATUS", status);
						console.log("headers", headers);
						console.log("config", config);
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        //update travel data//to push a new data
        this.updateTravelData = function(pushdata){
          var deferred = $q.defer();
          $http({
            method  : "POST",
            url     : "../aswa-services/travel/update/?action=put_travel_data",
            data    : pushdata
          }).success(function(data, status, headers, config){
            deferred.resolve(status);
          }).error(function(data, status, headers, config){
            deferred.reject(data, status, headers, config);
          });
            return deferred.promise;
        };

        //
        //   $http.post("../aswa-services/travel/add.php?action=push_travel_data", pushdata).
        //   then(function(successResponse){
        //     var data = successResponse.data;
        //     var status = successResponse.status;
        //     deferred.resolve(successResponse);
        //   },
        //     function(failureResponse){
        //
        //   });//
        //   return deferred.promise;
        // }

        //edit travel data


  }
  angular.module("aswa").service('travelServices',['$rootScope', '$q', '$http', 'storageServices', travelServices]);
})();
