import { Component, Output, Socket } from 'rete';

import BooleanControl from '../controls/Boolean'

var boolSocket = new Socket("Boolean value");

export default class BooleanComponent extends Component {
  constructor() {
    super("Boolean");
  }

  builder(node) {
    var out1 = new Output("bool", "Boolean", boolSocket);
    var ctrl = new BooleanControl(this.editor, "bool", node);

    return node.addControl(ctrl).addOutput(out1);
  }

  worker(node, inputs, outputs) {
    outputs["bool"] = node.data.bool;
  }
}
