(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .factory("spa-demo.subjects.OfferingsAuthz", OfferingsAuthzFactory);

  OfferingsAuthzFactory.$inject = ["spa-demo.authz.Authz",
                                   "spa-demo.authz.BasePolicy"];
  function OfferingsAuthzFactory(Authz, BasePolicy) {
    function OfferingsAuthz() {
      BasePolicy.call(this, "Offering");
    }

    //start with base class prototype definitions
    OfferingsAuthz.prototype = Object.create(BasePolicy.prototype);
    OfferingsAuthz.constructor = OfferingsAuthz;

    //override and add additional methods
    OfferingsAuthz.prototype.canCreate=function() {
      // console.log("ItemsAuthz.canCreate");
      return Authz.isOriginator('Thing');
    };

    OfferingsAuthz.prototype.canQuery=function() {
      //console.log("ItemsAuthz.canCreate");
      return Authz.isAuthenticated();
    };

    OfferingsAuthz.prototype.canGetDetails = function(item) {
      //console.log("BasePolicy.canGetDetails", item);
      if (!item) {
        return false;
      } else {
        return !item.id ? this.canCreate() : (Authz.isMember(item) || Authz.isOrganizer('Thing') || Authz.isAdmin());
      }
    };

    return new OfferingsAuthz();
  }
})();