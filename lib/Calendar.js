'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _createDateObjects = require('./createDateObjects');

var _createDateObjects2 = _interopRequireDefault(_createDateObjects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar() {
    _classCallCheck(this, Calendar);

    return _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).apply(this, arguments));
  }

  _createClass(Calendar, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          date = _props.date,
          weekOffset = _props.weekOffset,
          renderDay = _props.renderDay,
          onNextMonth = _props.onNextMonth,
          onPrevMonth = _props.onPrevMonth,
          onPickDate = _props.onPickDate,
          events = _props.events;


      var previousMonth = (0, _moment2.default)(Object.assign({}, date));
      previousMonth = previousMonth.subtract(1, "month").startOf("month").format('MMMM');

      var nextMonth = (0, _moment2.default)(Object.assign({}, date));
      nextMonth = nextMonth.add(1, "month").startOf("month").format('MMMM');

      var months = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

      return _react2.default.createElement(
        'div',
        { className: 'Calendar' },
        _react2.default.createElement(
          'div',
          { className: 'Calendar-header' },
          _react2.default.createElement(
            'button',
            { onClick: onPrevMonth },
            _react2.default.createElement('i', { className: 'fa fa-angle-left', 'aria-hidden': 'true' }),
            previousMonth
          ),
          _react2.default.createElement(
            'div',
            { className: 'Calendar-header-currentDate' },
            date.format('MMMM YYYY')
          ),
          _react2.default.createElement(
            'button',
            { onClick: onNextMonth },
            nextMonth,
            _react2.default.createElement('i', { className: 'fa fa-angle-right', 'aria-hidden': 'true' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'Calendar-grid Calendar-months' },
          months.map(function (month, index) {
            return _this2.renderMonthLabel(month, index);
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'Calendar-grid Calendar-days' },
          (0, _createDateObjects2.default)(date, weekOffset, events).map(function (day, i) {
            return _react2.default.createElement(
              'div',
              {
                key: 'day-' + i,
                className: 'Calendar-grid-item ' + (day.classNames || ''),
                onClick: function onClick(e) {
                  return onPickDate(day.day);
                }
              },
              renderDay(day.day),
              _this2.renderEventCircle(day)
            );
          })
        )
      );
    }
  }, {
    key: 'renderMonthLabel',
    value: function renderMonthLabel(month, index) {
      return _react2.default.createElement(
        'div',
        { className: 'Calendar-grid-item Calendar-month-item', key: 'month-' + index },
        _react2.default.createElement(
          'span',
          null,
          month
        )
      );
    }
  }, {
    key: 'renderEventCircle',
    value: function renderEventCircle(day) {
      if (day.classNames == 'Calendar-event-day') {
        return _react2.default.createElement('div', { className: 'Calendar-event-day-circle' });
      }
    }
  }]);

  return Calendar;
}(_react.Component);

Calendar.propTypes = {
  weekOffset: _propTypes2.default.number.isRequired,
  date: _propTypes2.default.object.isRequired,
  events: _propTypes2.default.array.isRequired,
  renderDay: _propTypes2.default.func,
  onNextMonth: _propTypes2.default.func.isRequired,
  onPrevMonth: _propTypes2.default.func.isRequired,
  onPickDate: _propTypes2.default.func
};
Calendar.defaultProps = {
  weekOffset: 0,
  renderDay: function renderDay(day) {
    return day.format('YYYY-MM-D');
  }
};
exports.default = Calendar;