import axios from "axios"
let http = axios.create({
  // baseURL: 'http://localhost:8080/',
  baseURL: 'http://'+window.location.hostname+':8080/',
  // withCredentials: true,
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Content-Type': 'charset=UTF-8;multipart/form-data',
  // },
  processData:false,
  cache:false,
  // transformRequest: [function (data) {
  //   // 可以对data做任何操作

  //   return data;
  // }],
  
});

function apiAxios(method, url, params, response) {
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    // data:params
  }).then(function (res) {
    response(res);
  }).catch(function (err) {
    response(err);
  })
}

export default {
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function (url, params, response) {
    return apiAxios('POST', url, params, response)
  },
  put: function (url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete: function (url, params, response) {
    return apiAxios('DELETE', url, params, response)
  }
}