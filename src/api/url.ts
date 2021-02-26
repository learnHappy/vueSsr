// 开发环境地址
const development = 'http://192.168.0.69:8082';
// 生产环境地址
const production = 'http://192.168.0.69:8082';
// url地址
let url = '';

if (process.env.NODE_ENV === 'development') {
  url = development;
}
if (process.env.NODE_ENV === 'production') {
  url = production;
}

export default url;
