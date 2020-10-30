import {expect} from 'chai';
import Stream from '../src/stream';

describe('Stream Initialization', () => {
  it('should create a new Stream object', () => {

    const stream = new Stream('test', {}, {bitrate: 192, sampleRate: 44.1, channels: 'stereo'});
    expect(stream).to.be.an('object');

  });
});
