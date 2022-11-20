import { Router } from './core/router/Router';
import { SignupPage } from './pages/signup-page/signup-page';
import { ErrorPage } from './pages/error-page';
import { LoginPage } from './pages/login-page/login-page';
import { MainPage } from './pages/main-page';
import { NotFoundPage } from './pages/not-found-page';
import { ProfilePage } from './pages/profile-page';
import { registerHbHelpers } from './core/component/utils';
import { authGuard } from './services/auth-guard';

registerHbHelpers();

const router = Router.getInstance();

router.registerRoutes([
  {
    path: '/',
    view: MainPage,
    props: { rootQuery: '#app' },
    guard: { guardFn: () => authGuard.isAuthenticated, redirectPath: '/login' },
  },
  {
    path: '/login',
    view: LoginPage,
    props: { rootQuery: '#app' },
  },
  { path: '/signup', view: SignupPage, props: { rootQuery: '#app' } },
  {
    path: '/profile',
    view: ProfilePage,
    props: { rootQuery: '#app' },
    guard: { guardFn: () => authGuard.isAuthenticated, redirectPath: '/login' },
  },
  { path: '/500', view: ErrorPage, props: { rootQuery: '#app' } },
  { path: '/*', view: NotFoundPage, props: { rootQuery: '#app' } },
]);

router.start();
