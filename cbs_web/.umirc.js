
// ref: https://umijs.org/config/
export default {
  history: "hash",
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'ChangeBackgroundSystem',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  "proxy": {
    "/api": {
      "target": "http://127.0.0.1:5001",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
}
