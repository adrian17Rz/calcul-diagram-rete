import { Component, Output, Socket } from 'rete';
import ArrayControl from '../controls/Array';

import arraySocket from '../sockets/array';

export default class ArrayComponent extends Component {
  constructor() {
    super("Array");
  }

  builder(node) {
    var out1 = new Output("arr", "Array", arraySocket);
    var ctrl = new ArrayControl(this.editor, "arr", node);

    return node.addControl(ctrl).addOutput(out1);
  }

  worker(node, inputs, outputs) {
    outputs["arr"] = node.data.arr;
  }
}
