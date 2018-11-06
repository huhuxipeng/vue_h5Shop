
<template>
	<div id="integralWay">
		<mt-header flexd title="提现" class="shop">
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
    <div class="tishi">
      <p>
        <span>可提现积分：{{datas.hasRedPoint||datas.hasYellowPoint || 0}}积分</span>
        <span>（{{datas.pointScale}}积分={{datas.rmbScale}}人民币）</span>
      </p>
      <p>可提现金额：￥{{Number(datas.canDrawMax).toFixed(2)||0.00}}</p>
    </div>

		<div class="top">
      <span>提现积分</span>
      <input type="number" v-model="money" :placeholder="placeholder" @blur="upkey(money)" />
    </div>

		<div class="wayadd">
			<p style="padding: .2rem;">提现到</p>
			<div class="ways">
				<ul>
					<li v-for="(item,$index) in arr" v-on:click="ons" v-if="bank">
						<img :src="item.sr |filterss(4)" />
						<span>{{item.tit}}</span>
						<span><span></span></span>
					</li>
          <li v-if="!bank" v-on:click="ons">
            <img :src="bankcontent.bankImage |filterss(4)" :onerror="logo" class="imgwidth">
            <span>{{bankcontent.accountName}}</span>
            <span>{{bankcontent.accountNo | numberssid}}<span></span></span>
          </li>
				</ul>
			</div>
		</div>

		<div class="declare">
			<p v-for="item in ruless">{{item}}</p>
		</div>
		<div class="btns">
			<p @click="success" class="btn">完成</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        logo: 'this.src="' + require('../../common/image/defaultimg.png') + '"',
				money: null,
				arr:[
					{
						sr: require('../../common/image/shopImg/bank.png'),
						tit: '银行卡'
					}]
				,
				indexs: 0,
				token: '',
				num: 0,
				content: [],
				placeholder: '请输入提现金额，最小￥0积分起提',
        bank:true,
        bankcontent:{},
        datas:{},
        ruless:[]
			}
		},
    filters:{
      numberssid:function(num){
        return num.substr(0,4)+"********"+num.substr(-4);
      }
    },
		mounted() {
			this.token = sessionStorage.getItem('token')
      let red=sessionStorage.red;
      let yellow=sessionStorage.yellow;
      let cloud=sessionStorage.cloud;
      let urls=''
      if(red){
        urls='/member/redPointDrawInit'
      }else if(yellow){
        urls='/member/yellowPointDrawInit'
      }
			this.$axios({
				method: 'post',
				url:urls,
				responseType: 'json',
				data: {
					token: this.token
				}
			}).then(data => {
        this.datas=data.data.res_data
				this.placeholder = '请输入提现金额，最小'+data.data.res_data.sill + '积分起提';
        let a = this.datas.remark.split('\r\n');
        this.ruless = a.splice(0, a.length);
        console.log(Object.keys(data.data.res_data.bankCard).length)
        if(Object.keys(data.data.res_data.bankCard).length!=0){
          this.bank=false
          this.bankcontent=data.data.res_data.bankCard
        }else if(sessionStorage.BANKCONTEN){
          this.bank=false
          this.bankcontent=JSON.parse(sessionStorage.BANKCONTEN)
        }
			}).catch(err => {
				console.log(err)
			})


		},
		methods: {
			backgo() {
        sessionStorage.removeItem('red');
        sessionStorage.removeItem('yellow');
        sessionStorage.removeItem('cloud')
        sessionStorage.removeItem('BANKCONTEN');
				this.$router.go(-1);

			},
			ons(index) {
			  sessionStorage.removeItem('BANKCONTEN')
			  this.$router.push({path:'/bank/banklist',query:{back:1}})

// 				let that = this;
// 				this.indexs = index
// 				if(this.indexs == index) {
// 					this.$axios({
// 						method: 'post',
// 						url: '/member/getWithdrawalDetial',
// 						responseType: 'json',
// 						data: {
// 							token: this.token
// 						}
// 					}).then(data => {
// 						this.content = data.data.res_data
// 						switch(index) {
// //							case 0:
// //								if(this.content.alipayInfo.accountName == '' && this.content.alipayInfo.accountNo == "") {
// //									this.hints = true
// //									window.window.setTimeout(function() {
// //										that.hints = false;
// //									}, 1500);
// //								}
// //								break;
// //							case 1:
// //								if(this.content.wechatInfo.accountName == "" && this.content.wechatInfo.accountNo == "") {
// //									this.hints = true
// //									window.setTimeout(function() {
// //										that.hints = false;
// //									}, 1500);
// //								}
// //								break;
// 							case 0:
// 								if(this.content.bankcardList.length == 0) {
// 									this.hints = true
// 									window.setTimeout(function() {
// 										that.hints = false;
// 									}, 1500);
// 								}
// 								break;
// 						}
// 					}).catch(err => {
// 						console.log(err)
// 					})
// 				}
			},
			upkey(val) {
				if(val!=''){
					this.money = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
				}

			},
			success() {
        let red=sessionStorage.red;
        let yellow=sessionStorage.yellow;
        let urls='';
        let indexs=0;
        let obj={};
        if(red){
          indexs=1
          urls='/member/redPointDraw';
          obj={'accountName':this.bankcontent.accountName,'accountNo':this.bankcontent.accountNo,'branchName':this.bankcontent.branchName,'drawPoint':this.money,'drawType':2,'openBank':this.bankcontent.openBank,'openBankCity':this.bankcontent.openBankCity,'token':this.token}
        }else if(yellow){
          indexs=2
          urls='/member/yellowPointDraw';
          obj={'accountName':this.bankcontent.accountName,'accountNo':this.bankcontent.accountNo,'branchName':this.bankcontent.branchName,'drawPoint':this.money,'drawType':2,'openBank':this.bankcontent.openBank,'openBankCity':this.bankcontent.openBankCity,'token':this.token}
        }

				if(this.money==null) {

					alert('请输入提现金额')
				} else {
          console.log(this.datas.sill)
          console.log(this.money)
          if(this.money>=this.datas.sill){
            if(this.bank==false){
              // console.log(1111)
              this.$axios({
                method: 'post',
                url: urls,
                responseType: 'json',
                data: obj,
              }).then(data => {
                if(data.status == 200) {
                  if(data.data.res_code==0){
                    sessionStorage.removeItem('red');
                    sessionStorage.removeItem('yellow');
                    sessionStorage.removeItem('cloud')
                    sessionStorage.removeItem('BANKCONTEN');
                    this.$router.push('/depositsuccess');
                  }else{
                    sessionStorage.removeItem('red');
                    sessionStorage.removeItem('yellow');
                    sessionStorage.removeItem('cloud')
                    sessionStorage.removeItem('BANKCONTEN');
                    alert(data.data.res_info)
                    this.$router.push({path:'/integral',query:{indexs:indexs}});
                  }
                }
              }).catch(err => {
                console.log(err)
              })
            }else{
              alert('请选择银行卡')
            }

          }else {
            alert('提现积分过低')
          }

				}

			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#integralWay {
		background: #F5F5F5;
		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			   -webkit-appearance: none !important;
			margin: 0;
		}
		.shop {
			background: #fff;
			color: black;
			height: auto;
			font-size: .5rem;
			padding: 10px;
			display: flex;
		}
    .tishi {
      font-size: .4rem;
      padding: .2rem;
      font-size: .3rem;
      color: rgb(153, 153, 153);
      p:first-child{
        padding: .2rem;
        padding-bottom: .4rem;
        display: flex;
        justify-content: space-between;
        span:nth-child(2){
          text-align: right;
        }
      }
      p:nth-child(2){
        padding: .3rem;
        background: orangered;
        color: white;
        font-size: .4rem;
        text-align: center;
        border-radius: .1rem;
      }
    }
    .top {
      margin-top: .3rem;
      background: white;
      padding:.2rem;
      line-height: 1.2rem;
      font-size: .4rem;
      input {
        width: 70%;
        font-size: .42rem;
        padding:.1rem;

        outline: none;
      }
    }

		.wayadd {
			background: white;
			/*padding: 10px;*/
			padding-top: 20px;
			font-size: .4rem;
			.ways {
				padding: .2rem;
				margin-bottom: 10px;
				li {
					font-size: .4rem;
					padding-top: 15px;
					padding-bottom: 15px;
					img {
						vertical-align: middle;
						width: 5%;
						height: 5%;
						margin-right: 10px;
					}
					span:nth-child(3) {
						float: right;
						display: inline-block;
            padding-top: .2rem;
            span{
              vertical-align: middle;
              display: inline-block;
              width: .5rem;
              height: .5rem;
              background: url("../../common/image/backgo.png") no-repeat;
              background-size: 50% 100%;

            }
					}
				}
        .imgwidth{
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
			}
		}
		.hint {
			padding-left: .5rem;
			padding-right: .5rem;
			background: white;
			text-align: center;
			/*height: 4rem;*/
			width: 6rem;
			p:first-child {
				font-size: .5rem;
				line-height: 1rem;
				padding-top: .5rem;
			}
			p:last-child {
				color: #B3B3B3;
				line-height: .5rem;
				font-size: .4rem;
				padding-bottom: .5rem;
			}
		}
		.declare {
			color: rgb(153, 153, 153);
			line-height: 2;
			padding: .2rem;
		}
		.btns {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			.btn {
				text-align: center;
				color: white;
				font-size: .5rem;
				background: url(../../common/image/btnbg.png) no-repeat;
				background-size: 100%;
				padding-top: .4rem;
				padding-bottom: .4rem;
			}
		}
	}
</style>
