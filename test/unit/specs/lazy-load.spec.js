import { createTest, destroyVM } from '../util';
import LazyLoad from 'packages/lazy-load';

describe('LazyLoad', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(LazyLoad, true);
    expect(vm.$el).to.exist;
  });
});

