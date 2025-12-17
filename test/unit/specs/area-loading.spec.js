import { createTest, destroyVM } from '../util';
import AreaLoading from 'packages/area-loading';

describe('AreaLoading', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(AreaLoading, {
      loading: true
    }, true);
    expect(vm.$el).to.exist;
    expect(vm.$el.classList.contains('el-area-loading')).to.be.true;
    expect(vm.$el.classList.contains('is-loading')).to.be.true;
  });

  it('loading', done => {
    vm = createTest(AreaLoading, {
      loading: false
    }, true);

    vm.loading = true;
    vm.$nextTick(() => {
      expect(vm.$el.classList.contains('is-loading')).to.be.true;
      done();
    });
  });

  it('text', () => {
    vm = createTest(AreaLoading, {
      loading: true,
      text: '加载中...'
    }, true);
    expect(vm.$el.querySelector('.el-area-loading__text').textContent).to.equal('加载中...');
  });

  it('spinner', () => {
    vm = createTest(AreaLoading, {
      loading: true,
      spinner: 'el-icon-loading'
    }, true);
    expect(vm.$el.querySelector('.el-icon-loading')).to.exist;
  });

  it('size', () => {
    vm = createTest(AreaLoading, {
      loading: true,
      size: 'small'
    }, true);
    expect(vm.$el.querySelector('.el-area-loading__spinner--small')).to.exist;
  });

  it('background', () => {
    vm = createTest(AreaLoading, {
      loading: true,
      background: 'rgba(0, 0, 0, 0.8)'
    }, true);
    const mask = vm.$el.querySelector('.el-area-loading__mask');
    expect(mask.style.backgroundColor).to.equal('rgba(0, 0, 0, 0.8)');
  });

  it('blur', () => {
    vm = createTest(AreaLoading, {
      loading: true,
      blur: true
    }, true);
    expect(vm.$el.querySelector('.el-area-loading__content').classList.contains('is-blur')).to.be.true;
  });

  it('show method', done => {
    vm = createTest(AreaLoading, {
      loading: false
    }, true);
    expect(vm.$el.classList.contains('is-loading')).to.be.false;

    vm.show();
    vm.$nextTick(() => {
      expect(vm.$el.classList.contains('is-loading')).to.be.true;
      done();
    });
  });

  it('hide method', done => {
    vm = createTest(AreaLoading, {
      loading: true
    }, true);
    expect(vm.$el.classList.contains('is-loading')).to.be.true;

    vm.hide();
    vm.$nextTick(() => {
      expect(vm.$el.classList.contains('is-loading')).to.be.false;
      done();
    });
  });

  it('toggle method', done => {
    vm = createTest(AreaLoading, {
      loading: false
    }, true);
    expect(vm.$el.classList.contains('is-loading')).to.be.false;

    vm.toggle();
    vm.$nextTick(() => {
      expect(vm.$el.classList.contains('is-loading')).to.be.true;
      vm.toggle();
      vm.$nextTick(() => {
        expect(vm.$el.classList.contains('is-loading')).to.be.false;
        done();
      });
    });
  });

  it('setLoading method', done => {
    vm = createTest(AreaLoading, {
      loading: false
    }, true);

    vm.setLoading(true);
    vm.$nextTick(() => {
      expect(vm.$el.classList.contains('is-loading')).to.be.true;
      vm.setLoading(false);
      vm.$nextTick(() => {
        expect(vm.$el.classList.contains('is-loading')).to.be.false;
        done();
      });
    });
  });
});

