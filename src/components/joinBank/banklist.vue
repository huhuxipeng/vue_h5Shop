<template>
	<div id="banklist">
		<mt-header title="银行卡管理" class='centers'>
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<ul class="main">
			<li v-for="(item,index) in arr" @click="integralgo(item)">
				<p class="top">
					<span><img :src="item.bankImage |filterss(3)" :onerror="logo"/></span>
					<span>{{item.openBank}}</span><br />
					<span>{{item.accountName}}</span>
				</p>
				<p class="cardnumber">{{item.accountNo | numbers}}</p>
				<div class="bottommatter">
					<p @click="defaults(index,item)">
						<span class="mo" :class="{'clor':index==moren}">
								<input type="radio" value="" class="radios" :class="{'inputbg':index==moren}" v-model="redi"/>
								设为默认值
							</span>
					</p>
					<p>
						<span @click="clear(index)" class="clear"><img src="../../common/image/del.png" slot='icon' />删除</span>
					</p>
				</div>
			</li>
		</ul>
		<div class="joincard">
			<p @click="joincards"><img src="../../common/image/joincard.png" />添加银行卡</p>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				logo: 'this.src="' + require('../../common/image/defaultimg.png') + '"',
				token: '',
				redi: '',
				arr: [],
				images: require('../../common/image/shopImg/right.png'),
        moren:0
			}
		},
		mounted() {
			sessionStorage.removeItem('BANK');
			sessionStorage.removeItem('cardtype');
			sessionStorage.removeItem('mobile')


			this.token = sessionStorage.getItem('token')
			this.$axios({
				method: 'post',
				url: '/member/bankCardList',
				responseType: 'json',
				data: {
					token: this.token
				}
			}).then(data => {
				this.arr = data.data.res_data.resultMap

				for(let i=0;i<this.arr.length;i++){
					if(this.arr[i].isDefault==1){
            this.moren=i
					}
				}

			}).catch(err => {
				console.log(err)
			})

		},
		filters:{
			numbers:function(num){
				var reg = /^(\d{4})\d+(\d{4})$/;
				num = num.replace(reg, "$1****$2");
				return num
			}
		},
		methods: {
			backgo() {
				this.$router.push('/Percenter')
			},
			defaults(index, val) {
				this.arr[index].show = !this.arr[index].show;
				for(var i = 0; i < index + 1; i++) {
					if(i == index) {
						if(this.arr[index].show) {
              this.moren=i
							this.$axios({
								method: 'post',
								url: '/member/setDefaultBankCard',
								responseType: 'json',
								data: {
                  cardNum: val.accountNo,
									token: this.token
								}
							}).then(data => {
								//								console.log(data)
							}).catch(err => {
								console.log(err)
							})
						}
					}
				}
			},
			clear(index) {
				console.log(index)
				//删除地址
				this.$axios({
					method:'post',
					url:"/member/bankCardUnbind",
					data:{
						cardNum:this.arr[index].accountNo,
						token:this.token
					},
					responseType:'json',
				}).then(data=>{
					console.log(data)
				}).catch(err=>{
					console.log(err)
				})
				this.arr.splice(this.index, 1)
				this.showhiden=false
			},
			joincards(){
				this.$router.push('/bank/joinbank')
			},
      integralgo(val){
			  if(this.$route.query.back==1){
			    sessionStorage.BANKCONTEN=JSON.stringify(val)
			    this.$router.go(-1)
        }
      },
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#banklist {
		padding: .1rem;
    .clor{
      color: red;
    }
    .inputbg{
      background: url("../../common/image/shopImg/right.png");
      background-size: 100%;
    }
		.centers {
			padding: .2rem;
			background: #fff;
			color: black;
			height: auto;
			font-size: .5rem;
			padding: .2px;
		}
		.main {
			padding: .2rem;
			margin-bottom: .3rem;
			li {
				padding: .2rem;
				margin-bottom: .2rem;
				box-shadow: .1rem .1rem 10px #ccc;
				border-left: 1px solid #ccc;
				border-top: 1px solid #ccc;
				.top {
					height: 2rem;
					margin-bottom:.5rem;
					span:nth-child(1) {
						display: inline-block;
						width: 2rem;
						height: 2rem;
						border-radius: 100%;
						float: left;
						margin-right: .2rem;
						vertical-align: middle;
						img {
							border-radius: 100%;
							width: 100%;
							height: 100%;
						}
					}
					span:nth-child(2) {
						vertical-align: middle;
						font-size: .5rem;
						font-weight: bolder;
						line-height: 2.5;
					}
					span:nth-child(4) {
						color: #CCCCCC;
						font-size: .45rem;
					}
				}
				.cardnumber {
					font-size: .5rem;
					height: 1rem;
				}
				.bottommatter {
					padding-left: 10px;
					padding-right: 10px;
					border-top: 1px solid #eee;
					display: flex;
					justify-content: space-between;
					font-size: .3rem;
					.radios {
						display: inline-block;
						width: .35rem;
						height: .35rem;
						margin-right: 5px;
						border: 1px solid #ccc;
						border-radius: 50%;
						vertical-align: middle;
						outline: none;
					}
					p:nth-child(2) {
						span:nth-child(2) {
							margin-left: .3rem;
						}
						img {
							width: .35rem;
							height: .45rem;
							margin-right: .1rem;
						}
					}
				}
			}
		}
		.joincard {
			p{
				border-left: 1px solid #ccc;
				border-top: 1px solid #ccc;
				margin-left: .3rem;
				margin-right: .3rem;
				padding: .3rem;
				text-align: center;
				font-size: .4rem;
				box-shadow: .2rem .2rem 10px #ccc;
				img{
					width: .5rem;
					height: .5rem;
					vertical-align: middle;
					margin-right: .2rem;
				}
			}
		}
	}
</style>
