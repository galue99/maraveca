/**
 * Created by edgar on 07/03/17.
 */
(function() {
  'use strict';

  angular
    .module('maraveca')
    .controller('PotentialsAddController', PotentialsAddController);

  /** @ngInject */
  function PotentialsAddController($http, SERVER, $scope, $uibModalInstance, $log) {
    var vm = this;
    var token = localStorage.getItem("satellizer_token");

    $scope.user = {};

    $scope.ok = function () {
      $(".fakeloader").show();
      $http({
        method: 'POST',
        url: SERVER + '/potential/',
        data: $scope.user,
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
