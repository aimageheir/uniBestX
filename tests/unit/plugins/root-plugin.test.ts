import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import uniRootX from '@/plugins/root-plugin';

describe('uniRootX plugin', () => {
  it('prints transformed template', () => {
    const plugin = uniRootX({ rootFileName: 'src/AppRoot' });
    (plugin as any).configResolved({ root: process.cwd() });
    const code = fs.readFileSync('src/pages/index/index.uvue', 'utf-8');
    const res = (plugin as any).transform.call({}, code, path.resolve('src/pages/index/index.uvue'));
    console.log('TRANSFORMED CODE SCRIPT:\n', res.code.slice(0, 300));
    console.log('TRANSFORMED CODE TEMPLATE:\n', res.code.slice(res.code.indexOf('<template')));
    expect(res.code).toContain('<AppRoot ref="appRootRef"');
  });
});
