import { createTest, destroyVM } from '../util';
import Amount from 'packages/amount';

describe('Amount', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Amount, true);
    expect(vm.$el).to.exist;
  });
});

