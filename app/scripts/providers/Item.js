'use strict';

/* globals moment */

angular.module('frozenApp')
.factory('Item', function($firebaseUtils) {
  function Item(snapshot) {
    this.$id = snapshot.name();
    this.update(snapshot);

    this.$now = moment();
    this.$twoWeeksFromToday = moment(this.$now).add('days', 14);
  }

  Item.prototype = {

    // ACCESSORS

    description: function() {
      return this.data.description;
    },
    measurement: function() {
      return this.data.measurement;
    },
    expires: function() {
      return moment(this.data.expires);
    },
    added: function() {
      return moment(this.data.added);
    },

    // DESCRIPTIVE FUNCTIONS

    isRed: function() {
      // return true;
      return (this.expires().isSame(this.$now) || this.expires().isBefore(this.$now));
    },

    isYellow: function() {
      return ((this.expires().isBefore(this.$twoWeeksFromToday) || this.expires().isSame(this.$twoWeeksFromToday)) && this.expires().isAfter(this.$now));
    },

    isGreen: function() {
      return (this.expires().isAfter(this.$twoWeeksFromToday));
    },

    // ARRAY MECHANICS

    update: function(snapshot) {
      // apply changes to this.data instead of directly on `this`
      // snapshot.val() is the data firebase gives back for the associated record
      this.data = snapshot.val();
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