(function () {
  const clone = (x) => JSON.parse(JSON.stringify(x));
  const demo = clone(window.SAFEDENTAL_DEMO_DATA || {products:[],orders:[],reviews:[],settings:{}});
  const config = window.SAFEDENTAL_CONFIG || {};

  window.SAFEDENTAL_STORE = {
    mode: config.API_BASE_URL ? 'production' : 'demo',
    state: demo,
    commit(next) {
      // Deliberately in-memory only. Browser storage is not used.
      if (next.products) this.state.products = next.products;
      if (next.orders) this.state.orders = next.orders;
      if (next.reviews) this.state.reviews = next.reviews;
      if (next.settings) this.state.settings = next.settings;
    },
    resetDemo() { this.state = clone(demo); },
    async request(path, options) {
      if (!config.API_BASE_URL) return null;
      const response = await fetch(config.API_BASE_URL.replace(/\/$/, '') + path, {
        credentials: 'include',
        headers: Object.assign({'Content-Type':'application/json'}, options && options.headers || {}),
        ...(options || {})
      });
      if (!response.ok) throw new Error('API ' + response.status);
      const type = response.headers.get('content-type') || '';
      return type.includes('application/json') ? response.json() : response.text();
    },
    async createOrder(order) {
      if (!config.API_BASE_URL) return {ok:true, demo:true};
      return this.request('/orders', {method:'POST', body:JSON.stringify(order)});
    },
    async createReview(review) {
      if (!config.API_BASE_URL) return {ok:true, demo:true};
      return this.request('/reviews', {method:'POST', body:JSON.stringify(review)});
    },
    async loadRemote() {
      if (!config.API_BASE_URL) return false;
      const state = await this.request('/state', {method:'GET'});
      if (state) this.state = state;
      return true;
    }
  };
})();
