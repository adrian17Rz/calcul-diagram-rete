import React from 'react';
import { Control } from 'rete';

export default class ArrayControl extends Control {
  static component = ({ value, onChange }) => (
    <input
      type="text"
      value={value}
      ref={(ref) => {
        ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
      }}
      onChange={(e) => onChange(e.target.value)}
    />
  );

  constructor(emitter, key, node, readonly = false) {
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.component = ArrayControl.component;

    const initial = node.data[key] || [];

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
    this.props.value = val.split(',');
    this.putData(this.key, val.split(','));
    this.update();
  }
}
