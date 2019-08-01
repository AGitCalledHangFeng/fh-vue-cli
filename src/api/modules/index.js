/**
 * 首页模块接口列表
 */

import base from '@/api/base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例

import qs from 'qs'; // 根据需求是否导入qs模块

const index = {
  /**
   * 首页模拟数据
   * @param {Object} params [请求时携带的参数]
   * params:{
   * }
   */
  mockData1(params) {
    return axios.get(`${base.mockApi}/index/mockData1`, {
      params: params
    });
  },
  //……
}

export default index;
