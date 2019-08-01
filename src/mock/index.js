const Mock = require('mockjs');
//格式： Mock.mock( url, post/get , 返回的数据)；

//首页
//首页模拟数据1
Mock.mock('/mockApi/index/mockData1', 'get', require('./json/index/mockData1'));
