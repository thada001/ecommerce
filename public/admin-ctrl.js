angular.module('myApp').controller('adminCtrl', function($scope, adminService) {
  var getProducts = function() {
    adminService.getProducts().then(function(res) {
      console.log(res);
      $scope.products = res.data;
    })
  }
  getProducts();

  $scope.addProduct = function(product) {
    console.log("got it", product);
    adminService.addProduct(product).then(function(res) {
      console.log(res);
      getProducts();
      $scope.newProduct = {};
    })
  }

  $scope.updateProduct = function(id, product) {
    console.log("bleh", id, product);
    adminService.updateProduct(id, product).then(function(res) {
      console.log(res);
      $scope.selectedProduct = {};
      getProducts();
    })
  }

  $scope.deleteProduct = function(id) {
    adminService.deleteProduct(id).then(function(res) {
      getProducts();
      $scope.selectedProduct = {};
    })
  }
})
