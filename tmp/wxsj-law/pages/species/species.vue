<template>
  <div class="app">
    <header class="navbar">
      <div class="title">外来物种识别</div>
    </header>
    <div class="content">
	  <div class="background"></div>
      <div class="centered">
        <button class="capture-btn">
          <img :src="cameraIconPath" alt="相机图标" class="camera-icon">
        </button>
        <div class="choose-from-album">从相册中选择 &gt;</div>
		<div class="icon-container">
		  <img :src="icon1Path" alt="图标1" class="icon">
          <img :src="icon2Path" alt="图标2" class="icon">
		  <img :src="icon3Path" alt="图标3" class="icon">
		  <img :src="icon4Path" alt="图标4" class="icon">
		</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cameraIconPath: require ('@/static/images/camera.png'),
      backgroundImagePath: require ('@/static/images/bg2.png'),
      icon1Path: require ('@/static/images/plant.png'),
      icon2Path: require ('@/static/images/bird.png'),
      icon3Path: require ('@/static/images/fish.png'),
      icon4Path: require ('@/static/images/hippo.png')
    };
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
  font-size: 24px;
  text-align: center;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* 垂直居中 */
  height: calc(100vh - 50px); /* 减去上边距 */
  position: relative;
  padding-top: 150px; /* 新增上边距 */
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-image: url('/static/images/bg2.png');
  background-size: cover;
  z-index: -1; /* 背景图片置于底层 */
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
  transition: transform 0.2s; /* 添加过渡效果 */
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
  justify-content: space-between; /* 图标间距相等 */
  width: 100%;
  margin-top: 50px;
}

.icon {
  width: 60px;
  height: 45px;
  padding: 20px; /* 使用标准单位 */
}
</style>
