import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';
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

  it('marks configured mode-3 tabs before mount without a native tabBar', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-root-mode3-'));
    const home = 'src/pages/index/index';
    const details = 'src/sub/details/details';
    vi.stubEnv('VITE_TABBAR_MODE', '3');
    try {
      fs.mkdirSync(path.join(root, 'src/tabbar'), { recursive: true });
      fs.writeFileSync(path.join(root, 'src/AppRoot.uvue'), '');
      fs.writeFileSync(path.join(root, 'src/tabbar/config.uts'), `export const config = { list: [{ pagePath: '${home}', text: '首页' }] };`);
      fs.writeFileSync(path.join(root, 'pages.json'), JSON.stringify({
        pages: [{ path: home }],
        subPackages: [{ root: 'src/sub/details', pages: [{ path: 'details' }] }]
      }));

      const plugin = uniRootX();
      (plugin as any).configResolved({ root });
      const code = '<template><view /></template>';
      const homeResult = (plugin as any).transform.call({}, code, path.join(root, `${home}.uvue`));
      const detailsResult = (plugin as any).transform.call({}, code, path.join(root, `${details}.uvue`));
      expect(homeResult.code).toContain(':is-tabbar="true"');
      expect(detailsResult.code).not.toContain(':is-tabbar="true"');
    }
    finally {
      fs.rmSync(root, { recursive: true, force: true });
      vi.unstubAllEnvs();
    }
  });
});
