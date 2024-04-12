<template>
	<div class="container">
		<div class="content">
			<div class="section">
				<form @submit="formSubmit">
					
					<!-- Question 1 -->
					<view class="question">
						<text>1. 行为主体（单选）</text>
						<radio-group @change="onSubjectChange">
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
						<radio-group @change="onItemsChange">
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
						<text>3. 是否申报检疫</text>
						<radio-group @change="onQuarantineChange">
							<label class="radio-label">
								<radio value="是" />是
							</label>
							<label class="radio-label">
								<radio value="否" />否
							</label>
						</radio-group>
					</view>

					<!-- Declaration Checkbox -->
					<checkbox-group @change="onDeclarationChange">
						<label class="checkbox-label">
							<checkbox :checked="checked"/>我保证以上信息真实无误。
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
	import {submitQuestionnaire} from "../../api/wxsj/submitQuestionnaire";
	export default {
		data() {
			return {
				formData: {
					subject: '',
					items: '',
					quarantine: ''
				}, 
				checked: false
			};
		},
		methods: {
			onSubjectChange(event) {
			      this.formData.subject = event.detail.value;
			},
			onItemsChange(event) {
			      this.formData.items = event.detail.value;
			},
			onQuarantineChange(event) {
			      this.formData.quarantine = event.detail.value;
			},
			onDeclarationChange(){
				this.checked = !this.checked
			},

			formSubmit: function(e) {
				e.preventDefault();
				// 检查所有字段是否已填写
				if (!this.formData.subject || !this.formData.items || !this.formData.quarantine) {
					uni.showToast({
						title: '请回答所有问题',
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
				
				submitQuestionnaire(this.formData).then (res => {
					this.resetFormData()					
				// 返回首页
				});
			},
			resetFormData() {
				this.formData = {
					subject: '',
					items: '',
					quarantine: ''
				};
				this.checked = false;
			}
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
    padding: 20px; /* 删除了错误的注释格式，并确保 padding 正确书写 */
    margin-top: 80px; /* 删除了错误的注释格式，并确保 margin-top 正确书写 */
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

.radio-label, .checkbox-label {
    display: block;
    margin: 5px 0;
}

radio, checkbox {
    transform: scale(0.5); /* 修改 scale 值以确保按钮大小适中 */
}

.radio-label {
    font-size: 13.5px; 
}
</style>


