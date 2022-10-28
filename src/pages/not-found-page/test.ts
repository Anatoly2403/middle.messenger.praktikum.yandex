import { createComponent } from '../../core/base/component';

export const Test = createComponent<{ name: string }>({
  name: 'Test',
  template: '<div>{{name}}</div>',
});
