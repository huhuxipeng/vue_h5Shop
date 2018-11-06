<template>
	<div id="shopenterOne">
		<commonTop header-title="企业入驻" header-type="1" header-class="bg-white" has-back="true"></commonTop>
		<div class="main">
			<ul class="content">
				<li>
					<p>店铺类型</p>
					<p>
						<label><input type="radio" :value="1" v-model="content" @change="check('0')" name="radios"/>旗舰店</label>
						<label><input type="radio" :value="2" v-model="content" @change="check('1')" name="radios"/>专营店</label><br />
						<label><input type="radio" :value="3" v-model="content" @change="check('2')" name="radios"/>专卖店</label>
						<label><input type="radio" :value="4" v-model="content" @change="check('3')" name="radios"/>普通店</label>
					</p>
				</li>
				<li>
					<p>企业名称</p>
					<p><input type="text" value="" v-model.trim="shopName" /></p>
				</li>
				<li>
					<p>法人姓名</p>
					<p><input type="text" value="" v-model.trim="personName" /></p>
				</li>
				<li>
					<p>法人身份证号</p>
					<p><input type="number" value="" v-model.trim="personNumber" @input="oninput" /></p>
				</li>
				<li>
					<p>法人身份证正面</p>
					<p class="personImg"><input type="file" @change="upchange($event)" /></p>
				</li>
				<li>
					<p>法人身份证背面</p>
					<p class="personImg"><input type="file" @change="upchanges($event)" /></p>
				</li>

				<li>
					<p>负责人</p>
					<p><input type="text" /></p>
				</li>
				<li>
					<p>手机号</p>
					<p><input type="number" v-model.trim="mobile" class="phones" /></p>
				</li>
				<li>
					<p>邮箱</p>
					<p><input type="text" v-model.trim='emails' class="email" /></p>
				</li>
				<li>
					<p>联系地址</p>
					<p><input type="text" v-model.trim="address" /></p>
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
				content: [],
				shopName: '',
				personName: '',
				personNumber: '',
				mobile: '',
				emails: '',
				address: ''
			}
		},
		components: {
			'commonTop': commonTop,
		},
		mounted() {

		},
		methods: {
			check(val) {
				let radios = document.getElementsByName("radios");
				for(let i = 0; i < radios.length; i++) {
					if(i == val) {
						radios[i].style.backgroundColor = 'red'
						this.content = val
					}
					if(i != val) {
						radios[i].style.background = 'none'
					}
				}
			},
			oninput() {
				this.personNumber = this.personNumber.length > 18 ? this.personNumber.slice(0, 18) : this.personNumber
			},
//			phones() {
//
//				var reg = /^1[1-9]\d{9}$/;
//				if(!(reg.test(this.mobile))) {
//					document.getElementsByClassName("phones")[0].style.border = '1px solid red'
//					alert("号码不正确")
//				} else {
//					document.getElementsByClassName("phones")[0].style.border = 'none'
//				}
//
//			},
//			email() {
//				var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
//				if(!(reg.test(this.emails))) {
//					document.getElementsByClassName("email")[0].style.border = '1px solid red'
//					alert("邮箱不正确")
//				} else {
//					document.getElementsByClassName("email")[0].style.border = 'black'
//				}
//
//			},
			upchange(even) {
				//				console.log(even.target.files)

				let personImg = document.getElementsByClassName("personImg")[0]
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
			upchanges(even) {
				let personImg = document.getElementsByClassName("personImg")[1]
				let img = document.createElement("img");
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
//				personImg.classList.add("afters")
				personImg.appendChild(img)
			},
			//下一步
			next() {
				this.$router.push('/enter/shopEnterTwo')
				//去除空格
				var inputs = document.getElementsByTagName('input')
				for(let i = 0; i < 13; i++) {
					if(inputs[i].value == null || inputs[i].value == '') {
						switch(i) {
							case 4:
								alert('企业名称不能为空')
								break;
							case 5:
								alert('法人姓名不能为空')
								break;
							case 6:
								alert('法人身份证号不能为空')
								break;
							case 7:
							case 8:
								alert('法人身份证照片不能为空')
								break;
						}
					}
				}

				//手机号
				var phone = /^1[1-9]\d{9}$/;
				if(!(phone.test(this.mobile))) {
					document.getElementsByClassName("phones")[0].style.border = '1px solid red'
					alert("号码不正确")
				} else {
					document.getElementsByClassName("phones")[0].style.border = 'none'
				}
				//邮箱
				var emai = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
				if(!(emai.test(this.emails))) {
					document.getElementsByClassName("email")[0].style.border = '1px solid red'
					alert("邮箱不正确")
				} else {
					document.getElementsByClassName("email")[0].style.border = 'black'
				}

			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#shopenterOne {
		.main {
			padding: .3rem;
			font-size: .3rem;
			.content {
				li {
					display: flex;
					margin-bottom: .2rem;
					p:nth-child(2) {
						flex: 2;
						display: table;
						line-height: 2.5;
						input {
							border: 1px solid #C8C8CD;
							margin-left: .5rem;
						}
						input[type=radio] {
							width: .5rem;
							height: .5rem;
							border-radius: 50%;
							margin-right: .2rem;
							vertical-align: middle;
						}
					}
					p:nth-child(1) {
						flex: 1;
						text-align: right;
						line-height: middle;
						margin-top: .2rem;
					}
				}
				li:nth-child(2),
				li:nth-child(3),
				li:nth-child(4),
				li:nth-child(7),
				li:nth-child(8),
				li:nth-child(9),
				li:nth-child(10),
				{
					input {
						font-size: .4rem;
						padding: .1rem;
					}
				}
				li:nth-child(5),
				li:nth-child(6) {
					input {
						width: 4.2rem;
						height: 2.5rem;
						font-size: .4rem;
						padding: .1rem;
						opacity: 0;
					}
					.personImg {
						margin-left: .7rem;
						width: 4.2rem;
						height: 2.5rem;
						border: 1px solid #ccc;
						position: relative;
					}
					.personImg:after {
						content: '上传图片';
						display: block;
						text-align: center;
						margin-top: -2rem;
						font-size: .4rem;
						z-index: -2;
						position: absolute;
						left: 40%;
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
