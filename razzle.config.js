module.exports = {
  options: {
    verbose: true,
    enableReactRefresh: true,
    debug: { // debug flags
      options: true, // print webpackOptions that will be used in webpack config
      config: true, // print webpack config
      nodeExternals: true // print node externals debug info 
    },
  },
  plugins: ['scss'],
  externals: ['react-helmet']
};