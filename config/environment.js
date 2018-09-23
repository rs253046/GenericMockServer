const config = (env) => {
  const PORT = env.PORT || 3000;

  const config = {
    namespace: '/api/v1',
    environment: 'development',
    port: PORT,
    paths: {
      viewsDirectory: 'src/views',
      defaultLayoutDirectory: 'src/views/layouts'
    }
  };

  return config;
}
export default config(process.env);
