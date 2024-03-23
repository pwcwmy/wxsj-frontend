<template>
	<div class="questionnaire">
		<!-- 问题1 -->
		<div class="question">
			<p>1. 这是问题1？</p>
			<radio-group class="radioBox" @change="radioChange">
				<template v-for="(option, index) in questionOptions[0]">
					<radio v-model="answers.key1" :value="option">
						{{option}}
					</radio>
				</template>
			</radio-group>
			<!-- <label v-for="(option, index) in questionOptions[0]" :key="index">
				<input type="radio" v-model="answers.key1" :value="option" />
				{{ option }}
			</label> -->
		</div>

		<!-- 问题2 -->
		<div class="question">
			<p>2. 这是问题2？</p>
			<radio-group class="radioBox" @change="radioChange">
				<template v-for="(option, index) in questionOptions[0]">
					<radio v-model="answers.key2" :value="option">
						{{option}}
					</radio>
				</template>
			</radio-group>
		</div>

		<!-- 问题3 -->
		<div class="question">
			<p>3. 这是问题3？</p>
			<radio-group class="radioBox" @change="radioChange">
				<template v-for="(option, index) in questionOptions[0]">
					<radio v-model="answers.key3" :value="option">
						{{option}}
					</radio>
				</template>
			</radio-group>
		</div>

		<!-- 问题4 -->
		<div class="question">
			<p>4. 这是问题4？</p>
			<radio-group class="radioBox" @change="radioChange">
				<template v-for="(option, index) in questionOptions[0]">
					<radio v-model="answers.key4" :value="option">
						{{option}}
					</radio>
				</template>
			</radio-group>
		</div>

		<!-- 问题5 -->
		<div class="question">
			<p>5. 这是问题5？</p>
			<radio-group class="radioBox" @change="radioChange">
				<template v-for="(option, index) in questionOptions[0]">
					<radio v-model="answers.key5" :value="option">
						{{option}}
					</radio>
				</template>
			</radio-group>
		</div>

		<!-- 按钮 -->
		<div class="buttons">
			<button @click="submit">提交</button>
			<button @click="reset">重置</button>
		</div>
	</div>
</template>


<script>
	import {
		listLaw
	} from '@/api/wxsj/law';

	export default {
		data() {
			return {
				questionOptions: [
					['选项A1', '选项B1', '选项C1', '选项D1', '选项E1'],
					['选项A2', '选项B2', '选项C2', '选项D2', '选项E2'],
					['选项A3', '选项B3', '选项C3', '选项D3', '选项E3'],
					['选项A4', '选项B4', '选项C4', '选项D4', '选项E4'],
					['选项A5', '选项B5', '选项C5', '选项D5', '选项E5'],
				],
				answers: {
					key1: '',
					key2: '',
					key3: '',
					key4: '',
					key5: '',
				},
				// ... 其他数据
			};
		},
		methods: {
			async submit() {
				// 显示加载提示
				console.log('提交问卷')
				console.log(answers)
				this.$message({
					message: '检索法律知识图谱中',
					type: 'info',
					duration: 0, // 不自动关闭
				});

				// 调用后端接口
				try {
					const response = await listLaw(this.answers);

					// 隐藏加载提示
					this.$message.closeAll();

					// 缓存问卷输入
					// this.cacheQuestionnaire();

					// 跳转到 law.vue 页面并传递数据
					this.$router.push({
						name: 'law',
						params: {
							responseData: response,
							answers: this.answers,
						},
					});
				} catch (error) {
					console.error('Error calling backend API: ', error);
					this.$message.error('接口调用失败');
					this.$message.closeAll();
				}
			},
			reset() {
				// 重置答案
				this.answers.key1 = '';
				this.answers.key2 = '';
				this.answers.key3 = '';
				this.answers.key4 = '';
				this.answers.key5 = '';
			},
		},
	};
</script>

<style scoped>
	.contentBox {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	 
		.big-title {
			font-size: 36rpx;
			font-weight: bold;
			color: #457cde;
			margin: 20rpx 0rpx 0rpx 0rpx;
		}
	 
		.questionBox {
			padding: 0px 20rpx 20rpx 20rpx;
		}
	 
		.qutitle {
			display: flex;
			font-size: 28rpx;
			background-color: #f2f2f2;
			padding: 10rpx 20rpx;
		}
	 
		.comment {
			background-color: white;
			margin-top: -50rpx;
		}
	 
		.radioBox {
			margin: 10rpx 20rpx;
			display: flex;
			flex-direction: column;
		}
	 
		radio {
			font-size: 28rpx;
			margin: 10rpx 0px !important;
		}
	 
		checkbox {
			font-size: 28rpx;
			margin: 10rpx 0px !important;
		}
	 
		.topic {
			font-size: 32rpx;
			font-weight: bold;
			color: #457cde;
			padding: 10rpx 0rpx;
		}
	 
		.para-text {
			font-size: 28rpx;
			font-weight: bold;
			color: #444444;
			padding: 10rpx 0rpx;
		}
	 
		.btn {
			width: 50%;
			padding: 20rpx 30rpx;
			margin: 40rpx 0rpx;
			font-size: 28rpx;
			color: white;
			background-color: #3677d3;
			border-radius: 10rpx;
			letter-spacing: 4rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
</style>


