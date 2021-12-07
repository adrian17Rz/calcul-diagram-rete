import { Control } from 'rete';
import React from 'react';

export default class BooleanControl extends Control {
  static component = ({ value, onChange }) => (
    <select
      ref={(ref) => {
        ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
      }}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="true">true</option>
      <option value="false">false</option>
    </select>
  );

  constructor(emitter, key, node, readonly = false) {
    super(key);
    debugger;
    this.emitter = emitter;
    this.key = key;
    this.component = BooleanControl.component;

    const initial = node.data[key] || true;

    node.data[key] = initial;
    this.props = {
      readonly,
      value: initial,
      onChange: (v) => {
        this.setValue(v);
        this.emitter.trigger("process");
      }
    };
  }

  setValue(val) {
    this.props.value = val;
    this.putData(this.key, val);
    this.update();
  }
}
