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
      .state('home', {
        url: '/',
        templateUrl: 'app/note/notes.html',
        controller: 'NotesController',
      }).state("notes", {
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
        url: '/users',
        templateUrl: 'app/auth/users.html',
        controller: 'UsersController'
      }).state("user", {
        url: "/users/:id",
        templateUrl: "app/auth/show.html",
        controller: "UserController"
      }).state("user_edit", {
        url: "/users/:id/_edit",
        templateUrl: "app/auth/edit.html",
        controller: "UserController"
      }).state("user_new", {
        url: "/users_new",
        templateUrl: "app/auth/new.html",
        controller: "UserNewController"
      }).state('logout', {
        url: '/logout',
        templateUrl: 'app/auth/logout.html',
        controller: 'AuthController'
      }).state('logged_in', {
        url: '/logged_in',
        templateUrl: 'app/auth/logout.html',
        controller: 'AuthController'
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
