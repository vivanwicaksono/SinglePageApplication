var app = angular.module('myApp', []);

//service for Posts
app.factory("PostService", function ($http) {
    var iUserID = '0'

    function setPost(pUserID) {
        iUserID = pUserID;
    }

    function getPost() {
        var sUrl = "https://jsonplaceholder.typicode.com/posts";
        if (iUserID != "0") {
            sUrl = "https://jsonplaceholder.typicode.com/posts?userId=" + iUserID;
        }
        var promises = $http({
            method: 'get',
            url: sUrl,
        });
        promises.then(function (response) {
            return response.data;
        });
        return promises;
    }

    return {
        setPost: setPost,
        getPost: getPost
    };
});

//service for albums
app.factory("AlbumService", function ($http) {
    var iUserID = '0'

    function setAlbum(pUserID) {
        iUserID = pUserID;
    }

    function getAlbum() {
        var sUrl = "https://jsonplaceholder.typicode.com/albums";
        if (iUserID != "0") {
            sUrl = "https://jsonplaceholder.typicode.com/albums?userId=" + iUserID;
        }
        var promises = $http({
            method: 'get',
            url: sUrl,
        });
        promises.then(function (response) {
            return response.data;
        });
        return promises;
    }

    return {
        setAlbum: setAlbum,
        getAlbum: getAlbum
    };
});

app.run(function ($rootScope) {
    $rootScope.show = 'user';
});

app.controller('userCtrl', function ($scope, $rootScope, $http, PostService, AlbumService) {
    $http.get("https://jsonplaceholder.typicode.com/users")
    .then(function (response) {
        $scope.users = response.data;
    });
    $scope.viewPost = function (pUserID) {
        PostService.setPost(pUserID);
        $rootScope.show = 'post';
    }
    $scope.viewAlbum = function (pUserID) {
        AlbumService.setAlbum(pUserID);
        $rootScope.show = 'album';
    }
});

app.controller('postCtrl', function ($scope, $rootScope, $http, PostService) {
    $scope.$watch('show', function () {
        $scope.posts = [];
        PostService.getPost().then(function (value) {
            $scope.posts = value.data;
        });
    });
});

app.controller('albumCtrl', function ($scope, $rootScope, $http, AlbumService) {
    $scope.$watch('show', function () {
        $scope.albums = [];
        AlbumService.getAlbum().then(function (value) {
            $scope.albums = value.data;
        });
    });
});

