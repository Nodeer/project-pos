angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  $scope.loginData = {};
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

  var mysql = require("mysql");

  // First you need to create a connection to the db
  var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "bepos"
    });

  con.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });

  con.end(function(err) {
    // The connection is terminated gracefully
    // Ensures all previously enqueued queries are still
    // before sending a COM_QUIT packet to the MySQL server.
  });

  // con.query('SELECT * FROM employees',function(err,rows){
  //     if(err) throw err;
  //
  //     console.log('Data received from Db:\n');
  //     console.log(rows);
  //   });

})
.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('BrowserCtrl',function($scope, $stateParams){
  var serialNumber = require('serial-number');
  serialNumber(function (err, value) {
  	console.log(err+'--'+value);
  });
  $scope.txttatol = 0;
  $scope.txttatolx = 0;
  $scope.addtatol = function(txt){
    var x = 0;
    var y = parseInt(txt);
    if($scope.txttatolx === 0){
      $scope.txttatolx = x + y;
    }else{
      $scope.txttatolx = parseInt($scope.txttatolx) + y;
    }
    $scope.txttatol = 0;
  }
  $scope.minustatol = function(txt){
    var x = 1;
    var y = parseInt(txt);
    if($scope.txttatolx === 0){
      if(x > y){
        $scope.txttatolx =  y;
      }else{
        $scope.txttatolx =  y - x;
      }
    }else{
      $scope.txttatolx = parseInt($scope.txttatolx) - y;
    }
    $scope.txttatol = 0;
  }
})
;
