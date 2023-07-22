export default () => ({
  environment: process.env.NODE_ENV,
  port: process.env.APP_PORT,
  appName: process.env.APP_NAME,
  apiVersion: process.env.API_VERSION,
});
