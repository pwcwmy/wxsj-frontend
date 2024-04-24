<template>
	<view style="background-color: white;">
		<!-- 自定义导航栏 -->
		<uni-nav-bar left-icon="left" :title="specie.name" :fixed="true">
			<block slot="right" style="margin-right: 10rpx;">
				<view>
					<uni-icons v-if="isStared" type="star" size="25" @click="star"></uni-icons>
					<uni-icons v-else color="#FF6600" type="star-filled" size="25" @click="star"></uni-icons>
					<!-- <uni-icons type="paperplane" size="25" @click="share"></uni-icons> -->
				</view>
			</block>
		</uni-nav-bar>

		<!-- 物种详情信息 -->
		<view style="padding: 50rpx;">
			<view class="inf-details">物种名称：{{specie.name}}</view>
			<!-- 轮播图 -->
			<view style="border-radius: 20rpx; overflow: hidden; margin-top: 30rpx; margin-bottom: 30rpx;">
				<swiper class="banner" indicator-dots autoplay circular>
					<swiper-item v-for="pic in specie.pics" :key="pic.id">
						<image :src="pic.url" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>

			<!-- 信息 -->
			<view class="inf-details" v-for="item in specie.Inf">
				<text style="font-weight: bold;">{{item.title}}: </text>
				<text>{{item.content}}</text>
			</view>
		</view>

		<!-- 点赞 -->
		<view style="text-align: center;">
			<uni-icons v-if="isLiked" type="heart" color="#CA0707" size="50"
				@click="isLiked=!isLiked"></uni-icons>
			<uni-icons v-else type="heart-filled" color="#CA0707" size="50" @click="isLiked=!isLiked"></uni-icons>
		</view>

		<!--联系我们  -->
		<view style="text-align:right; font-size: 20rpx; color: darkgrey; margin: 50rpx; height: 80rpx;">
			<navigator open-type="navigate" url="/pages/mine/about/index">
				有疑问？联系我们
			</navigator>
		</view>

		<!-- 类似物种/其他相关推荐 -->
		<!-- <view style="padding-bottom: 80rpx;">
			<uni-section title="其他物种" type="line">
				<uni-card title="物种名+物种所属纲目" @click="linkToOtherSpecies">
					<view style="display: flex; height: 180rpx;">
						<image :src="imageUrl" style="height: 150rpx; float: left;" mode="aspectFill"></image>
						<text
							style="float: right; height: 150rpx; overflow: hidden; overflow:ellipsis; margin-left: 15rpx;">一些简单的介绍一些简单的介绍一些简单的介绍一些简单的介绍一些简单的介绍</text>
					</view>

				</uni-card>
			</uni-section>
		</view> -->

		<!-- 分享 -->
		<!-- <view>
			<uni-popup ref="share" type="bottom" safeArea backgroundColor="#fff">
				<view style="text-align: center;padding: 20rpx;">分享至</view>
				<view style="text-align: center;">
					<uni-icons type="qq" size="30"></uni-icons>
					<uni-icons style="margin-left: 40rpx;margin-right: 40rpx;" type="weixin" size="30"></uni-icons>
					<uni-icons type="weibo" size="30"></uni-icons>
				</view>

			</uni-popup>
		</view> -->
	</view>
</template>

<script>
	import {
		getSpeciesInf
	} from '../../../api/wxsj/species';
	export default {
		data() {
			return {
				isStared: "false",
				isLiked: "false",
				nameOfSpecie: '',
				specie: {},
				// imageUrl: "../../static/pic1.jpeg",
				shareLinks: [{
						id: "1",
						icon: "qq",
						text: " QQ"
					},
					{
						id: "2",
						icon: "weixin",
						text: "微信"
					},
				],
			}
		},
		async mounted() {
			// "specie": {
			// 	"id": 1,
			// 	"name": "熊猫",
			// 	"pics": [{
			// 			"id": 1,
			// 			"url": "../../static/pic1.jpeg"
			// 		},
			// 		{
			// 			"id": 2,
			// 			"url": "../../static/pic2.jpeg"
			// 		},
			// 		{
			// 			"id": 3,
			// 			"url": "../../static/pic3.jpeg"
			// 		}
			// 	],
			// 	"Inf": [{
			// 			"title": "所在地",
			// 			"content": "四川"
			// 		}...]
			
			// id 与具体物种有关
			getSpeciesInf(1).then(response => {
				this.isStared = response.isStared;
				this.isLiked = response.isLiked;
				this.specie = response.specie;
				this.nameOfSpecie = this.specie.name;
			}).catch(error => {
				console.error('请求错误:', error);
			});


		},
		methods: {
			// 收藏
			star() {
				this.isStared = !this.isStared
				// specie.id 加入收藏夹 
			},
			
			// 分享
			// 是否还需要此功能
			share() {
				this.$refs.share.open()
			},
			// 其他相关物种详情链接
			// 是否还需要此功能
			linkToOtherSpecies() {

			},
			

		}
	}
</script>

<style>
	.banner,
	.banner image {
		width: 100%;
		height: 300rpx;
	}

	.inf-details {
		line-height: 2;
		font-size: 28rpx;
	}
</style>