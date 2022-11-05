import { renderDOM } from './core/base/utils';
import { MainPage } from './pages/main-page';

const page = MainPage({});

renderDOM('#app', page);
