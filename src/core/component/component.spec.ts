import { expect } from 'chai';
import { describe } from 'mocha';
import { prepareComponent } from './Component';

describe('Component', () => {
  it('Should mount new dom element', () => {
    const component = prepareComponent({
      name: 'test',
      template: '<div class="test">test</div>',
    })({});
    component.setParentElement(document.body);
    component.mount();
    const elem = document.querySelector('.test');
    expect(!!elem).to.be.true;
  });
});
