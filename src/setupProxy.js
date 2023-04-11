const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000", // Replace YOUR_PORT with your actual backend port number
      changeOrigin: true,
    })
  );
};
