import request from '@/utils/request'

export function submitQuestionnaire(data, successCallback, errorCallback) {
  return request({
    url: '/wxsj/collect', // 更改为你的后端API URL
    method: 'post',
    data: data,
	headers: {
	  isToken: false
	}
  });
}