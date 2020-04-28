import { Model } from '@mohism/core';

const Foo = {
  name: {
    type: String,
  },
  age: {
    type: Number,
    default: 18,
  }
};

export default Model('t_foo', Foo);