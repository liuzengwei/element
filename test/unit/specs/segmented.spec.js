import { createTest, destroyVM } from '../util';
import Segmented from 'packages/segmented';

describe('Segmented', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Segmented, true);
    expect(vm.$el).to.exist;
  });
});

