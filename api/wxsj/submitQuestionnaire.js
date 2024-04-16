import request from '@/utils/request'

export function submitQuestionnaire(data, successCallback, errorCallback) {
	return request({
		url: '/dev-api/wxsj/question/list',
		method: 'post',
		data: data,
		headers: {
			isToken: false
		}
	});
}