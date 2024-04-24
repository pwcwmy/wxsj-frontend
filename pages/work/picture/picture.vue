<template>
	<div class="app">
		<header class="navbar">
			<div class="title">外来物种识别</div>
		</header>
		<view class="camera-container">
		        <camera v-if="cameraActive" id="myCamera" device-position="back" flash="auto" style="width: 100vw; height: 100vh;">
					<button @click="takePhoto">拍照</button>
				</camera>
		</view>
		<div class="content" v-if="!cameraActive">
			<image class="background" :src="displayImage" mode="aspectFit"></image>
			<view class="image-recognition">
					<view v-if="recognitionResult" class="result">
						<strong>识别结果:</strong> {{ recognitionResult }}
					</view>
			</view>
			<div class="centered">
				<button class="capture-btn" @click="chooseFromCamera">
					<img :src="cameraIconPath" alt="相机图标" class="camera-icon">
				</button>
				<div class="choose-from-album" @click="chooseImage">从相册中选择 &gt;</div>
				<div class="icon-container">
					<img :src="icon1Path" alt="图标1" class="icon">
					<img :src="icon2Path" alt="图标2" class="icon">
					<img :src="icon3Path" alt="图标3" class="icon">
					<img :src="icon4Path" alt="图标4" class="icon">
				</div>
				<div class="button-container">
					<button @click="uploadImage()">开始识别</button>
					<!-- <div class="counter"></div> -->
				</div>
				
			</div>
		</div>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				cameraIconPath: require('@/static/images/recognize/camera.png'),
				icon1Path: require('@/static/images/recognize/plant.png'),
				icon2Path: require('@/static/images/recognize/bird.png'),
				icon3Path: require('@/static/images/recognize/fish.png'),
				icon4Path: require('@/static/images/recognize/hippo.png'),
				displayImage: "/static/images/recognize/bg2.png", // 用于显示上传的图片
				recognitionResult: '', // 用于显示识别结果
				imagePath: '', // 存储选中图片的本地路径
				cameraContext: null, // 摄像头上下文对象
				cameraActive: false
			};
		},
		mounted() {
					this.cameraContext = uni.createCameraContext(); // 获取摄像头上下文
		},
		methods: {
			chooseFromCamera() {
							this.cameraActive = true; // 激活摄像头
							console.log("qii")
						},
			takePhoto() {
				this.cameraContext.takePhoto({
				quality: 'high',
				success: (res) => {
					this.displayImage = res.tempImagePath; // 显示拍照获取的图片
					this.imagePath = res.tempImagePath; // 存储图片路径以便上传
					},
				fail: () => {
					uni.showToast({
						title: '拍照失败',
						icon: 'none'
						});
					}
				});
				this.cameraActive = false;
			},
			chooseImage() {
				uni.chooseImage({
					count: 1, // 默认选择1张图片
					success: (chooseImageRes) => {
						const imagePath = chooseImageRes.tempFilePaths[0];
						this.displayImage = imagePath; // 显示图片
						this.imagePath = imagePath; // 存储图片路径以便上传
					}
				});
			},
			uploadImage() {
				if (!this.imagePath) {
					return uni.showToast({
						title: '请先选择图片/拍照',
						icon: 'none'
					});
				}

				this.recognitionResult = '光速识别中...'; // 显示识别中状态
				const formData = [] // Create a new FormData object
				formData.push('image', {
					uri: this.imagePath,
					name: 'image.jpg'
				}); // 添加文件到表单数据
				console.log(formData);

				uni.uploadFile({
					url: '/dev-api/pytorch/image/recognize', // 你的接口地址
					filePath: this.imagePath,
					name: 'image',
					formData: formData,
					success: (uploadFileRes) => {
						this.recognitionResult = uploadFileRes.data; // 设置识别结果
					},
					fail: (error) => {
						console.error('大模型图像识别过程发生错误:', error);
					}
				});
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
		padding-top: 40px;
		/* 新增上边距 */
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 50%;
		background-size: cover;
		z-index: -1;
		/* 背景图片置于底层 */
	}

	.centered {
		text-align: center;
		margin-top: 150px;
	}

	.capture-btn {
		width: 150px;
		height: 150px;
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
		margin-top: 30px;
	}

	.icon {
		width: 40px;
		height: 30px;
		padding: 15px;
		/* 使用标准单位 */
	}

	.button-container {
		position: relative;
		/* 设置相对定位基准 */
		display: inline-block;
		/* 使容器适应内容宽度 */
	}

	.button-container button {
		width: 200px;
		position: relative;
		/* 确保按钮可以被定位上下文正确计算 */
		z-index: 1;
		/* 使按钮位于覆盖层上方 */
	}
</style>
