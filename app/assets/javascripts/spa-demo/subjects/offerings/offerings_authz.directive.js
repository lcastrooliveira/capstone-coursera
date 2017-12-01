(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .directive("sdOfferingsAuthz", OfferingsAuthzDirective);

  OfferingsAuthzDirective.$inject = [];

  function OfferingsAuthzDirective() {
    var directive = {
        bindToController: true,
        controller: OfferingsAuthzController,
        controllerAs: "vm",
        restrict: "A",
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
      console.log("OfferingsAuthzDirective", scope);
    }
  }

  OfferingsAuthzController.$inject = ["$scope",
                                      "spa-demo.subjects.OfferingsAuthz"];
  function OfferingsAuthzController($scope, OfferingsAuthz) {
    var vm = this;
    vm.authz={};
    vm.newItem=newItem;

    activate();
    return;
    //////////
    function activate() {
      vm.newItem(null);
    }

    function newItem(item) {
      OfferingsAuthz.getAuthorizedUser().then(
        function(user){ authzUserItem(item, user); },
        function(user){ authzUserItem(item, user); });
    }

    function authzUserItem(item, user) {
      console.log("new Item/Authz", item, user);
      vm.authz.canCreate = OfferingsAuthz.canCreate();
      vm.authz.authenticated = OfferingsAuthz.isAuthenticated();
      vm.authz.canQuery      = OfferingsAuthz.canQuery();
      if (item && item.$promise) {
        vm.authz.canUpdate     = false;
        vm.authz.canDelete     = false;
        vm.authz.canGetDetails = false;
        item.$promise.then(function(){ checkAccess(item); });
      } else {
        checkAccess(item)
      }
    }

    function checkAccess(item) {
      console.log("THE ITEM", item);
      vm.authz.canUpdate     = OfferingsAuthz.canUpdate(item);
      vm.authz.canDelete     = OfferingsAuthz.canDelete(item);
      vm.authz.canGetDetails = OfferingsAuthz.canGetDetails(item);
      console.log("checkAccess", item, vm.authz);
    }
  }
})();