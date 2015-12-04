(function() {
  'use strict';

  angular
    .module('sinatraRuby')
    .config(routerConfig)
    .factory('Notes', NotesFactory);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
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

})();
