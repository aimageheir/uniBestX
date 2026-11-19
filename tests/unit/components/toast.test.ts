import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  hideToast,
  showToast,
  toastError,
  toastInfo,
  toastLoading,
  toastState,
  toastSuccess,
  toastWarning,
  useToast
} from '@/src/components/AppToast/index.uts';

describe('appToast and useToast Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    hideToast();
  });

  afterEach(() => {
    hideToast();
    vi.useRealTimers();
  });

  it('shows text toast and auto hides after duration', () => {
    showToast('Hello unibestX', 'text');
    expect(toastState.visible).toBe(true);
    expect(toastState.title).toBe('Hello unibestX');
    expect(toastState.type).toBe('text');
    expect(toastState.position).toBe('top');

    vi.advanceTimersByTime(2000);
    expect(toastState.visible).toBe(false);
  });

  it('handles success, error, warning and info shortcuts', () => {
    toastSuccess('操作成功');
    expect(toastState.visible).toBe(true);
    expect(toastState.title).toBe('操作成功');
    expect(toastState.type).toBe('success');

    toastError('操作失败');
    expect(toastState.title).toBe('操作失败');
    expect(toastState.type).toBe('error');

    toastWarning('请注意');
    expect(toastState.type).toBe('warning');

    toastInfo('提示信息');
    expect(toastState.type).toBe('info');
  });

  it('handles options object with custom position and icon', () => {
    showToast({
      title: '底部提示',
      type: 'success',
      position: 'bottom',
      icon: '🎉',
      duration: 3000
    });

    expect(toastState.visible).toBe(true);
    expect(toastState.title).toBe('底部提示');
    expect(toastState.position).toBe('bottom');
    expect(toastState.icon).toBe('🎉');

    vi.advanceTimersByTime(2999);
    expect(toastState.visible).toBe(true);

    vi.advanceTimersByTime(2);
    expect(toastState.visible).toBe(false);
  });

  it('handles loading state with mask and no auto-dismiss', () => {
    toastLoading('数据加载中...');
    expect(toastState.visible).toBe(true);
    expect(toastState.type).toBe('loading');
    expect(toastState.mask).toBe(true);

    vi.advanceTimersByTime(5000);
    // loading 状态不自动消失
    expect(toastState.visible).toBe(true);

    hideToast();
    expect(toastState.visible).toBe(false);
  });

  it('supports useToast() composition hook in setup and pages', () => {
    const toast = useToast();
    expect(toast).toBeDefined();
    expect(typeof toast.success).toBe('function');
    expect(typeof toast.error).toBe('function');
    expect(typeof toast.loading).toBe('function');
    expect(typeof toast.hide).toBe('function');

    toast.success('Hook 调用成功', 1500);
    expect(toast.state.visible).toBe(true);
    expect(toast.state.title).toBe('Hook 调用成功');
    expect(toast.state.type).toBe('success');

    vi.advanceTimersByTime(1500);
    expect(toast.state.visible).toBe(false);

    toast.loading('提交中...');
    expect(toast.state.visible).toBe(true);
    expect(toast.state.type).toBe('loading');

    toast.hide();
    expect(toast.state.visible).toBe(false);
  });

  it('supports ding-style toast.promise morphing from loading to success', async () => {
    const toast = useToast();
    const deferred = Promise.resolve('data');

    const promise = toast.promise(deferred, {
      loading: '正在获取数据...',
      success: '数据获取完毕'
    });

    expect(toast.state.visible).toBe(true);
    expect(toast.state.type).toBe('loading');
    expect(toast.state.title).toBe('正在获取数据...');

    await promise;

    expect(toast.state.visible).toBe(true);
    expect(toast.state.type).toBe('success');
    expect(toast.state.title).toBe('数据获取完毕');
  });

  it('supports immediate hide without exit animation delay', () => {
    showToast('即将切换页面', 'text');
    expect(toastState.visible).toBe(true);
    expect(toastState.immediate).toBe(false);

    hideToast(true);
    expect(toastState.visible).toBe(false);
    expect(toastState.immediate).toBe(true);
  });
});
