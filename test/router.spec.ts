import { expect } from 'chai';
import { describe } from 'mocha';

describe('Проверяем переходы у Роута', () => {
  it('Переход на новую страницу должен менять состояние сущности history', () => {
    window.history.pushState({ page: 'login' }, 'Login', '/login');
    window.history.pushState({ page: 'signin' }, 'Signin', '/signin');

    expect(window.history.length).to.eq(3);
  });
});
