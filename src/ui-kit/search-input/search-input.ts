import { Component, prepareComponent } from '../../core/component';
import './search-input.scss';

type TSearchInputProps = {
  onChange: (value: string) => void;
};

const template = `
  <input class='search-input' type='text' placeholder='Поиск' data-event="[input:handleChange]"/>
`;

function handleChange(this: Component, e: Event) {
  if (e.target instanceof HTMLInputElement) {
    this.props.onChange(e.target.value);
  }
}

export const SearchInput = prepareComponent<TSearchInputProps>({
  name: 'search-input',
  template,
  events: { handleChange },
});
