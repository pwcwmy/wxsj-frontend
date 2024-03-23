<template>
	<div class="container">
		<div class="content">
			<div class="section law-section">
				<div class="title">相关法律条文</div>
				<div class="text-container">
					<p v-for="paragraph in lawParagraphs" class="text">{{ paragraph }}</p>
				</div>
			</div>
			<div class="section advice-section">
				<div class="title">建议</div>
				<div class="text-container">
					<p v-for="paragraph in adviceParagraphs" class="text">{{ paragraph }}</p>
				</div>
			</div>
		</div>
		<button class="report-btn" @click="reportIssue">上报发现</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				lawParagraphs: [
					'《生物安全法》第八十一条 任何单位和个人未经批准，不得擅自引进、释放或者丢弃外来物种。 ',
					'违反本法规定，未经批准，擅自引进外来物种的，由县级以上人民政府有关部门根据职责分工，没收引进的外来物种，并处五万元以上二十五万元以下的罚款。',
				],
				adviceParagraphs: [
					'根据您所提供的信息可知，您此次购买的宠物红耳彩龟是外来入侵物种，根据《生物安全法》第81条规定：任何单位和个人未经批准，不得擅自引进、释放或者丢弃外来物种。 若您未经批准购买、释放或丢弃此种生物，可能会面临相关行政处罚。',
				]
			};
		},
		methods: {
			reportIssue() {
				// 上报发现逻辑
			}
		},
		async mounted() {
			// 获取后台输入的自然段内容并分别存储到数组中
			// 假设后台返回的数据格式为：
			// {
			//   "lawParagraphs": ["法条自然段1", "法条自然段2", ...],
			//   "adviceParagraphs": ["建议自然段1", "建议自然段2", ...]
			// }
			// 将具体的获取数据逻辑替换为实际的后台请求代码
			const response = await fetch('Your API endpoint');
			const data = await response.json();

			this.lawParagraphs = data.lawParagraphs;
			this.adviceParagraphs = data.adviceParagraphs;
		},
	};
</script>

<style>
	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #F0F4F8;
		background-image: url('/static/images/recognize/background.png');
		background-size: cover;
		background-position: center;
	}

	.content {
		flex: 1;
		padding: 20px;
		/* 使用标准单位 */
	}

	.section {
		margin-top: 100px;
		margin-bottom: 20px;
		padding: 20px;
		background-color: #FFFFFF;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
	}

	.title {
		font-family: 'Noto Sans', sans-serif;
		/* 推荐字体 */
		font-size: 18px;
		/* 标准字号 */
		font-weight: bold;
		color: #333;
		margin-bottom: 10px;
	}

	.text-container {
		max-height: 200px;
		overflow-y: auto;
	}

	.text {
		font-family: 'Noto Sans', sans-serif;
		font-size: 16px;
		line-height: 1.5;
		text-indent: 2em;
		color: #666;
	}

	.report-btn {
		margin: 20px auto;
		/* 居中显示 */
		padding: 10px 20px;
		background-color: #CFFF81;
		/* 更舒适的绿色 */
		color: #000000;
		text-align: center;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		/* 显示手形光标 */
		transition: background-color 0.3s, transform 0.2s;
	}

	.report-btn:hover {
		background-color: #CFFF81;
		/* 悬停效果 */
	}

	.report-btn:active {
		transform: translateY(2px);
		/* 点击时的按下效果 */
	}
</style>