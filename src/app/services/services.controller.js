/**
 * Created by edgar on 06/03/17.
 */
(function() {
  'use strict';

  angular
    .module('maraveca')
    .controller('ServiceController', ServiceController);

  /** @ngInject */
  function ServiceController($http, SERVER, $scope, $uibModal, sweet, $log) {
    var vm = this;

    var token = localStorage.getItem("satellizer_token");

    $(".fakeloader").show();

    vm.init = function () {
      $http({
        method: 'GET',
        url: SERVER + '/service/',
        headers: {
          'Authorization': 'Token ' + token
        }
      }).then(function successCallback(response) {
        $scope.services = response.data;
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
        controller: 'ServiceAddController',
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


    $scope.editClient = function (service) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ServiceEditController',
        size: 'lg',
        resolve: {
          service: function () {
            return service;
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

    $scope.deleteClient = function (service) {
      sweet.show({
        title: 'Confirmar',
        text: 'Desea Eliminar este Servicio?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Si, Eliminar!',
        closeOnConfirm: false,
        closeOnCancel: false
      }, function (isConfirm) {
        if (isConfirm) {
          sweet.show('Eliminado!', 'El Servicio ha sido eliminado.', 'success');
          $http({
            method: 'DELETE',
            url: SERVER + '/service/' + service.id + '/',
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
          sweet.show('Cancelar', 'El Servicio no ha sido eliminado :)', 'error');
        }
      });

    }
  }
})();
