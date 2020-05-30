'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AudioNode = require('./AudioNode'),
    readOnlyAttr = require('./utils').readOnlyAttr;

var AudioDestinationNode = function (_AudioNode) {
  _inherits(AudioDestinationNode, _AudioNode);

  function AudioDestinationNode(context, _ref) {
    var _ref$numberOfChannels = _ref.numberOfChannels,
        numberOfChannels = _ref$numberOfChannels === undefined ? 2 : _ref$numberOfChannels;

    _classCallCheck(this, AudioDestinationNode);

    var _this = _possibleConstructorReturn(this, (AudioDestinationNode.__proto__ || Object.getPrototypeOf(AudioDestinationNode)).call(this, context, 1, 0, numberOfChannels, 'explicit', 'speakers'));

    readOnlyAttr(_this, 'maxChannelCount', 4);
    return _this;
  }

  // This only pulls the data from the nodes upstream


  _createClass(AudioDestinationNode, [{
    key: '_tick',
    value: function _tick() {
      return this._inputs[0]._tick();
    }
  }]);

  return AudioDestinationNode;
}(AudioNode);

module.exports = AudioDestinationNode;