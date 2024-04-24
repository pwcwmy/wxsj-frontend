import request from "@/utils/request";

// 获取轮播图
export function getBannerPics(){
	return request({
	  url: '/wxsj/news/banner',
	  method: 'get'
	})
}

// 获取最新的几条资讯
export function getNewsList(){
	return request({
	  url: '/wxsj/news/newestList',
	  method: 'get'
	})
}

// 获取更多资讯
export function getNewsMore(){
	return request({
		url:'',
		method:'get'
	})
}
