(function() {
  'use strict';

  angular
    .module('sinatraRuby', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr', 'flash', 'ng-admin']);



  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/all.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

   window.fbAsyncInit = function() {
    FB.init({
      appId      : '1670982223185902',
      channelUrl : 'auth/channel.html',
      xfbml      : true,
      version    : 'v2.5'
    });
  };
})();
