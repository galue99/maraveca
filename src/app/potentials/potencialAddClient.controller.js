/**
 * Created by edgar on 19/04/17.
 */
(function() {
  'use strict';

  angular
    .module('maraveca')
    .controller('PotentialAddClientController', PotentialAddClientController);

  /** @ngInject */
  function PotentialAddClientController($http, SERVER, $scope, $uibModalInstance, $log, user) {
    var vm = this;
    var token = localStorage.getItem("satellizer_token");

    $scope.user = user;
    $scope.ok = function () {
      $(".fakeloader").show();
      $http({
        method: 'PUT',
        url: SERVER + '/potential/' + user.id +'/convert-to-client/',
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
