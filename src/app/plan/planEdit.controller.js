/**
 * Created by edgar on 09/03/17.
 */
(function() {
  'use strict';

  angular
    .module('maraveca')
    .controller('PlanEditController', PlanEditController);

  /** @ngInject */
  function PlanEditController($http, SERVER, $scope, $uibModalInstance, $log, plan) {
    var vm = this;
    var token = localStorage.getItem("satellizer_token");


    $scope.plan = plan;
    $scope.plan.price = parseInt(plan.price);

    $scope.ok = function () {
      $(".fakeloader").show();
      $http({
        method: 'PUT',
        url: SERVER + '/plan/' + plan.id + '/',
        data: $scope.plan,
        headers: {
          'Authorization': 'Token ' + token
        }
      }).then(function successCallback(response) {
        $uibModalInstance.close();

        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        $(".fakeloader").fadeOut();
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };


  }
})();
