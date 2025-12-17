import { createTest, destroyVM } from '../util';
import Trigger from 'packages/trigger';

describe('Trigger', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Trigger, true);
    expect(vm.$el).to.exist;
  });
});

