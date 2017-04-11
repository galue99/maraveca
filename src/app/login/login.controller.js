/**
 * Created by edgar on 03/03/17.
 */

(function() {
  'use strict';

  angular
    .module('maraveca')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($scope, $log, $auth, $state) {
    var vm = this;

    vm.user = {};

    $(".fakeloader").fadeOut();


    window.localStorage.removeItem("satellizer_token");

    vm.submitLogin = function(){

      $auth.login({
        email: vm.user.email,
        password: vm.user.password
      })
        .then(function(response) {
          $state.go('home.home');
          // Redirect user here after a successful log in.
        })
        .catch(function(response) {
          $log.error(response);
          // Handle errors here, such as displaying a notification
          // for invalid email and/or password.
        });


    };


    $(function() {

      $('#form-validation').validate({
        submit: {
          settings: {
            inputContainer: '.form-group',
            errorListClass: 'form-control-error',
            errorClass: 'has-danger'
          },
          callback: {
            onBeforeSubmit: function (node) {
              vm.submitLogin();

              //myBeforeSubmitFunction(':D', ':)', node);
            },
            onSubmit: function (node) {
              //node.submit();
            }
          }
        },
        debug: true
      });

    });


  }
})();
