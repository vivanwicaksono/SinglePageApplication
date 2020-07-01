var user = angular.module('userApp', []);
user.controller('userCtrl', function ($scope, $http) {
    $http.get("https://jsonplaceholder.typicode.com/users")
    .then(function (response) {
        $scope.users = response.data;
    });
});