<template>
	<div id="commodity">
		<mt-header title="我的商品" class='center'>
			<router-link slot="left" to="/percenter">
				<mt-button icon="back"></mt-button>
			</router-link>
			<mt-button slot="right" style='font-size:.3rem;' v-on:click='compiles'>{{compiletitle}}</mt-button>
		</mt-header>
		<!--<div class="store-search">-->
		      <!--<span>-->
		        <!--<em class="icons search-btn"></em>-->
		        <!--<input type="text" placeholder="搜索店内商铺" class="input">-->
		      <!--</span>-->
	    <!--</div>-->
	    <div class="main" v-if="this.shopdetail.length==0?false:true">
    		<!--<ul class="nav">
    			<li>综合 <span><i></i><i></i></span></li>
    			<li>抽用<span><i></i><i></i></span></li>
    			<li>价格<span><i></i><i></i></span></li>
    		</ul>-->
    		<div class="content">
    			<ul class="product">
    				<li v-for="(item,index) in shopdetail">
    					<div class="left">
    						<p class="imag"><img :src="item.image |filterss(2)" :onerror="logos"/></p>
    						<p class="title">{{item.name}}</p>
    						<p class="money">￥{{item.price}}</p>
    						<p class="integral">
    							<span>可获</span>
    							<span>红积分:<em>0.00</em></span>
    							<!--<span>黄积分:<em>0.00</em></span>-->
    						</p>
    					</div>
    					<div class="right" v-if="!compile" @click="look(index,item)" >
    						<img src="../../common/image/qrcodeimg/code.png"/>
    					</div>
    					<div class="right" v-if='compile'>
    						<p @click="delect(index,item)">删除</p>
    					</div>
    				</li>
    			</ul>
    		</div>
	    </div>
	    <div class="bg" v-if="this.shopdetail.length>0?false:true">

	    </div>
	    <!--弹出框-->
	    <mt-popup popup-transition="popup-fade" position="bottom" v-model='popupVisible' class='popup' closeOnClickModal>
			<div class="popup">
				<div class="clear" @click="clear"></div>
				<div class="top">
					<p><img :src="popdetail.image|filterss(2)" :onerror="logos"/></p>
					<p class="tit">{{popdetail.name}}</p>
					<p class="mone">￥{{popdetail.price}}</p>
					<p class="integ">
						<span>可获</span>
						<span>红积分:<em>0.00</em></span>
						<!--<span>黄积分:<em>0.00</em></span>-->
					</p>
					<!--<p class="btn" @click="save">保存</p>-->
				</div>
				<div class="matter">
					<img :src="dataUrl" :onerror="logos"/>
					<!--<img :src="dataUrl" class="code" :onerror="logoNoraml">
    				<canvas ref="canvas" v-show="false"></canvas>-->


				</div>
				<p class="colde">长按图片保存</p>
			</div>
		</mt-popup>

	</div>
</template>

<script>
	import {Popup,Header} from 'mint-ui'
	import qr from 'qr.js'
	export default{
		data(){
			return{
				logoNoraml: 'this.src="' + require('../../common/image/qrcodeimg/qrcode.png') + '"',
				popupVisible:false,
				shopdetail:[],
				token:'',
				popdetail:{},
				dataUrl:'',
				logo: require('../../common/image/qrcodeimg/qrcode.png'),
        logos: 'this.src="' + require('../../common/image/defaultimg.png') + '"',
				size:100,
				compile:false,
				compiletitle:"编辑"
			}
		},
		mounted(){

			this.token=sessionStorage.getItem('token')
			this.$axios({
				method:'post',
				url:'/member/getMemberGoods',
				responseType:'json',
				data:{
					token:this.token
				}
			}).then(data=>{
				this.shopdetail=data.data.res_data.memberGoods
			}).catch(err=>{
				console.log(err)
			})
		},
		methods:{
			//查看二维码
			look(index,item){
				this.popupVisible=true;
				this.popdetail=item;
				this.dataUrl=item.qRCodePath
			},
			clear(){
				this.popupVisible=false
			},
			//编辑
			compiles(){
				if(this.compile){
					this.compile=false
					this.compiletitle='编辑'
				}else{
					this.compile=true
					this.compiletitle='完成'
				}

			},
			//删除
			delect(index,valu){
				let value={
					token:this.token,
					goodsId:valu.goodsId
				}

				this.$axios({
					method:'post',
					url:'/member/removeMemberGoods',
					responseType:'json',
					data:value
				}).then(data=>{
					if(data.status==200){
						this.shopdetail.splice(index,1)
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		},

	}
</script>

<style lang="scss" scoped="scoped">
#commodity{
	.center{
		background:#fff;
		color:black;
		height:auto;
		font-size:.5rem;
		padding:10px;
	}
	.store-search{
		background:#f5f5f5;
		padding: 0.16rem 0.3rem;
		span{
			border:#eeeeee 1px solid;
			border-radius:0.5rem;
			overflow: hidden;
			background:#ffffff;
			display: inline-block;
			padding:0 0.4rem 0 0.15rem;
			.input{
				width: 7.8rem!important;
				outline: none;
			}
			.search-btn{
				display: inline-block;
				vertical-align: top;
				width: 0.83rem;
				height: 0.83rem;
				background-position:-1.81rem 0;
			}
		}
	}
	.main{
		.nav{
			display: flex;
			justify-content: space-around;
			padding: 10px;
			font-size: .4rem;
			li{
				span{
					display: inline-block;
					vertical-align: middle;
					margin-left: .2em;
					i{
					    display: block;
					    border: 0.12rem solid transparent;
					    width: 0;
					    height: 0;
					    margin-bottom: 0.026rem;
					}
					i:nth-child(1){
						    border-bottom-color: #a6a6a6;
					}
					i:nth-child(2){
						    border-top-color: #f22d07;
					}
				}
			}
		}
		.content{
          .product{
            li{
					display: flex;
					margin-bottom: .3rem;
					.left{
						flex:8;
						font-size:.3rem;
						padding:5px;
						.imag{
							width:2rem;
							height:2rem;
							float: left;
							border-radius: 5px;
							margin-right: .2rem;
							img{
								border-radius: 5px;
								width: 100%;
								height: 100%;
							}
						}
						.title{
							font-size: .3rem;
							height: .8rem;
							overflow: hidden;
							text-overflow: ellipsis;
							display:-webkit-box;
							-webkit-box-orient:vertical;
							-webkit-line-clamp:2;
							word-break: break-all;
						}
						.money{
							font-size: .4rem;
							padding-top: 5px;
							padding-bottom: 5px;
							color:orangered;
						}
						.integral{
							font-size: .2rem;
							span:nth-child(1){
								background:#f22d07;
								color: white;
								padding:.05rem;
								padding-left:.1rem;
								padding-right:.1rem;
								border-radius: .1rem;
							}
							span{
								margin: 0 5px;
							}
							em{
								color: orangered;
							}
						}
					}
					.right{
						flex:1;
						padding:10px;
						padding-top: .5rem;
						p{
							border:1px solid orangered;
							color: red;
							border-radius: .2rem;
							text-align: center;
							margin-top: .5rem;
							padding-top: .2rem;
							padding-bottom: .2rem;
						}
					}
				}
			}
		}
	}
	.bg{
		height:20rem;
		background: url(../../common/image/pic_没有数据@2x.png) no-repeat;
		background-size: 100%;
	}
	.popup{
		/*height: 8rem;*/
		background: white;
		width: 100%;
		.clear{
			width:1rem;
			height:1rem;
			border-radius: 50%;
			background: url(../../common/image/qrcodeimg/close.png) no-repeat;
			background-size:100%;
			float: right;
			margin-top: -.5rem;
			margin-right: .5rem;
		}
		.top{
			padding:5px;
			margin-bottom: .5rem;
			p{
				font-size: .3rem;
				line-height:.5rem;
			}
			p:nth-child(2){
				padding-top:.5rem;
			}
			p:nth-child(1){
				width:3rem;
				height:3rem;
				float: left;
				img{
					width: 100%;
					height:100%;
					margin-right: .2rem;
				}
			}
			p:nth-child(1):after{
				display: block;
				content: "";
				clear:both;
			}
			.mone{
				font-size: .4rem;
				color: orangered;
				padding-bottom: 5px;
			}
			.btn{
				float: right;
				background: #f22d07;
				padding-left: 20px;
				padding-right: 20px;
				color: white;
				border-radius: 20px;
				margin-top: -.8rem;
				margin-right: .15rem;
			}
			.integ{
				span{
					margin:0 2px ;
				}
				span:nth-child(1){
					background:#f22d07;
					padding-left: 5px;
					padding-right: 5px;
					padding-top: 2px;
					padding-bottom: 2px;
					border-radius:5px;
					color: white;
				}
				em{
					color:#f22d07 ;
				}
			}
		}
		.matter{
			margin: auto;
			width:5.6rem;
			height: 5.6rem;
			margin-top:.5rem;
			margin-bottom: .5rem;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.colde{
			text-align: center;
			color: #5A5A5A;
			font-size:.5rem;
			margin-bottom: .5rem;
		}
	}
}
</style>
