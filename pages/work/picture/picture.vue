<template>
	<div class="app">
		<header class="navbar">
			<div class="title">外来物种识别</div>
		</header>
		<div class="content">
			<image class="background" src="@/static/images/bg2.png"></image>
			<div class="centered">
				<button class="capture-btn" @click="chooseFromCamera">
					<img :src="cameraIconPath" alt="相机图标" class="camera-icon">
				</button>
				<div class="choose-from-album" @click="chooseFromAlbum">从相册中选择 &gt;</div>
				<div class="icon-container">
					<img :src="icon1Path" alt="图标1" class="icon">
					<img :src="icon2Path" alt="图标2" class="icon">
					<img :src="icon3Path" alt="图标3" class="icon">
					<img :src="icon4Path" alt="图标4" class="icon">
				</div>
				<!-- 点击按钮进行识别 -->
				<div class="button-container">
				  <button @click="commitImages()">开始识别</button>
				  <div class="counter">{{counterOfImages}}</div>
				</div>
				</div>
		</div>
	</div>
</template>

<script>
	import {uploadAllImages} from '@/api/wxsj/picture.js'
	export default {
		data() {
			return {
				cameraIconPath: require('@/static/images/camera.png'),
				backgroundImagePath: require('@/static/images/bg2.png'),
				icon1Path: require('@/static/images/plant.png'),
				icon2Path: require('@/static/images/bird.png'),
				icon3Path: require('@/static/images/fish.png'),
				icon4Path: require('@/static/images/hippo.png'),
				// 上传的图片信息暂存
				imgaes: [],
				counterOfImages: 0
			};
		},
		methods: {
			chooseFromCamera() {
				uni.chooseImage({
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => {
						// tempFilePath可以作为img标签的src属性显示图片
						this.imgaes.push(res.tempFilePaths)
						this.counterOfImages += res.tempFilePaths.length
					}
				});
			},
			chooseFromAlbum() {
				uni.chooseImage({
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => {
						// tempFilePath可以作为img标签的src属性显示图片
						this.imgaes.push(res.tempFilePaths)
						this.counterOfImages += res.tempFilePaths.length
						console.log(this.imgaes, this.counterOfImages)
					}
				});
			},
			commitImages(){
				uploadAllImages(this.imgaes)
			}
		}
	};
</script>

<style scoped>
	.app {
		height: 100vh;
	}

	.navbar {
		background-color: #F2F2F2;
		padding: 10px;
	}

	.title {
		color: black;
		font-weight: bold;
		font-size: 16px;
		text-align: center;
	}

	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		/* 垂直居中 */
		height: calc(100vh - 50px);
		/* 减去上边距 */
		position: relative;
		padding-top: 130px;
		/* 新增上边距 */
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 50%;
		/*  background-image: url('/static/images/bg2.png') */
		;
		background-size: cover;
		z-index: -1;
		/* 背景图片置于底层 */
	}

	.centered {
		text-align: center;
	}

	.capture-btn {
		width: 160px;
		height: 160px;
		border-radius: 50%;
		border: 2px solid black;
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
		transition: transform 0.2s;
		/* 添加过渡效果 */
	}

	.capture-btn:active {
		transform: scale(0.9);
	}

	.camera-icon {
		width: 60px;
		height: 52px;
	}

	.choose-from-album {
		color: #999;
		font-size: 14px;
	}

	.icon-container {
		display: flex;
		justify-content: space-between;
		/* 图标间距相等 */
		width: 100%;
		margin-top: 40px;
	}

	.icon {
		width: 40px;
		height: 30px;
		padding: 15px;
		/* 使用标准单位 */
	}
	
	.button-container {
	  position: relative; /* 设置相对定位基准 */
	  display: inline-block; /* 使容器适应内容宽度 */
	}
	
	.button-container button {
	  width: 200px;
	  position: relative; /* 确保按钮可以被定位上下文正确计算 */
	  z-index: 1; /* 使按钮位于覆盖层上方 */
	}
	
	.counter {
	  position: absolute; /* 绝对定位到容器内部 */
	  top: -10px; /* 向上移动，超出容器边缘 */
	  right: -10px; /* 向右移动，超出容器边缘 */
	  background-color: white; /* 设置背景色为白色 */
	  color: black; /* 设置文字颜色为黑色 */
	  border: 1px solid gray; /* 设置边框为灰色 */
	  padding: 3px; /* 内边距，确保足够空间使文本居中 */
	  border-radius: 50%; /* 设置为圆形 */
	  width: 20px; /* 定义宽度 */
	  height: 20px; /* 定义高度 */
	  display: flex; /* 启用Flexbox */
	  align-items: center; /* 垂直居中 */
	  justify-content: center; /* 水平居中 */
	  font-size: 12px; /* 字体大小 */
	  z-index: 2; /* 保证覆盖层位于按钮之上 */
	}

</style>