import request from '@/utils/request'

// 查询某物种信息详情
export function getSpeciesInf(id) {
  return request({
    url: '/wxsj/species/' + id,
    method: 'get',
  })
}

