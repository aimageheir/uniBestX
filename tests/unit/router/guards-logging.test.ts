import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Router } from '@/uni_modules/route-bestX/hooks/useRouter.uts';
import { setupRouteGuards } from '@/src/router/guards/index.uts';
import { runAfterEachHooks, runRouterGuard } from '@/uni_modules/route-bestX/index.uts';
import type { RouteTarget } from '@/uni_modules/route-bestX/index.uts';

describe('router guards logging (R05)', () => {
  let router: Router;
  let logSpy: ReturnType<typeof vi.spyOn>;
  let warnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    router = new Router();
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('masks sensitive parameters in beforeEach and restricts logging to allowlisted fields', () => {
    setupRouteGuards(router);

    const queryMap = new Map<string, string>();
    queryMap.set('id', '100');
    queryMap.set('token', 'secret_token_123456');
    queryMap.set('password', 'p@ssw0rd!');
    queryMap.set('phone', '13812345678');

    const to: RouteTarget = {
      path: '/src/pages/detail/detail',
      fullPath: '/src/pages/detail/detail?id=100&token=secret_token_123456&password=p@ssw0rd!&phone=13812345678',
      name: 'detail',
      query: queryMap,
      params: new Map<string, string>(),
      meta: { auth: true, secretInternalState: 'should_not_leak' }
    };

    const from: RouteTarget = {
      path: '/src/pages/index/index',
      fullPath: '/src/pages/index/index',
      name: 'index',
      query: new Map<string, string>(),
      params: new Map<string, string>(),
      meta: {}
    };

    const decision = runRouterGuard(to, from, 'navigateTo');
    expect(decision.pass).toBe(true);
    expect(logSpy).toHaveBeenCalled();

    // 检查所有输出：脱敏检查与白名单检查
    const allLogCalls = logSpy.mock.calls;
    let foundBeforeEach = false;
    for (const call of allLogCalls) {
      const joined = call.map((arg: any) => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(' ');
      if (joined.includes('[Router beforeEach]')) {
        foundBeforeEach = true;
        // 1. 敏感参数绝不以明文出现
        expect(joined).not.toContain('secret_token_123456');
        expect(joined).not.toContain('p@ssw0rd!');
        // 手机号被脱敏
        expect(joined).not.toContain('13812345678');
        // 2. 禁止泄露未受控的 meta 与 params
        expect(joined).not.toContain('should_not_leak');
        expect(joined).not.toContain('meta:');
        expect(joined).not.toContain('params:');
      }
    }
    expect(foundBeforeEach).toBe(true);
  });

  it('emits paired afterEach logging when navigation completes normally', () => {
    setupRouteGuards(router);

    const to: RouteTarget = {
      path: '/src/pages/detail/detail',
      fullPath: '/src/pages/detail/detail?id=100',
      name: 'detail',
      query: new Map<string, string>(),
      params: new Map<string, string>(),
      meta: {}
    };

    const from: RouteTarget = {
      path: '/src/pages/index/index',
      fullPath: '/src/pages/index/index',
      name: 'index',
      query: new Map<string, string>(),
      params: new Map<string, string>(),
      meta: {}
    };

    // 1. 正常完成（failure 为 null）
    runAfterEachHooks(to, from, null);

    let foundAfterEach = false;
    for (const call of logSpy.mock.calls) {
      const joined = call.map((arg: any) => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(' ');
      if (joined.includes('[Router afterEach]') && joined.includes('路由完成')) {
        foundAfterEach = true;
        expect(joined).toContain('/src/pages/detail/detail?id=100');
        expect(joined).toContain('/src/pages/index/index');
      }
    }
    expect(foundAfterEach).toBe(true);

    // 2. 异常完成（failure 不为空）
    runAfterEachHooks(to, from, new Error('navigation aborted'));
    expect(warnSpy).toHaveBeenCalledWith('[Router afterEach] 导航中断/异常:', expect.any(Error));
  });
});
