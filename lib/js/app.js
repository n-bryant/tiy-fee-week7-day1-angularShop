'use strict';

(function () {
  'use strict';

  var app = angular.module('shop', []);
  app.controller('ShopController', /*[$scope, function($scope) {$scope.tax = 5.75}],*/function (inventoryItems, $q) {
    var _this = this;

    this.allItems = {};

    $q.when(inventoryItems.get('./src/js/data/items.json')).then(function (response) {
      _this.allItems = response.data;
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });

    this.updateNationality = function () {
      this.colorEl = document.querySelector('.color[data-nat]');
      this.priceEl = document.querySelectorAll('.price[data-nat]');
      this.nameEl = document.querySelectorAll('.name[data-nat]');
      // toggle data-nat value
      if (this.colorEl.getAttribute('data-nat') === 'us') {
        this.colorEl.setAttribute('data-nat', 'uk');
        for (var index = 0; index < this.priceEl.length; index++) {
          this.priceEl[index].setAttribute('data-nat', 'uk');
        }
      } else {
        this.colorEl.setAttribute('data-nat', 'us');
        for (var _index = 0; _index < this.priceEl.length; _index++) {
          this.priceEl[_index].setAttribute('data-nat', 'us');
        }
      }

      this.updateNatDisplay();
    };

    this.updateNatDisplay = function () {
      // update display based on current data-nat value
      if (this.colorEl.getAttribute('data-nat') === 'us') {
        this.colorEl.innerHTML = 'color';
      } else {
        this.colorEl.innerHTML = 'colour';
      }

      // change price and waste items
      if (this.priceEl[0].getAttribute('data-nat') === 'us') {
        // set US price
        for (var index = 0; index < this.allItems.length; index++) {
          var tax = 0.0575;
          var discount = this.allItems[index].discount;
          var rawPrice = this.allItems[index].price;
          var modPrice = rawPrice - discount + rawPrice * tax;
          this.priceEl[index].innerHTML = '$' + modPrice.toFixed(2);
        }
        // set US waste
        for (var _index2 = 0; _index2 < this.nameEl.length; _index2++) {
          if (this.nameEl[_index2].innerText === 'rubbish bin') {
            this.nameEl[_index2].innerText = 'waste basket';
          }
        }
      } else {
        // set UK price
        for (var _index3 = 0; _index3 < this.allItems.length; _index3++) {
          var _tax = 0.0575;
          var _discount = this.allItems[_index3].discount;
          var _rawPrice = this.allItems[_index3].price;
          var ukConv = 1.25;
          var _modPrice = (_rawPrice - _discount + _rawPrice * _tax) * ukConv;
          this.priceEl[_index3].innerHTML = 'GBR' + _modPrice.toFixed(2);
        }
        // set UK waste
        for (var _index4 = 0; _index4 < this.nameEl.length; _index4++) {
          if (this.nameEl[_index4].innerText === 'waste basket') {
            this.nameEl[_index4].innerText = 'rubbish bin';
          }
        }
      }
    };
  });
})();