import { describe, it } from "mocha";
import { HttpApplication, HttpTestKit } from '@mohism/core';
import Hello from '../src/handlers/hello-world';
import { assert, expect } from "chai";

describe('hello-world', () => {
  it('base', () => {
    assert.equal(Hello.name(), '你好，世界。');
    expect(Hello.middlewares()).is.haveOwnProperty('length');
    expect(Hello.params()['err']).is.haveOwnProperty('data');
  });
  it('err-false', async () => {
    const app = new HttpApplication({}, '');
    app.mount(Hello);
    const resp = await new HttpTestKit().GET().url('/hello?err=false').run(app);
    assert.deepEqual(resp, {
      err: false
    });
  });

  
})