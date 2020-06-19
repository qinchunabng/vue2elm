import axios from 'axios'
import vm from '../main'
import { baseApi } from '../config'

//全局默认配置
let http = axios.create({
    baseURL: baseApi,
    timeout: 50000
});
//请求拦截器
http.interceptors.request.use(
    config => {
        config.headers['Content-Type']='application/json;charset=UTF-8';
        config.headers.timestamp=Math.floor(new Date().getTime()/1000);
        config.headers.token=sessionStorage.getItem('token')||'';
        //接口没有返回时显示loading
        if(config.loading === true){
            // vm.$loading.hide();
            // vm.$loading.show();
        }
        return config;
    },
    error => {
        // vm$.loading.hide();
        return Promise.reject(error);
    }
);
/* 相应拦截器 */
http.interceptors.response.use(
    res => {
        // vm.$loading.hide();
        return res;
    },
    error => {
        // vm.$loading.hide();
        return Promise.reject(error)
    }
);

//将对象转为queryString
function obj2queryStr(url,obj){
    let dataStr='';
    if(obj){
        Object.keys(obj).forEach(key => {
            dataStr += key + '=' + obj[key] + '&';
        });
    }
    if(dataStr!==''){
        dataStr = dataStr.substr(0,dataStr.lastIndexOf('&'));
        url+='?'+dataStr;
    }
    return url;
}

function get(url,data,loading){
    url=obj2queryStr(url,data);
    return new Promise((resolve, reject) => {
        http.get(url).then(response => {
            resolve(response.data)
        },
        err => {
            reject(err)
        }).catch(error => {
            reject(error)
        })
    });
}

function post(url, data, loading){
    return new Promise((resolve, reject) => {
        http.post(url, data, {loading: loading})
            .then(response => {
                resolve(response)
            },
            err => {
                reject(err)
            }).catch(error => {
                reject(error)
            });
    });
}

function del(url, data){
    url=obj2queryStr(url,data);
    return new Promise((resolve, reject)=>{
        http.delete(url)
            .then(response => {
                resolve(response);
            },err => {
                reject(err)
            }).catch(error=>{
                reject(error);
            });
    });
}

export { http, get, post, del }