<template>
	<div class="container">
		<div class="content">
			<div class="section">
				<form @submit="formSubmit">

					<!-- Question 1 -->
					<view class="question">
						<text>1. 行为主体</text>
						<radio-group name="行为主体" @change="onChange">
							<label class="radio-label">
								<radio value="自然人" />自然人
							</label>
							<label class="radio-label">
								<radio value="法人或法人组织" />法人或法人组织
							</label>
						</radio-group>
					</view>

					<!-- Question 2 -->
					<view class="question">
						<text>2. 携带、邮寄的物品</text>
						<radio-group name="物品类型" @change="onChange">
							<label class="radio-label">
								<radio value="携带、邮寄植物种子、种苗及其他繁殖材料" />携带、邮寄植物种子、种苗及其他繁殖材料
							</label>
							<label class="radio-label">
								<radio value="携带动植物、动植物产品和其他检疫物" />携带动植物、动植物产品和其他检疫物
							</label>
							<label class="radio-label">
								<radio value="邮寄动植物、动植物产品和其他检疫物" />邮寄动植物、动植物产品和其他检疫物
							</label>
						</radio-group>
					</view>
					
					<!-- Question 3 -->
					<view class="question">
						<text>3. 携带、邮寄的物品是否属于《禁止携带、寄递进境的动植物及其产品和其他检疫物名录》</text>
						<radio-group name="违反" @change="onChange">
							<label class="radio-label">
								<radio value="是" />是
							</label>
							<label class="radio-label">
								<radio value="否" />否
							</label>
						</radio-group>
					</view>

					<!-- Question 4 -->
					<view class="question">
						<text>4. 是否存在豁免情况</text>
						<radio-group name="豁免" @change="onChange">
							<label class="radio-label">
								<radio value="是" />是
							</label>
							<label class="radio-label">
								<radio value="否" />否
							</label>
						</radio-group>
					</view>
					
					<!-- Question 5 -->
					<view class="question">
						<text>5. 是否申报检疫</text>
						<radio-group name="检疫" @change="onChange">
							<label class="radio-label">
								<radio value="是" />是
							</label>
							<label class="radio-label">
								<radio value="否" />否
							</label>
						</radio-group>
					</view>
					
					<!-- Question 6 -->
					<view class="question">
						<text>6. 检疫是否合格</text>
						<radio-group name="检疫合格" @change="onChange">
							<label class="radio-label">
								<radio value="是" />是
							</label>
							<label class="radio-label">
								<radio value="否" />否
							</label>
						</radio-group>
					</view>
					
					<checkbox-group @change="onDeclarationChange">
						<label class="checkbox-label">
							<checkbox :checked="checked" />我保证以上信息真实无误。
						</label>
					</checkbox-group>

					<!-- Submit Button -->
					<button style="margin-top: 30px;" form-type="submit">提交</button>
					<button form-type="reset">重置选项</button>

				</form>

			</div>
		</div>
	</div>
</template>

<script>
	import {
		submitQuestionnaire
	} from ".../../../api/wxsj/submitQuestionnaire";
	export default {
		data() {
			return {
				formDataCount: 0,
				checked: false
			};
		},
		methods: {
			onChange(event) {
				this.formDataCount = this.formDataCount + 1;
			},
			onDeclarationChange(){
				this.checked = !this.checked;
			},
			formSubmit: function(e) {
				if(this.formDataCount<6){
					uni.showToast({
						title: '请填写所有信息',
						icon: 'none'
					});
					return;
				}
				if (!this.checked) {
					uni.showToast({
						title: '请勾选确认信息真实无误',
						icon: 'none'
					});
					return;
				}
				var formdata = e.detail.value

				submitQuestionnaire(formdata).then(res => {
					this.resetFormData()
					// 返回首页
				});
			},
			resetFormData() {
				this.formDataCount = 0;
				this.checked = false;
			},
						
		}
	}
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
		/* 删除了错误的注释格式，并确保 padding 正确书写 */
		margin-top: 80px;
		/* 删除了错误的注释格式，并确保 margin-top 正确书写 */
	}

	.section {
		margin-top: 50px;
		margin-bottom: 20px;
		padding: 20px;
		background-color: #FFFFFF;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
	}

	.question {
		margin-bottom: 20px;
	}

	.radio-label,
	.checkbox-label {
		display: block;
		margin: 5px 0;
	}

	radio,
	checkbox {
		transform: scale(0.5);
		/* 修改 scale 值以确保按钮大小适中 */
	}

	.radio-label {
		font-size: 13.5px;
	}
</style>