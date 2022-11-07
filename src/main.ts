import { Router } from './core/router/Router';
import { SigninPage } from './pages/signin-page/signin-page';
import { ErrorPage } from './pages/error-page';
import { LoginPage } from './pages/login-page/login-page';
import { MainPage } from './pages/main-page';
import { NotFoundPage } from './pages/not-found-page';
import { ProfilePage } from './pages/profile-page';

const router = Router.getInstance();

router.registerRoutes([
  { path: '/login', view: LoginPage, props: { rootQuery: '#app' } },
  { path: '/signin', view: SigninPage, props: { rootQuery: '#app' } },
  { path: '/404', view: NotFoundPage, props: { rootQuery: '#app' } },
  { path: '/*', view: ErrorPage, props: { rootQuery: '#app' } },
  { path: '/profile', view: ProfilePage, props: { rootQuery: '#app' } },
  { path: '/', view: MainPage, props: { rootQuery: '#app' } },
]);

router.start();
