<template>
	<view style="background-color: #F8FFF2;">
		<swiper class="banner" indicator-dots autoplay circular>
			<swiper-item v-for="item in bannerPics">
				<image :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<!-- 页内导航栏 -->
		<!-- @change	点击 grid 触发	e={detail:{index:0}}，index 为当前点击 grid下标 -->
		<uni-grid class="menu-grid" :showBorder="false" :column="3" @change="linkTo" :highlight="false">
			<uni-grid-item class="menu-grid-item" v-for="(item, index) in menu" :index="index">
				<view class="grid-item-box">
					<image :src="item.url"></image>
				</view>
				<view style="text-align: center; font-size: 23rpx;">{{item.text}}</view>
			</uni-grid-item>
		</uni-grid>

		<!--  资讯缩略显示 -->
		<view class="content-cluster" v-for="(item, index) in contentList" :key="item.id">
			<!-- 时间 绿色圆点 -->
			<view style="display:flex; margin-top:40rpx;">
				<view style="flex:1;text-align: center;">
					<uni-icons type="circle-filled" size="20" color="#4B7902"></uni-icons>
				</view>
				<view style="flex:9">{{item.date}}</view>
			</view>

			<!-- 资讯内容 -->
			<view style="display: flex; margin-top:10rpx;">
				<view style="flex:1">
					
				</view>
				<view style="flex:9; padding-right: 20rpx;">
					<!-- @click	点击 Card 触发事件	- -->
					<uni-card @click="showNewsDetails" spacing="5rpx" margin="0rpx">
						<uni-grid class="pic-grid" :column="3">
							<uni-grid-item class="pic-grid-item" v-for="url in item.pics">
								<view>
									<image :src="url" mode="aspectFill" />
								</view>
							</uni-grid-item>
						</uni-grid>
						<view class="text-box" style="margin-top: 10rpx">
							<p @click="showNewsDetails">
								{{item.briefIntro}}
							</p>
						</view>
					</uni-card>
				</view>
			</view>
		</view>

		<!-- 加载更多 -->
		<!-- clickLoadMore	点击加载更多时触发	e.detail={status:'loading'} -->
		<uni-load-more status="more" @clickLoadMore="clickLoadMore"></uni-load-more>

	</view>
</template>

<script>
	import { getBannerPics } from "../../api/wxsj/news";
	import { getNewsList } from "../../api/wxsj/news";
	export default {
		data() {
			return {
				// 轮播图图片 ["url1","url2"]
				bannerPics: [],
				// 页内导航图标
				menu: [{
						id: '1',
						url: "../../static/images/tabbar/news.png",
						text: "最新资讯",
						linkTo:""
					},
					{
						id: '2',
						url: "../../static/images/tabbar/policy.png",
						text: "政策发布",
						linkTo:""
					},
					{
						id: '3',
						url: "../../static/images/tabbar/encyclopedia.png",
						text: "随机百科",
						linkTo:""
					}
				],
				// 资讯（id，资讯相关图片，内容简介，发布日期）
				//[{
					// 	"id": 1,
					// 	"pics": ["url1","url2","url3"],
					// 	"briefIntro": "环境新闻这是一条环境新闻这是一条环境新闻环境新闻这是一条环境新闻这是一条环境新闻环境新闻这是一条环境新闻这是一条环境新闻",
					// 	"date": "today"
					// },{}
				//]
				contentList: []
			}
		},
		methods: {
			// 通过页内导航栏跳转至其他页面：政策/百科
			linkTo(e) {
				let {index} = e.detail
				uni.redirectTo({
					url:this.menu[index].linkTo
				})
			},
			// 点击资讯卡片，跳转至详情
			showNewsDetails() {

			},
			// 上拉显示更多
			clickLoadMore() {
				getNewsMore().then(response => {
					for (let item of response.contentList) {
					    this.contentList.push(item);
					}
					console.log(this.contentList)
				}).catch(error => {
					console.error('请求错误:', error);
				});
			}
		},
		async mounted() {
				getBannerPics().then(response => {
					this.bannerPics = response.bannerPics;
				}).catch(error => {
					console.error('请求错误:', error);
				});
				getNewsList().then(response => {
					this.contentList = response.contentList;
				}).catch(error => {
					console.error('请求错误:', error);
				});
		}
	}
</script>

<style>
	.banner,
	.banner image {
		width: 750rpx;
		height: 300rpx;
	}

	.menu-grid {
		margin: 20rpx;
		height: 120rpx;
	}

	.menu-grid .menu-grid-item {
		height: 120rpx;
	}

	.menu-grid .grid-item-box {
		width: 100rpx;
		height: 100rpx;
		align-self: center;
		background-color: #E5E5E5;
		border-radius: 100%;
		text-align: center;
	}

	.menu-grid image {
		margin-top: 20rpx;
		height: 60rpx;
		width: 60rpx;
	}

	.pic-grid-item {
		height: 130rpx;
		overflow: hidden;
	}

	.text-box {
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 28rpx;
		max-height: 200rpx;
	}

	.text-box p {
		overflow: hidden;
		text-overflow: ellipsis;
		max-height: 200rpx;
	}
</style>