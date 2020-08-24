import { HttpApplication, HttpTestKit } from '@mohism/core';
import { assert, expect } from 'chai';
import { describe, it } from 'mocha';

import Hello from '../src/handlers/hello-world';

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