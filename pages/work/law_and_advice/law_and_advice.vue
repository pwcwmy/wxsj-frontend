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
		<navigator class="report-btn" open-type="navigate" url="/pages/work/questionnaire/questionnaire">上报发现</navigator>

	</div>
</template>

<script>
	import { getLaw } from '../../../api/wxsj/law.js'
	export default {
		data() {
			return {
				lawParagraphs: [],
				adviceParagraphs: []
			};
		},
		async mounted() {
			// 获取后台输入的自然段内容并分别存储到数组中
			// 假设后台返回的数据格式为：
			// {
			//   "lawParagraphs": ["法条自然段1", "法条自然段2", ...],
			//   "adviceParagraphs": ["建议自然段1", "建议自然段2", ...]
			// }
			// 将具体的获取数据逻辑替换为实际的后台请求代码
			
			// id 与具体物种有关？
			getLaw(1).then(response => {
				console.log(response)
			    this.lawParagraphs = response.lawParagraphs;
			    this.adviceParagraphs = response.adviceParagraphs;
			  }).catch(error => {
			    console.error('请求错误:', error);
			  });

			
		},
		methods: {
		}

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
		margin-top: 80px;
	}

	.section {
		margin-top: 50px;
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