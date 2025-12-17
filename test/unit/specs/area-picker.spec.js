import { createTest, destroyVM } from '../util';
import AreaPicker from 'packages/area-picker';

describe('AreaPicker', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(AreaPicker, {
      value: '110000'
    });
    expect(vm.$el).to.exist;
  });

  it('level', () => {
    vm = createTest(AreaPicker, {
      level: 1
    });
    expect(vm.level).to.equal(1);
  });

  it('multiple', () => {
    vm = createTest(AreaPicker, {
      props: {
        multiple: true
      }
    });
    expect(vm.cascaderProps.multiple).to.be.true;
  });

  it('checkStrictly', () => {
    vm = createTest(AreaPicker, {
      props: {
        checkStrictly: true
      }
    });
    expect(vm.cascaderProps.checkStrictly).to.be.true;
  });

  it('placeholder', () => {
    const text = '请选择城市';
    vm = createTest(AreaPicker, {
      placeholder: text
    });
    expect(vm.placeholder).to.equal(text);
  });

  it('handleChange', () => {
    vm = createTest(AreaPicker);
    const spy = sinon.spy();
    vm.$on('change', spy);

    vm.handleChange(['110000']);
    expect(spy.calledOnce).to.be.true;
  });

  it('getCheckedNodes', () => {
    vm = createTest(AreaPicker);
    const nodes = vm.getCheckedNodes();
    expect(nodes).to.be.an('array');
  });

  it('clear', () => {
    vm = createTest(AreaPicker);
    const spy = sinon.spy(vm.$refs.cascader, 'clear');
    vm.clear();
    expect(spy.calledOnce).to.be.true;
  });
});

