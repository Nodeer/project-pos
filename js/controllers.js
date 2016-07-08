angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicLoading) {


  $scope.sloading = function () {
      $ionicLoading.show({
          template: '<ion-spinner icon="bubbles" class="success text-l spinner-energized"></ion-spinner>',
          noBackdrop: true
      });
  };
  $scope.loadingtxt = function (txt) {
      $ionicLoading.show({
          template: '<ion-spinner icon="bubbles" class="success text-l spinner-energized">'+txt+'</ion-spinner>',
          noBackdrop: true
      });
  };
  // setTimeout(function () {
  //     $ionicLoading.hide();
  // }, 3000);

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
.controller('LoginCtrl', function($scope, $stateParams ,$ionicLoading) {
})
.controller('OrderCtrl', function($scope,$state , $stateParams ,$ionicLoading) {
  $scope.sloading();
  $scope.listaccount = [];
  var restatus = function(id){
    switch (id) {
      case '1':
              return 1;//"New";
        break;
      case '2':
              return 2;//"Pending";
        break;
      case '3':
              return 3;//"In Progress";
        break;
      case '4':
              return 4;//"Canceled";
        break;
      case '100001':
              return 5;//"Completed";
        break;
      case '100003':
              return 6;//"Invoiced";
        break;
      case '917970000':
              return 7;//"Submitted";
        break;
      case '917970001':
              return 8;//"Deleted";
        break;
      default:

    }
  }
  var retype = function(id){
    switch (id) {
      case '1':
              return "ขาย 1";//"Submitted";
        break;
      case '2':
              return "ขาย 2";//"Deleted";
        break;
      default:

    }
  }
  var sql = require('mssql');
  sql.connect("mssql://sa:Passw0rd@1@192.168.0.22/YSSDevelopment_MSCRM").then(function() {
      // Query
  	new sql.Request().query('select * from salesorder where ivz_TerritoryName is not null').then(function(recordset) {
  		console.dir(recordset);
      if(recordset){
        for(var i in recordset){
          $scope.listaccount.push({
            id:recordset[i].SalesOrderId,
            order:recordset[i].ivz_OrderNumber,
            ordernumber:recordset[i].OrderNumber,
            ordername:recordset[i].Name,
            tatol:recordset[i].TotalAmount,
            status:restatus((recordset[i].StatusCode).toString()),
            statussale:retype((recordset[i].ivz_StatusSales).toString()),
            statuscomplete:recordset[i].ivz_SyncStatus,
            tername:recordset[i].ivz_TerritoryName,
            avator:"img/avatar-6.png"
          });
        }
        $ionicLoading.hide();
      }else{
        $ionicLoading.hide();
      }
  	}).catch(function(err) {
  		// ... query error checks
  	});
      // Stored Procedure
  	new sql.Request()
  	.input('input_parameter', sql.Int, value)
      .output('output_parameter', sql.VarChar(50))
  	.execute('procedure_name').then(function(recordsets) {
  		console.dir(recordsets);
  	}).catch(function(err) {
  		// ... execute error checks
  	});
  	// // ES6 Tagged template literals (experimental)
  	// sql.query`select * from mytable where id = ${value}`.then(function(recordset) {
  	// 	console.dir(recordset);
  	// }).catch(function(err) {
  	// 	// ... query error checks
  	// });
  }).catch(function(err) {
  	// ... connect error checks
    console.log(err);
  });
  $scope.clicknext = function(id){
    alert(id);
    $state.go('app.orderdetail',{orderid:id},{reload:true});
  }
})
.controller('OrderDetailCtrl', function($scope,$state , $stateParams ,$ionicLoading) {
  $state.reload();
  alert($stateParams.orderid);
  //$scope.sloading();
  $scope.listaccount = [];
  var sql = require('mssql');
  sql.connect("mssql://sa:Passw0rd@1@192.168.0.22/YSSDevelopment_MSCRM").then(function() {
  	new sql.Request().query("select * from SalesOrder inner join SalesOrderDetail on SalesOrder.SalesOrderId = SalesOrderDetail.SalesOrderId where SalesOrderId = '"+$stateParams.orderid+"'").then(function(recordset) {
  		console.dir(recordset);
      if(recordset){
        for(var i in recordset){
          $scope.listaccount.push({
            id:recordset[i].SalesOrderId,
            order:recordset[i].ivz_OrderNumber,
            ordernumber:recordset[i].OrderNumber,
            ordername:recordset[i].Name,
            tatol:recordset[i].TotalAmount,
            status:restatus((recordset[i].StatusCode).toString()),
            statussale:retype((recordset[i].ivz_StatusSales).toString()),
            statuscomplete:recordset[i].ivz_SyncStatus,
            tername:recordset[i].ivz_TerritoryName,
            avator:"img/avatar-6.png"
          });
        }
        $ionicLoading.hide();
      }else{
        $ionicLoading.hide();
      }
  	}).catch(function(err) {
  		// ... query error checks
  	});
      // Stored Procedure
  	new sql.Request()
  	.input('input_parameter', sql.Int, value)
      .output('output_parameter', sql.VarChar(50))
  	.execute('procedure_name').then(function(recordsets) {
  		console.dir(recordsets);
  	}).catch(function(err) {
  		// ... execute error checks
  	});
  	// // ES6 Tagged template literals (experimental)
  	// sql.query`select * from mytable where id = ${value}`.then(function(recordset) {
  	// 	console.dir(recordset);
  	// }).catch(function(err) {
  	// 	// ... query error checks
  	// });
  }).catch(function(err) {
  	// ... connect error checks
    console.log(err);
  });
})
;
