/**
 * Created by edgar on 06/03/17.
 */
(function() {
  'use strict';

  angular
    .module('maraveca')
    .controller('TemplateController', TemplateController);

  /** @ngInject */
  function TemplateController($scope, $auth, $state) {
    var vm = this;


    $scope.logout = function(){
      $auth.logout();
      $state.go('login');
    };


    $(function(){
      /////////////////////////////////////////////////////////////////////////////
      // Slide toggle menu items on click

      $('.left-menu .left-menu-list-submenu > a').on('click', function(){
        var accessDenied = $('body').hasClass('menu-top') && $(window).width() > 768;

        if (!accessDenied) {
          var that = $(this).parent(),
            opened = $('.left-menu .left-menu-list-opened');

          if (!that.hasClass('left-menu-list-opened') && !that.parent().closest('.left-menu-list-submenu').length)
            opened.removeClass('left-menu-list-opened').find('> ul').slideUp(200);

          that.toggleClass('left-menu-list-opened').find('> ul').slideToggle(200);
        }
      });


      /////////////////////////////////////////////////////////////////////////////
      // Main menu scripts




      /////////////////////////////////////////////////////////////////////////////
      // Toggle menu on viewport < 768px

      $('.left-menu-toggle').on('click', function(){
        $(this).toggleClass('active');
        $('nav.left-menu').toggleClass('left-menu-showed');
        $('.main-backdrop').toggleClass('main-backdrop-showed')
      });


      /////////////////////////////////////////////////////////////////////////////
      // Hide menu and backdrop on backdrop click

      $('.main-backdrop').on('click', function(){
        $('.left-menu-toggle').removeClass('active');
        $('nav.left-menu').removeClass('left-menu-showed');
        $('.main-backdrop').removeClass('main-backdrop-showed')
      });


      $('nav.left-menu a.left-menu-link').on('click', function(){
        if (!$(this).parent().hasClass('left-menu-list-submenu')) {
          $('.left-menu-toggle').removeClass('active');
          $('nav.left-menu').removeClass('left-menu-showed');
          $('.main-backdrop').removeClass('main-backdrop-showed')
        }
      });

    });




  }
})();
