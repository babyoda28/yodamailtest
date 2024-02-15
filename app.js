// app.js

var app = angular.module('myApp', []);

app.controller('mainController', ['$scope', '$http', function($scope, $http) {
    $scope.loggedIn = false;

    $scope.login = function() {
        $http.post('/login', { username: $scope.username, password: $scope.password })
            .then(function(response) {
                if (response.data.success) {
                    $scope.loggedIn = true;
                    // Clear the form fields
                    $scope.username = '';
                    $scope.password = '';
                } else {
                    alert(response.data.message);
                }
            }, function(error) {
                console.error('Error:', error);
            });
    };

    // Other code for handling chat functionality
}]);
