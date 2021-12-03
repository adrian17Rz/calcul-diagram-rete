import { Component, Output, Socket } from 'rete';
import NumControl from '../controls/Number';

import numSocket from '../sockets/number';

export default class NumComponent extends Component {
  constructor() {
    super("Number");
  }

  builder(node) {
    var out1 = new Output("num", "Number", numSocket);
    var ctrl = new NumControl(this.editor, "num", node);

    return node.addControl(ctrl).addOutput(out1);
  }

  worker(node, inputs, outputs) {
    outputs["num"] = node.data.num;
  }
}
