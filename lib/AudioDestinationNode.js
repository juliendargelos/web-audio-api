var AudioNode = require('./AudioNode')
  , readOnlyAttr = require('./utils').readOnlyAttr


class AudioDestinationNode extends AudioNode {

  constructor(context, { numberOfChannels = 2 }) {
    super(context, 1, 0, numberOfChannels, 'explicit', 'speakers')

    readOnlyAttr(this, 'maxChannelCount', 4)
  }

  // This only pulls the data from the nodes upstream
  _tick() {
    return this._inputs[0]._tick()
  }

}


module.exports = AudioDestinationNode
