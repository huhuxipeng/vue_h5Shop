<template>
	<div id="shopenterThree">
		<commonTop header-title="企业入驻" header-type="1" header-class="bg-white" has-back="true"></commonTop>
		<div class="main">
			<ul class="content">
				<li>
					<p>店铺名称</p>
					<p><input type="text" v-model.trim="shopName" /></p>
				</li>
				<li>
					<p>现有店铺链接</p>
					<p><input type="text" v-model.trim="links" /></p>
				</li>
				<li>
					<p>店铺介绍</p>
					<p><textarea v-model="shop"></textarea></p>
				</li>
				<li>
					<p>店铺logo</p>
					<p class="upimg shopLog"><input type="file" @change="shopLog($event,'shopLog')" /></p>
				</li>
				<li>
					<p>店铺主图</p>
					<p class="upimg shops"><input type="file" @change="shops($event,'shops')" /></p>
				</li>
			</ul>
			<p class="nextStep" @click="submit">提交</p>
		</div>

	</div>
</template>

<script>
	import commonTop from '../../components/commonTop'
	export default {
		data() {
			return {
				shopName: '',
				links: '',
				shop: ''

			}
		},
		components: {
			'commonTop': commonTop,
		},
		mounted() {

		},
		methods: {
			shopLog(even, labels){
				this.upchangeImg(even, labels);
			},
			shops(even, labels){
				this.upchangeImg(even, labels);
			},
			
			
			
			
			
			//上传图片
			upchangeImg(even, labels) {
				//				console.log(even.target.files)
				let personImg = document.getElementsByClassName(labels)[0]
				let img = document.getElementsByTagName("img");
				img = document.createElement("img");
				let file = even.target.files;
				const reader = new window.FileReader();
				reader.readAsDataURL(file[0]);
				reader.onload = function(e) {
					img.src = e.target.result;
					//					console.log(e.target.result)
				}

				img.style.width = "100%";
				img.style.height = '100%';
				img.style.position = 'absolute';
				img.style.left = '0';
				img.style.top = '0';
				img.style.zIndex = "-1";

				personImg.appendChild(img)
			},
			submit(){
				
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#shopenterThree {
		.main {
			padding: .3rem;
			font-size: .3rem;
			.content {
				li {
					display: flex;
					margin-bottom: .3rem;
					p:nth-child(1) {
						flex: 1;
						text-align: right;
						line-height: middle;
						margin-top: .2rem;
					}
					p:nth-child(2) {
						flex: 2;
						margin-left: .7rem;
						border: 1px solid #C8C8CD;
						input {
							font-size: .4rem;
							padding: .1rem;
							opacity: 0;
						}
					}
					.upimg{
						position: relative;
						input{
							width:98%;
							height: 2.5rem;
							opacity: 0;
						}
					}
					.upimg:after {
						content: '上传图片';
						display: block;
						text-align: center;
						margin-top: -1.5rem;
						font-size: .4rem;
						z-index: -2;
						position: absolute;
						left: 45%;
					}
				}
				li:nth-child(3) {
					position: relative;
					textarea {
						width:95%;
						height: 2.35rem;
						font-size: .4rem;
						resize: none;
						padding: .1rem;
						border:none;
					}
					p:nth-child(2):after {
						content: '140字';
						display: block;
						font-size: .4rem;
						position: absolute;
						right: .4rem;
						bottom: .05rem;
					}
				}
			}
			.nextStep {
				text-align: center;
				border: 1px solid orangered;
				border-radius: .1rem;
				padding: .2rem;
				padding-left: .3rem;
				padding-right: .3rem;
				margin-left: 30%;
				margin-right: 30%;
				margin-top: 1rem;
			}
		}
	}
</style>