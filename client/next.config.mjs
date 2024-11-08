/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.mp3$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/audio/[name].[hash].[ext]',
          },
        },
      });
      return config;
    },
  };
  
  export default nextConfig;
  