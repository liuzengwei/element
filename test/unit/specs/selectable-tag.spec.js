import { createTest, destroyVM } from '../util';
import SelectableTag from 'packages/selectable-tag';

describe('SelectableTag', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(SelectableTag, true);
    expect(vm.$el).to.exist;
  });
});

