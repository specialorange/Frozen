'use strict';

window.ItemUtils = {
    yellowDates: function(item) {
        var dates = item.data.dates;
        var yellow = {};
        var expires;

        for (var added in dates) {
            expires = dates[added];
            if (item._yellowDate(expires)) {
                yellow[added] = expires;
            }
        }

        return yellow;
    }
};