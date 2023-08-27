export default () => ({
  environment: process.env.NODE_ENV,
  port: process.env.APP_PORT,
  appName: process.env.APP_NAME,
  apiVersion: process.env.API_VERSION,
  frontendUrl: process.env.URL_FRONTEND,
  backendUrl: process.env.URL_BACKEND,
  passwordResetPath: process.env.PASSWORD_RESET_PATH,
  timeoutThreshold: parseInt(process.env.TIMEOUT_THRESHOLD ?? '10000', 10),
});
