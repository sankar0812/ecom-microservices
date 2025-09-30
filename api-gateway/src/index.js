const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/users', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/products', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
app.use('/orders', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));
app.use('/cart', createProxyMiddleware({ target: 'http://localhost:3004', changeOrigin: true }));
app.use('/payment', createProxyMiddleware({ target: 'http://localhost:3005', changeOrigin: true }));
app.use('/inventory', createProxyMiddleware({ target: 'http://localhost:3006', changeOrigin: true }));
app.use('/notification', createProxyMiddleware({ target: 'http://localhost:3007', changeOrigin: true }));

const PORT = 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
