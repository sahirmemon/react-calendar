'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createDateObjects;

var _lodash = require('lodash');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createDateObjects(date) {
  var weekOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var monthEvents = arguments[2];

  var startOfMonth = date.startOf('month');

  var diff = startOfMonth.weekday() - weekOffset;
  if (diff < 0) diff += 7;

  var prevMonthDays = (0, _lodash.range)(0, diff).map(function (n) {
    return {
      day: startOfMonth.clone().subtract(diff - n, 'days'),
      classNames: 'prevMonth'
    };
  });

  var currentMonthDays = (0, _lodash.range)(1, date.daysInMonth() + 1).map(function (index) {
    return {
      day: (0, _moment2.default)([date.year(), date.month(), index])
    };
  });

  currentMonthDays.map(function (currentDay, index) {
    monthEvents.map(function (eventDay) {
      if (currentDay.day.format('YYYY-MM-DD') == eventDay.format('YYYY-MM-DD')) {
        currentMonthDays[index].classNames = 'Calendar-event-day';
      }
    });
  });

  var daysAdded = prevMonthDays.length + currentMonthDays.length - 1;
  var nextMonthDays = (0, _lodash.takeWhile)((0, _lodash.range)(1, 7), function (n) {
    return (daysAdded + n) % 7 !== 0;
  }).map(function (n) {
    return {
      day: (0, _lodash.last)(currentMonthDays).day.clone().add(n, 'days'),
      classNames: 'nextMonth'
    };
  });

  return [].concat(_toConsumableArray(prevMonthDays), _toConsumableArray(currentMonthDays), _toConsumableArray(nextMonthDays));
}