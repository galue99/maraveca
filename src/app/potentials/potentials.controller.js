/**
 * Created by edgar on 06/03/17.
 */
(function() {
  'use strict';

  angular
    .module('maraveca')
    .controller('PotentialsController', PotentialsController);

  /** @ngInject */
  function PotentialsController($http, SERVER, $scope, $uibModal, $log, sweet) {
    var vm = this;

    var token = localStorage.getItem("satellizer_token");
    $(".fakeloader").show();

    vm.init = function () {
      $http({
        method: 'GET',
        url: SERVER + '/potential/',
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


    $scope.animationsEnabled = true;

    $scope.open = function (size) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'PotentialsAddController',
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


    $scope.editClient = function (user) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'PotentialsEditController',
        size: 'lg',
        resolve: {
          user: function () {
            return user;
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


    $scope.AddClient = function (user) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContentAdd.html',
        controller: 'PotentialAddClientController',
        size: 'lg',
        resolve: {
          user: function () {
            return user;
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
        text: 'Desea Eliminar este Usuario?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Si, Eliminar!',
        closeOnConfirm: false,
        closeOnCancel: false
      }, function(isConfirm) {
        if (isConfirm) {
          sweet.show('Eliminado!', 'El usuario ha sido eliminado.', 'success');
          $(".fakeloader").show();
          $http({
            method: 'DELETE',
            url: SERVER + '/potential/' + user.id +'/',
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
        }else{
          sweet.show('Cancelar', 'Usuario no ha sido eliminado :)', 'error');
        }
      });

    };


  }
})();
