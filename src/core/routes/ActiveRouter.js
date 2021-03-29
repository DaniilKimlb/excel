export class ActiveRouter {
  static get path() {
    return window.location.hash.slice(1);
  }
  static get param() {
    return ActiveRouter.path.split('/')[1];
  }
  static changeURL(url) {
    return (window.location.hash = url);
  }
}
