import { createTest, createVue, destroyVM } from '../util';
import Text from 'packages/text';

describe('Text', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Text, {
      type: 'primary'
    }, true);
    let textElm = vm.$el;
    expect(textElm.classList.contains('el-text')).to.be.true;
    expect(textElm.classList.contains('el-text--primary')).to.be.true;
  });

  it('type', () => {
    vm = createTest(Text, {
      type: 'success'
    }, true);
    expect(vm.$el.classList.contains('el-text--success')).to.be.true;
  });

  it('size', () => {
    vm = createTest(Text, {
      size: 'large'
    }, true);
    expect(vm.$el.classList.contains('el-text--large')).to.be.true;
  });

  it('truncated', () => {
    vm = createTest(Text, {
      truncated: true
    }, true);
    expect(vm.$el.classList.contains('is-truncated')).to.be.true;
  });

  it('line-clamp', () => {
    vm = createVue({
      template: `
        <el-text :line-clamp="2">这是测试文本</el-text>
      `
    }, true);
    expect(vm.$el.classList.contains('is-line-clamp')).to.be.true;
    expect(vm.$el.style.webkitLineClamp).to.equal('2');
  });

  it('tag', () => {
    vm = createTest(Text, {
      tag: 'p'
    }, true);
    expect(vm.$el.tagName).to.equal('P');
  });

  it('render text', () => {
    vm = createVue({
      template: `
        <el-text>Test Content</el-text>
      `
    }, true);
    expect(vm.$el.textContent).to.equal('Test Content');
  });
});

