import { describe, expect, it } from 'vitest';
import { computed, createApp, defineComponent, h, provide, ref } from 'vue';
import {
  APP_ROOT_CONTEXT_KEY,
  APP_ROOT_INSTANCE_KEY,
  setGlobalAppRootContext,
  useAppRoot
} from '@/src/hooks/useAppRoot.uts';
import type { AppRootContext } from '@/src/hooks/useAppRoot.uts';

describe('useAppRoot hook', () => {
  it('returns null when outside of AppRoot context and not mounted (no fake fallback)', () => {
    let result: AppRootContext | null = null;
    const Comp = defineComponent({
      setup() {
        result = useAppRoot();
        return () => null;
      }
    });
    const app = createApp(Comp);
    app.mount(document.createElement('div'));

    // 没有就是没有，不进行虚假 mock 兜底
    expect(result).toBeNull();
  });

  it('retrieves AppRoot public context, methods, and properties seamlessly via inject', () => {
    let captured: AppRootContext | null = null;

    let heightUpdateCount = 0;
    const mockContext: AppRootContext = {
      doUpdateHeight: () => {
        heightUpdateCount++;
      },
      setHideStatusBar: () => {},
      setHideNavbar: () => {},
      showTabbar: computed(() => true),
      isCurrentPageTabbar: ref(true),
      themeStyle: computed(() => ({ '--theme-color': '#1677ff' })),
      themeStore: { state: { isDark: false } },
      pageProps: { layout: 'navbar' }
    };

    const Parent = defineComponent({
      setup(_props, { slots }) {
        provide(APP_ROOT_CONTEXT_KEY, mockContext);
        provide(APP_ROOT_INSTANCE_KEY, { custom: 'instance' });
        return () => slots.default?.();
      }
    });

    const Child = defineComponent({
      setup() {
        captured = useAppRoot();
        return () => null;
      }
    });

    const Root = defineComponent({
      setup() {
        return () => h(Parent, null, {
          default: () => h(Child)
        });
      }
    });

    const app = createApp(Root);
    app.mount(document.createElement('div'));

    expect(captured).not.toBeNull();
    expect(captured!.showTabbar.value).toBe(true);
    expect(captured!.isCurrentPageTabbar.value).toBe(true);
    expect(captured!.themeStyle.value).toEqual({ '--theme-color': '#1677ff' });
    expect(captured!.themeStore.state.isDark).toBe(false);

    // 调用公共方法
    captured!.doUpdateHeight();
    expect(heightUpdateCount).toBe(1);
  });

  it('retrieves global active AppRoot context when registered', () => {
    let heightCalls = 0;
    const customGlobal: AppRootContext = {
      doUpdateHeight: () => {
        heightCalls++;
      },
      setHideStatusBar: () => {},
      setHideNavbar: () => {},
      showTabbar: computed(() => false),
      isCurrentPageTabbar: ref(false),
      themeStyle: computed(() => ({ '--theme-color': '#ff4d4f' })),
      themeStore: { state: { isDark: true } },
      pageProps: { layout: 'custom' }
    };

    setGlobalAppRootContext(customGlobal);

    let captured: AppRootContext | null = null;
    const Comp = defineComponent({
      setup() {
        captured = useAppRoot();
        return () => null;
      }
    });
    const app = createApp(Comp);
    app.mount(document.createElement('div'));

    expect(captured).not.toBeNull();
    expect(captured!.showTabbar.value).toBe(false);
    expect(captured!.themeStyle.value).toEqual({ '--theme-color': '#ff4d4f' });
    captured!.doUpdateHeight();
    expect(heightCalls).toBe(1);

    // 清理
    setGlobalAppRootContext(null);
  });
});
