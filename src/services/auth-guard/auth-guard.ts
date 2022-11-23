class AuthGuard {
  public get isAuthenticated() {
    return !!localStorage.getItem('userKey');
  }

  public set(id: number) {
    if (this.isAuthenticated) return;
    localStorage.setItem('userKey', `${id}`);
  }

  public remove() {
    localStorage.removeItem('userKey');
  }
}

const authGuard = new AuthGuard();

export { authGuard };
