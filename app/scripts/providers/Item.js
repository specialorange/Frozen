'use strict';

/* globals moment */

angular.module('frozenApp')
.factory('Item', function($firebaseUtils) {
  function Item(snapshot) {
    this.$id = snapshot.name();
    this.$quantity = 0;
    this.$now = moment();
    this.$twoWeeksFromToday = moment(this.$now).add('days', 14);

    this.update(snapshot);
  }

  Item.prototype = {

    // UTILITY FUNCTIONS

    _redDate: function(date) {
      var wrappedDate = moment(date);
      return (wrappedDate.isSame(this.$now) || wrappedDate.isBefore(this.$now));
    },

    _yellowDate: function(date) {
      var wrappedDate = moment(date);
      return ((wrappedDate.isBefore(this.$twoWeeksFromToday) || wrappedDate.isSame(this.$twoWeeksFromToday)) && wrappedDate.isAfter(this.$now));
    },

    // ACCESSORS

    description: function() {
      return this.data.description;
    },
    measurement: function() {
      return this.data.measurement;
    },
    quantity: function() {
      return this.$quantity;
    },
    expires: function() {
      return moment(this.$expires);
    },
    added: function() {
      return moment(this.$added);
    },

    // DESCRIPTIVE FUNCTIONS

    hasRed: function() {
      var red = false;
      angular.forEach(this.data.dates, function(expires){
        if (this._redDate(expires)) {
          red = true;
        }
      }, this);
      return red;
    },

    isRed: function() {
      // return true;
      return this._redDate(this.expires());
    },

    hasYellow: function() {
      var yellow = false;
      angular.forEach(this.data.dates, function(expires){
        if (this._yellowDate(expires)) {
          yellow = true;
        }
      }, this);
      return yellow;
    },

    isYellow: function() {
      return this._yellowDate(this.expires());
    },

    hasGreen: function() {
      return (this.expires().isAfter(this.$twoWeeksFromToday));
    },

    // ARRAY MECHANICS

    update: function(snapshot) {
      // apply changes to this.data instead of directly on `this`
      // snapshot.val() is the data firebase gives back for the associated record
      this.data = snapshot.val();

      // recalculate expiry and added date
      var expires;
      for (var added in this.data.dates) {
        if (this.data.dates.hasOwnProperty(added)) {
          this.$quantity++;
          // parse the dates with moment.js
          expires = moment(this.data.dates[added]);
          added = moment(added);

          // compare them to any existing expiry date
          if (typeof this.$expires === 'undefined' || expires.isBefore(this.$expires)) {
            this.$expires = expires;
            this.$added = added;
          }
        }
      }
    },

    toJSON: function() {
      // since we didn't store our data directly on `this`, we need to return
      // it in parsed format. We can use the util function to remove $ variables
      // and get it ready to ship
      return $firebaseUtils.toJSON(this.data);
    }
  };

  return Item;
});