# API contract

Configure `SAFEDENTAL_CONFIG.API_BASE_URL` in a deployment environment; never place provider secrets in the browser.

Expected endpoints:
- `GET /state` → `{ products, orders, reviews, settings }`
- `POST /orders` → receives a complete multi-product order and returns `{ ok, orderId }`
- `POST /reviews` → receives a review and returns `{ ok }`

A production adapter can forward these operations to Google Apps Script / Google Sheets, Dolisoft, the delivery provider and SMS gateway.
