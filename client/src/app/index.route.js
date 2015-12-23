(function() {
  'use strict';

  angular
    .module('sinatraRuby')
    .config(routerConfig)
    .factory('Notes', NotesFactory)
    .factory('Comments', CommentsFactory)
    .factory('Users', UsersFactory)
    .factory('DataHolder', DataHolder);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("notes", {
        url: "/notes",
        templateUrl: "app/note/notes.html",
        controller: "NotesController"
      }).state("note", {
        url: "/notes/:id",
        templateUrl: "app/note/show.html",
        controller: "NoteShowController"
      }).state("note_edit", {
        url: "/notes/:id/_edit",
        templateUrl: "app/note/edit.html",
        controller: "NoteShowController"
      }).state("note_new", {
        url: "/notes_new",
        templateUrl: "app/note/new.html",
        controller: "NoteNewController"
      }).state("comments", {
        url: "/comments",
        templateUrl: "app/comment/comments.html",
        controller: "CommentsController"
      }).state("comment", {
        url: "/comments/:id",
        templateUrl: "app/comment/show.html",
        controller: "CommentShowController"
      }).state("comment_edit", {
        url: "/comments/:id/_edit",
        templateUrl: "app/comment/edit.html",
        controller: "CommentShowController"
      }).state("comment_new", {
        url: "/comments_new",
        templateUrl: "app/comment/new.html",
        controller: "CommentNewController"
      }).state('login', {
        url: '/login',
        templateUrl: 'app/auth/login.html',
        controller: 'AuthController'
      }).state('signup', {
        url: '/signup',
        templateUrl: 'app/auth/signup.html',
        controller: 'AuthController'
      }).state('users', {
        url: '/admin/users',
        templateUrl: 'app/admin/users.html',
        controller: 'UsersController'
      }).state("user", {
        url: "/admin/users/:id",
        templateUrl: "app/admin/show.html",
        controller: "UserController"
      }).state("user_edit", {
        url: "/admin/users/:id/_edit",
        templateUrl: "app/admin/edit.html",
        controller: "UserController"
      }).state("user_new", {
        url: "/admin/users_new",
        templateUrl: "app/admin/new.html",
        controller: "UserNewController"
      }).state('logout', {
        url: '/logout',
        templateUrl: 'app/auth/logout.html',
        controller: 'AuthController'
      }).state('logged_in', {
        url: '/logged_in',
        templateUrl: 'app/auth/logout.html',
        controller: 'AuthController'
      }).state('profile', {
        url: '/profile',
        templateUrl: 'app/auth/profile.html',
        controller: 'ProfileController'
      }).state('profile_edit', {
        url: '/profile/_edit',
        templateUrl: 'app/auth/edit.html',
        controller: 'ProfileController'
      }).state('chart', {
        url: '/chart',
        templateUrl: 'app/charts/chart.html',
        controller: 'ChartsController'
      }).state('chart2', {
        url: '/chart2',
        templateUrl: 'app/charts/chart_2.html',
        controller: 'Charts2Controller'
      }).state('home', {
         url: '/',
         templateUrl: 'app/note/notes_2.html',
         controller: 'Notes2Controller',
         controllerAs: 'n'
       });

    $urlRouterProvider.otherwise('/');
  }

  function NotesFactory($resource) {
    var Notes = $resource('/api/notes/:id', {id: '@id'},
      {
        'create':  { method: 'POST' ,params: {id: '@id'} },
        'show':    { method: 'GET'  },
        'update':  { method: 'PUT' ,params: {id: '@id'} },
        'destroy': { method: 'DELETE' },
      });
    return Notes;
  }

  function CommentsFactory($resource) {
    var Comments = $resource('/api/comments/:id', {id: '@id'},
      {
        'create':  { method: 'POST' ,params: {id: '@id'} },
        'show':    { method: 'GET'  },
        'update':  { method: 'PUT' ,params: {id: '@id'} },
        'destroy': { method: 'DELETE' },
      });
    return Comments;
  }

  function UsersFactory($resource) {
    var Users = $resource('/api/users/:id', {id: '@id'},
      {
        'create':  { method: 'POST' ,params: {id: '@id'}, url: '/api/users' },
        'show':    { method: 'GET'  },
        'update':  { method: 'PUT' ,params: {id: '@id'} },
        'destroy': { method: 'DELETE' },
        'login':   { method: 'POST', url: '/api/login'},
        'logout':   { method: 'GET', url: '/api/logout'},
        'signup':   { method: 'POST', url: '/api/signup'},
        'logged_in': { method: 'GET', url: '/api/logged_in' },
        'send_u': { method: 'POST', url: '/api/send' },
      });
    return Users;
  }

  function DataHolder($resource) {
    var value = {
      note: '',
      par: ''
    };
    return {
      setValue: function(noteId, parentId) {
        value.note = noteId;
        value.par = parentId;
      },
      getNote: function() {
        return value.note;
      },
      getPar: function() {
        return value.par;
      }
    }
  }

})();
