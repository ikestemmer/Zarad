var app = angular.module('zarad', [
  'ionic',
  'ionic-material',
  'onezone-datepicker',
  'zarad.user',
  'zarad.auth',
  'zarad.admin',
  'zarad.club',
  'zarad.home',
  'youtube-embed',
  'zarad.tournament',
  'zarad.services',
  'ngCordova',
  'zarad.index',
  'ui.router',
  'zarad.videos'
	]);

app.config(function($sceDelegateProvider) 
{
    $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
})

app.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
   
   $httpProvider.defaults.headers.common = {};
   $httpProvider.defaults.headers.put = {};
   $httpProvider.defaults.headers.patch = {};

    $stateProvider
        .state('/', {
        	url: '/',
  		    templateUrl: 'js/templates/home.html',
  		    controller:'AuthController'
        })
        .state('adminmain',{
          url:'/AdminMain',
          templateUrl:'js/templates/AdminMain.html',
          controller:'AdminController'
        })
        .state('adminaction',{
          cache:false,
          url:'/AdminAction',
          templateUrl: 'js/templates/AdminAction.html',
          controller: 'AdminController'
        })
        .state('AllTournament',{
            cache : false,
            url:'/AllTournament',
            templateUrl:'js/templates/AllTournament.html',
            controller:'TournamentController'
        }) 
        .state('userProfile',{
            cache : false,
            url : '/userprofile',
            templateUrl : 'js/templates/User/userProfile.html',
            absract : true
        })
        .state('userProfile.home', {
          url: "/home",
          views: {
            'home-tab': {
              templateUrl: 'js/templates/User/profile-home.html',
              controller : 'UserHomeController'
            }
          }
        })
        .state('userProfile.profile',{
          url: "/profile",
          views: {
            'profile-tab': {
              templateUrl: 'js/templates/User/profile-page.html',
              controller: 'UserProfileController'
            }
          }
        })
        .state('userProfile.videos',{
          url : '/videos',
          views : {
            'video-tab' : {
              templateUrl : 'js/templates/User/profile-video.html',
              controller : 'VideosController'
            }
          }
        })
        .state('club',{
          cache:false,
          url:'/club',
          templateUrl: 'js/templates/club/club.html',
          controller: 'clubController'
        })
        .state('club.users', {
          url: '/allUsers',
          views: {
            'users-tab': {
              templateUrl: 'js/templates/club/allUsers.html',
              controller: 'clubController'
            }
          }
        })
        .state('club.profile', {
          url: '/clubProfile',
          views: {
            'profile-tab': {
              templateUrl: 'js/templates/club/clubProfile.html',
              controller: 'clubController'
            }
          }
        })
         .state('club.tournament', {
          url: '/allTournament',
          views: {
            'tournament-tab': {
              templateUrl: 'js/templates/AllTournament.html',
              controller: 'TournamentController'
            }
          }
        })
        .state('adduser',{
          url:'/addUser',
          templateUrl: 'js/templates/club/addUser.html',
          controller: 'clubController'
        })    
        $urlRouterProvider.otherwise('/');
  // $httpProvider.interceptors.push('AttachTokens');
  $httpProvider.defaults.transformRequest = function(data) {        
      if (data === undefined) { return data; } 
      return $.param(data);
  };
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
})
.run(function($rootScope, $state, $location , Auth, $ionicPlatform){
 $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  $rootScope.$on('$locationChangeStart', function (evt, next, current) {
    if(next === 'http://localhost:8100/#/AdminAction' || next === 'http://zarad.herokuapp.com/#/AdminAction' ){
      if(Auth.checkUser() !== 'admin'){
        $location.path('/')
      }
    }
  })  
})
.factory('AttachTokens',function ($window){
    var attach = {
        request: function(object){
            var jwt = $window.localStorage.getItem('com.zarad');
            
            if(jwt){
                object.headers['x-access-token']= jwt;
            }
            return object;
        }
    };
    return attach;
});