import { Component, Output, Socket } from 'rete';
import ObjectControl from '../controls/Object';

import objSocket from '../sockets/object';

export default class ObjectComponent extends Component {
  constructor() {
    super("Object");
  }

  builder(node) {
    var out1 = new Output("obj", "Object", objSocket);
    var ctrl = new ObjectControl(this.editor, "obj", node);

    return node.addControl(ctrl).addOutput(out1);
  }

  worker(node, inputs, outputs) {
      let val = {};
      try {
	  val = JSON.parse(node.data.obj);
	  outputs["obj"] = val;
      } catch(ex) {
	  
	  outputs["obj"] = {};
      }

  }
}
