(function() {
  'use strict';

  angular
    .module('spa-demo.subjects')
    .component("sdOfferingSelector", {
      templateUrl: offeringSelectorTemplateUrl,
      controller: OfferingSelectorController,
      bindings: {
        authz: "<"
      },
    })
    .component("sdOfferingEditor", {
      templateUrl: offeringEditorTemplateUrl,
      controller: OfferingEditorController,
      bindings: {
        authz: "<"
      }      
    });

    offeringSelectorTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
    function offeringSelectorTemplateUrl(APP_CONFIG) {
      return APP_CONFIG.offering_selector_html;    
    }

    offeringEditorTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
    function offeringEditorTemplateUrl(APP_CONFIG) {
      return APP_CONFIG.offering_editor_html;
    }

    OfferingSelectorController.$inject = ["$scope",
                                          "$stateParams",
                                          "spa-demo.authz.Authz",
                                          "spa-demo.subjects.Offering"];
    function OfferingSelectorController($scope, $stateParams, Authz, Offering) {
      var vm = this;
      vm.$onInit = function() {
        console.log("OfferingSelectorController",$scope);
        $scope.$watch(function(){ return Authz.getAuthorizedUserId(); }, 
                      function(){ 
                        if (!$stateParams.id) { 
                          vm.items = Offering.query({ thing_id: $stateParams.thing_id }); 
                        }
                      });
      }
      return;
    }

    OfferingEditorController.$inject = ["$scope",
                                        "$state","$stateParams",
                                        "spa-demo.authz.Authz",
                                        "spa-demo.subjects.Offering"];
    function OfferingEditorController($scope, $state, $stateParams, Authz, Offering) {
      var vm = this;
      
      vm.create = create;
      vm.clear  = clear;
      vm.update  = update;
      vm.remove  = remove;

      vm.$onInit = function() {
        console.log("OfferingEditorController",$scope);
        $scope.$watch(function(){ return Authz.getAuthorizedUserId(); }, 
                      function(){ 
                        if ($stateParams.id) {
                          reload($stateParams.thing_id, $stateParams.id);
                        } else {
                          newResource($stateParams.thing_id);
                        }
                      });
      }

      return;

      function newResource(thing_id) {
        console.log("newResource()");
        vm.item = new Offering({thing_id: thing_id});
        // vm.imagesAuthz.newItem(vm.item);
        console.log('new Id', vm.item);
        return vm.item;
      }
  
      function reload(thing_id, offeringId) {
        var itemId = offeringId ? offeringId : vm.item.id;
        // console.log("re/loading image", itemId);
        vm.item = Offering.get({thing_id: thing_id, id:itemId});
        //vm.imagesAuthz.newItem(vm.item);
        vm.item.$promise.catch(handleError);
      }

      function clear() {
        newResource($stateParams.thing_id);
        $state.go(".", {id:null});
      }
  
      function create() {
        console.log('thing_id', vm.item);
        vm.item.$save({thing_id: vm.item.thing_id}).then(
          function(){
             $state.go(".", {id: vm.item.id}); 
          },
          handleError);
      }
  
      function update() {
        vm.item.errors = null;
        vm.item.$update({thing_id: vm.item.thing_id}).then(
          function(response){
            console.log("update complete", response); 
            $scope.offeringform.$setPristine();
            reload($stateParams.thing_id, $stateParams.id); 
          },
          handleError);
      }

      function remove() {
        vm.item.errors = null;
        vm.item.$delete({thing_id: vm.item.thing_id}).then(
          function(){ 
            console.log("remove complete", vm.item);          
            clear();
          },
          handleError);      
      }  
  
      function handleError(response) {
        console.log("error", response);
        if (response.data) {
          vm.item["errors"]=response.data.errors;          
        } 
        if (!vm.item.errors) {
          vm.item["errors"]={}
          vm.item["errors"]["full_messages"]=[response]; 
        }      
        $scope.offeringform.$setPristine();
      }
    }
})();