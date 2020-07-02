var app = angular.module('myApp', []);

//service for Posts
app.factory("PostService", function ($http) {
    var iUserID = '0'

    function setPost(pUserID) {
        iUserID = pUserID;
    }

    function getPost() {
        sUrl = "https://jsonplaceholder.typicode.com/posts?userId=" + iUserID;
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
        sUrl = "https://jsonplaceholder.typicode.com/albums?userId=" + iUserID;

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

//service for photos
app.factory("PhotoService", function ($http) {
    var iAlbumID = '0'

    function setPhoto(pAlbumID) {
        iAlbumID = pAlbumID;
    }

    function getPhoto() {
        var sUrl = "";
        sUrl = "https://jsonplaceholder.typicode.com/photos?albumId=" + iAlbumID;

        var promises = $http({
            method: 'get',
            url: sUrl,
        });
        promises.then(function (response) {
            return response.data;
        }).catch(function (error) {
            var errDetail = 'error:' + error.status;
            //throw errors for chaining
            throw errDetail;
        });
        return promises;
    }

    return {
        setPhoto: setPhoto,
        getPhoto: getPhoto
    };
});

//service for Post detail
app.factory("PostDetailService", function ($http) {
    var iPostID = '0';

    function setPostDetail(pPostID) {
        iPostID = pPostID;
    }

    function getPostDetail() {
        var sUrl = "";
        sUrl = "https://jsonplaceholder.typicode.com/posts/" + iPostID;

        var promises = $http({
            method: 'get',
            url: sUrl,
        });
        promises.then(function (response) {
            return response.data;
        }).catch(function (error) {
            var errDetail = 'error:' + error.status;
            throw errDetail;
        });
        return promises;
    }

    return {
        setPostDetail: setPostDetail,
        getPostDetail: getPostDetail
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

app.controller('postCtrl', function ($scope, $rootScope, $http, PostService, PostDetailService) {
    $scope.$watch('show', function () {
        $scope.posts = [];
        PostService.getPost().then(function (value) {
            $scope.posts = value.data;
        });
    });

    $scope.viewPostDetail = function (pPostID) {
        PostDetailService.setPostDetail(pPostID);
        $rootScope.show = 'postdetail';
    }
});

app.controller('postDetailCtrl', function ($scope, $rootScope, $http, PostService, PostDetailService) {
    $scope.$watch('show', function () {
        $scope.postdetail = [];
        PostDetailService.getPostDetail().then(function (value) {
            $scope.postdetail = value.data;
        }).catch(function (error) {
            var errDetail = 'error:' + error.status;
        });
    });
});

app.controller('albumCtrl', function ($scope, $rootScope, $http, AlbumService, PhotoService) {
    $scope.$watch('show', function () {
        $scope.albums = [];
        AlbumService.getAlbum().then(function (value) {
            $scope.albums = value.data;
        });
    });
    $scope.viewPhoto = function (pAlbumID) {
        PhotoService.setPhoto(pAlbumID);
        $rootScope.show = 'photo';
    }
});

app.controller('photoCtrl', function ($scope, $rootScope, $http, PhotoService) {
    $scope.$watch('show', function () {
        $scope.photos = [];
        PhotoService.getPhoto().then(function (value) {
            $scope.photos = value.data;
         });
    });
});

