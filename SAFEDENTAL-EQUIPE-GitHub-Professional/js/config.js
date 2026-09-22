/**
 * Public runtime configuration. No secrets belong here.
 * For production, point API_BASE_URL to your server/API gateway.
 */
window.SAFEDENTAL_CONFIG = Object.assign({
  API_BASE_URL: '',
  DEMO_MODE: true
}, window.SAFEDENTAL_CONFIG || {});
