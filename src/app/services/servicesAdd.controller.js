/**
 * Created by edgar on 09/03/17.
 */

(function() {
  'use strict';

  angular
    .module('maraveca')
    .controller('ServiceAddController', ServiceAddController);

  /** @ngInject */
  function ServiceAddController($http, SERVER, $scope, $uibModalInstance, $log) {
    var vm = this;
    var token = localStorage.getItem("satellizer_token");

    $scope.user = {};

    vm.plan = function () {
      $http({
        method: 'GET',
        url: SERVER + '/plan/',
        headers: {
          'Authorization': 'Token ' + token
        }
      }).then(function successCallback(response) {
        $scope.plans = response.data;
        $(".fakeloader").fadeOut();
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    };

    vm.plan();


    vm.init = function () {
      $http({
        method: 'GET',
        url: SERVER + '/client/',
        headers: {
          'Authorization': 'Token ' + token
        }
      }).then(function successCallback(response) {
        $scope.users = response.data;
        $(".fakeloader").fadeOut();
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    };

    vm.init();




    $scope.ok = function () {
      //$(".fakeloader").show();
      $scope.services.additional_id = 1;
      $scope.services.cut_days = 20;
      $scope.services.cut_method = 20;
      $scope.services.install_type = 'in';
      $scope.services.monthly_type = 'ot';
      $http({
        method: 'POST',
        url: SERVER + '/service/',
        data: $scope.services,
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






    $(document).ready(function () {
      console.log(1);
      $("#client").validate({
        rules: {
          nombre: {
            required: true,
            minlength: 8
          },
          pass: "required"
        },
        messages: {
          nombre: {
            required: "Please provide your Login",
            minlength: "Your Login must be at least 8 characters"
          },
          pass: "Please provide your password"
        }
      });
    });


  }
})();
