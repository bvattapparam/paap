(function(){
  function ksfeServices($http, $q, urlsettings, storageServices){

          this.getKsfeDetails = function(){
              var deferred = $q.defer();
              var cache = storageServices.get("ksfe_", "getKsfeDetails");
              if(cache){
                deferred.resolve(cache);
              }else{
                $http({
                  method  : "GET",
                  url     : urlsettings['dashboard.getksfedetails'],
                  headers :   {'Content-Type' : 'application/json'}
                }).success(function(data){
                  storageServices.set(data, "ksfe_", "getKsfeDetails");
                  deferred.resolve(data);
                }).error(function(data){
                  deferred.reject(data);
                });
              }
                return deferred.promise;
            };



  }
  angular.module("aswa").service('ksfeServices',['$http', '$q', 'urlsettings', 'storageServices', ksfeServices]);
})();
