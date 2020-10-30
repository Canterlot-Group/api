import * as child from 'child_process';
import stream from 'stream';
export default class Stream {

  _name:          string;
  _functionality: any;
  _quality:       any;

  constructor(name: string, functionality: any, quality: any) {
    this._name = name;
    this._functionality = functionality;
    this._quality = quality;
  }

  /*_spawnFFmpeg() {



  }*/

}
