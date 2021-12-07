import { Component, Output, Socket } from 'rete';
import StringControl from '../controls/String';

import strSocket from '../sockets/string';

export default class NumComponent extends Component {
  constructor() {
    super("String");
  }

  builder(node) {
    var out1 = new Output("str", "String", strSocket);
    var ctrl = new StringControl(this.editor, "str", node);

    return node.addControl(ctrl).addOutput(out1);
  }

  worker(node, inputs, outputs) {
    outputs["str"] = node.data.str;
  }
}
