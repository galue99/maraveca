/**
 * Created by edgar on 06/03/17.
 */
(function() {
  'use strict';

  angular
    .module('maraveca')
    .controller('PlanController', PlanController);

  /** @ngInject */
  function PlanController($http, SERVER, $scope, $uibModal, sweet, $log) {
    var vm = this;

    var token = localStorage.getItem("satellizer_token");

    $(".fakeloader").show();

    vm.init = function () {
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

    vm.init();


    $scope.animationsEnabled = true;

    $scope.open = function (size) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'PlanAddController',
        size: size
      });

      modalInstance.result.then(function (selectedItem) {
        vm.init();
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };


    $scope.editClient = function (plan) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'PlanEditController',
        size: 'lg',
        resolve: {
          plan: function () {
            return plan;
          }
        }

      });

      modalInstance.result.then(function (selectedItem) {
        vm.init();
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.deleteClient = function (user) {
      sweet.show({
        title: 'Confirmar',
        text: 'Desea Eliminar este Plan?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Si, Eliminar!',
        closeOnConfirm: false,
        closeOnCancel: false
      }, function (isConfirm) {
        if (isConfirm) {
          sweet.show('Eliminado!', 'El Plan ha sido eliminado.', 'success');
          $http({
            method: 'DELETE',
            url: SERVER + '/plan/' + user.id + '/',
            headers: {
              'Authorization': 'Token ' + token
            }
          }).then(function successCallback(response) {
            vm.init();
            // this callback will be called asynchronously
            // when the response is available
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $log.info(response);
          });
        } else {
          sweet.show('Cancelar', 'El Plan no ha sido eliminado :)', 'error');
        }
      });

    }
  }
})();
