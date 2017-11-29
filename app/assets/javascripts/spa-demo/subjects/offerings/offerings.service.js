(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .factory("spa-demo.subjects.Offering", OfferingFactory);

  OfferingFactory.$inject = ["$resource", "spa-demo.config.APP_CONFIG"];
  function OfferingFactory($resource, APP_CONFIG) {
    return $resource(APP_CONFIG.server_url + "/api/things/:thing_id/offerings/:id", 
    { 
      id: '@id',
      thing_id: '@thing_id'
    },
    { update: {method:"PUT"} });
  }

})();