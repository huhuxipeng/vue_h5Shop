<template>
	<div id="shopenterTwo">
		<commonTop header-title="企业入驻" header-type="1" header-class="bg-white" has-back="true"></commonTop>
		<p class="zhu">注：提交的所有复印证件都需要加盖公章</p>
		<div class="main">
			<ul class="content">
				<li>
					<p>企业工商营业执照</p>
					<p class="upimg business"><input type="file" @change="business($event,'business')"/></p>
				</li>
				<li>
					<p>商品生产许可证</p>
					<p class="upimg licence"><input type="file" @change="licence($event,'licence')"/></p>
				</li>
				<li>
					<p>产品质检报告</p>
					<p class="upimg quality"><input type="file" @change="quality($event,'quality')"/></p>
				</li>
				<li>
					<p>品牌授权书</p>
					<p class="upimg brand"><input type="file" @change="brand($event,'brand')"/></p>
				</li>
				<li>
					<p>品牌介绍</p>
					<p><textarea v-model="content" @keyup="judge"></textarea></p>
				</li>
				<li>
					<p>银行开户许可证</p>
					<p class="upimg bank"><input type="file" @change="bank($event,'bank')"/></p>
				</li>
			</ul>
			<p class="nextStep" @click="next">下一步</p>
		</div>

	</div>
</template>

<script>
	import commonTop from '../../components/commonTop'
	export default {
		data() {
			return {
				content: ''
			}
		},
		components: {
			'commonTop': commonTop,
		},
		mounted() {

		},
		methods: {
			judge(){
				
				if(this.content.length>140){
					alert('字符不能超过140')
					this.content=this.content.slice(0,139)
				}
			},
		
			business(even,labels){
				this.upchangeImg(even,labels)
			},
			licence(even,labels){
				this.upchangeImg(even,labels)
			},
			quality(even,labels){
				this.upchangeImg(even,labels)
			},
			brand(even,labels){
				this.upchangeImg(even,labels)
			},
			bank(even,labels){
				this.upchangeImg(even,labels)
			},
			
			
			//上传图片
			upchangeImg(even,labels) {
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
			next(){
				this.content=this.content.replace(/\s|\xA0/g,"")
				if(this.content==''){
					alert('不能为空')
				}
				this.$router.push('/enter/shopEnterThree')
			},
		},

	}
</script>

<style lang="scss" scoped="scoped">
	#shopenterTwo {
		.zhu {
			padding: .3rem;
		}
		.main {
			padding: .3rem;
			font-size: .3rem;
			.content {
				li {
					display: flex;
					margin-bottom: .2rem;
					p:nth-child(1) {
						flex: 1;
						text-align: right;
					}
					p:nth-child(2) {
						flex: 2;
						margin-left: .7rem;
						width: 4.2rem;
						height: 2.5rem;
						border: 1px solid #ccc;
						position: relative;
						input {
							width: 100%;
							height: 2.4rem;
							font-size: .4rem;
							padding: .1rem;
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
				li:nth-child(5) {
					textarea {
						width: 5.58rem;
						height: 2.35rem;
						resize: none;
						border: none;
					}
					p:nth-child(2):after {
						content: '140字';
						display: block;
						font-size: .4rem;
						position: absolute;
						right: .05rem;
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
			}
		}
	}
</style>