import { createTest, createVue, destroyVM } from '../util';
import Affix from 'packages/affix';

describe('Affix', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Affix, true);
    let affixElm = vm.$el;
    expect(affixElm.classList.contains('el-affix')).to.be.true;
  });

  it('offset', () => {
    vm = createTest(Affix, {
      offset: 100
    }, true);
    expect(vm.offset).to.equal(100);
  });

  it('position', () => {
    vm = createTest(Affix, {
      position: 'bottom'
    }, true);
    expect(vm.position).to.equal('bottom');
  });

  it('target', () => {
    vm = createVue({
      template: `
        <div id="target" style="height: 200px; overflow: auto;">
          <el-affix target="#target" :offset="20">
            <div>Fixed Content</div>
          </el-affix>
        </div>
      `
    }, true);
    expect(vm.$children[0].target).to.equal('#target');
  });

  it('z-index', () => {
    vm = createTest(Affix, {
      zIndex: 200
    }, true);
    expect(vm.zIndex).to.equal(200);
  });

  it('render content', () => {
    vm = createVue({
      template: `
        <el-affix>
          <div class="test-content">Test Content</div>
        </el-affix>
      `
    }, true);
    expect(vm.$el.querySelector('.test-content')).to.exist;
    expect(vm.$el.querySelector('.test-content').textContent).to.equal('Test Content');
  });

  it('methods', (done) => {
    vm = createTest(Affix, true);
    vm.update();
    vm.updateRoot();
    expect(vm.height).to.be.a('number');
    expect(vm.width).to.be.a('number');
    done();
  });
});

