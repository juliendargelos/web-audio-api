'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('underscore');

var AudioBuffer = function () {
  function AudioBuffer(numberOfChannels, length, sampleRate) {
    _classCallCheck(this, AudioBuffer);

    var ch;
    this._data = [];
    // Just a hack to be able to create a partially initialized AudioBuffer
    if (arguments.length) {
      for (ch = 0; ch < numberOfChannels; ch++) {
        this._data.push(new Float32Array(length));
      }this._defineAttrs(numberOfChannels, length, sampleRate);
    }
  }

  _createClass(AudioBuffer, [{
    key: 'getChannelData',
    value: function getChannelData(channel) {
      if (channel >= this.numberOfChannels) throw new Error('invalid channel');
      return this._data[channel];
    }
  }, {
    key: 'slice',
    value: function slice() {
      var sliceArgs = _.toArray(arguments);
      var array = this._data.map(function (chArray) {
        return chArray.subarray.apply(chArray, sliceArgs);
      });
      return AudioBuffer.fromArray(array, this.sampleRate);
    }
  }, {
    key: 'concat',
    value: function concat(other) {
      if (other.sampleRate !== this.sampleRate) throw new Error('the 2 AudioBuffers don\'t have the same sampleRate');
      if (other.numberOfChannels !== this.numberOfChannels) throw new Error('the 2 AudioBuffers don\'t have the same numberOfChannels');
      var newLength = other.length + this.length,
          newChArray,
          newArray = this._data.map(function (chArray, ch) {
        newChArray = new Float32Array(newLength);
        newChArray.set(chArray);
        newChArray.set(other._data[ch], chArray.length);
        return newChArray;
      });
      return AudioBuffer.fromArray(newArray, this.sampleRate);
    }
  }, {
    key: 'set',
    value: function set(other, offset) {
      if (other.sampleRate !== this.sampleRate) throw new Error('the 2 AudioBuffers don\'t have the same sampleRate');
      if (other.numberOfChannels !== this.numberOfChannels) throw new Error('the 2 AudioBuffers don\'t have the same numberOfChannels');
      this._data.forEach(function (chArray, ch) {
        chArray.set(other.getChannelData(ch), offset);
      });
    }
  }, {
    key: '_defineAttrs',
    value: function _defineAttrs(numberOfChannels, length, sampleRate) {
      if (!(sampleRate > 0)) throw new Error('invalid sample rate : ' + sampleRate);
      Object.defineProperty(this, 'sampleRate', {
        value: sampleRate,
        writable: false
      });
      if (!(length >= 0)) throw new Error('invalid length : ' + length);
      Object.defineProperty(this, 'length', {
        value: length,
        writable: false
      });
      Object.defineProperty(this, 'duration', {
        value: length / sampleRate,
        writable: false
      });
      if (!(numberOfChannels > 0)) throw new Error('invalid numberOfChannels : ' + numberOfChannels);
      Object.defineProperty(this, 'numberOfChannels', {
        value: numberOfChannels,
        writable: false
      });
    }
  }], [{
    key: 'filledWithVal',
    value: function filledWithVal(val, numberOfChannels, length, sampleRate) {
      var audioBuffer = new AudioBuffer(numberOfChannels, length, sampleRate),
          chData,
          ch,
          i;
      for (ch = 0; ch < numberOfChannels; ch++) {
        chData = audioBuffer._data[ch];
        for (i = 0; i < length; i++) {
          chData[i] = val;
        }
      }
      return audioBuffer;
    }
  }, {
    key: 'fromArray',
    value: function fromArray(array, sampleRate) {
      var audioBuffer = new AudioBuffer();
      audioBuffer._defineAttrs(array.length, array[0].length, sampleRate);
      array.forEach(function (chArray) {
        if (!(chArray instanceof Float32Array)) chArray = new Float32Array(chArray);
        audioBuffer._data.push(chArray);
      });
      return audioBuffer;
    }
  }]);

  return AudioBuffer;
}();

module.exports = AudioBuffer;