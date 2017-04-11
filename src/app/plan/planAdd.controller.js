/**
 * Created by edgar on 09/03/17.
 */

(function() {
  'use strict';

  angular
    .module('maraveca')
    .controller('PlanAddController', PlanAddController);

  /** @ngInject */
  function PlanAddController($http, SERVER, $scope, $uibModalInstance, $log) {
    var vm = this;
    var token = localStorage.getItem("satellizer_token");

    $scope.user = {};

    $scope.ok = function () {
      //$(".fakeloader").show();

      $scope.plan.monthly_type_plan = "dp";

      $http({
        method: 'POST',
        url: SERVER + '/plan/',
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
