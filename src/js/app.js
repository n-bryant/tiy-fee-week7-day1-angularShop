(function() {
  'use strict';

  const app = angular.module('shop', []);
    app.controller('ShopController', /*[$scope, function($scope) {$scope.tax = 5.75}],*/ function(inventoryItems, $q) {

      this.allItems = {};

      $q.when(inventoryItems.get('./src/js/data/items.json')).then((response) => {
        this.allItems = response.data;
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });

      this.updateNationality = function() {
        this.colorEl = document.querySelector('.color[data-nat]');
        this.priceEl = document.querySelectorAll('.price[data-nat]');
        this.nameEl = document.querySelectorAll('.name[data-nat]');
        // toggle data-nat value
        if (this.colorEl.getAttribute('data-nat') === 'us') {
          this.colorEl.setAttribute('data-nat', 'uk');
          for (let index = 0; index < this.priceEl.length; index++) {
            this.priceEl[index].setAttribute('data-nat', 'uk');
          }
        } else {
          this.colorEl.setAttribute('data-nat', 'us');
          for (let index = 0; index < this.priceEl.length; index++) {
            this.priceEl[index].setAttribute('data-nat', 'us');
          }
        }

        this.updateNatDisplay();
      };

      this.updateNatDisplay = function() {
        // update display based on current data-nat value
        if (this.colorEl.getAttribute('data-nat') === 'us') {
          this.colorEl.innerHTML = 'color';
        } else {
          this.colorEl.innerHTML = 'colour';
        }

        // change price and waste items
        if (this.priceEl[0].getAttribute('data-nat') === 'us') {
          // set US price
          for (let index = 0; index < this.allItems.length; index++) {
            let tax = 0.0575;
            let discount = this.allItems[index].discount;
            let rawPrice = this.allItems[index].price;
            let modPrice = ((rawPrice - discount) + (rawPrice * tax));
            this.priceEl[index].innerHTML = `$${modPrice.toFixed(2)}`;
          }
          // set US waste
          for (let index = 0; index < this.nameEl.length; index++) {
            if (this.nameEl[index].innerText === 'rubbish bin') {
              this.nameEl[index].innerText = 'waste basket';
            }
          }
        } else {
          // set UK price
          for (let index = 0; index < this.allItems.length; index++) {
            let tax = 0.0575;
            let discount = this.allItems[index].discount;
            let rawPrice = this.allItems[index].price;
            let ukConv = 1.25;
            let modPrice = ((rawPrice - discount) + (rawPrice * tax)) * ukConv;
            this.priceEl[index].innerHTML = `GBR${modPrice.toFixed(2)}`;
          }
          // set UK waste
          for (let index = 0; index < this.nameEl.length; index++) {
            if (this.nameEl[index].innerText === 'waste basket') {
              this.nameEl[index].innerText = 'rubbish bin';
            }
          }
        }
      }
    });
})();
