<template>
	<div id="enter">
		<mt-header flexd title="商家入驻" class="header">
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="conter">
			<p>如何加入巨柚平台</p>
			<ul class='list'>
				<li>
					<img src="../common/image/refer.png"/><br />提交资料
				</li>
				<li>
					<img src="../common/image/audit.png"/><br />资料审核
				</li>
				<li>
					<img src="../common/image/online.png"/><br />签约上线
				</li>
			</ul>
			<div class="phones">
				<p class="tell">
					<span>入驻热线</span>
					<span class="tell">400-619-9669</span>
				</p>
			</div>
		</div>
		<div class="footer">
			<input type="button" class="btn" value="立即加入" v-on:click="join"/>
		</div>
		
		
		
		
		
	</div>
</template>

<script>
//	import {} from 'mint-ui'
	export default{
		data(){
			return{
				
			}
		},
		mounted(){},
		methods:{
			backgo(){
				this.$router.go(-1)
			},
			join(){
				alert(1)
			}
		}
	}
	
	
	
</script>

<style lang="scss" scoped="scoped">
#enter{
	background: #F5F5F5;
	.header {
		background: white;
		padding: 10px;
		color: black;
		font-size: .6rem;
		/*margin-bottom: .5rem;*/
		/*border-bottom: 1px solid #eee;*/
	}
	.conter{
		
		p{
			padding: .3rem;
			font-size:.4rem;
			color: rgb(153, 153, 153);
			line-height: 1.2;
		}
		.list{
			padding: .3rem;
			padding-top: .5rem;
			background: white;
			display: flex;
			justify-content: space-around;
			font-size: .4rem;
			margin-bottom: .3rem;
			li{
				flex: 1;
				text-align: center;
				img{
					padding-bottom: .3rem;
					display:inline-block;
					width: 1.2rem;
				}
			}
		}
		.phones{
			background: white;
			p{
				display:flex;
				justify-content: space-between;
				span{
					display: inline-block;
				}
			}
			
		}
	}
	.footer{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		
		.btn{
			padding: .3rem;
			background: url(../common/image/btnbg.png) no-repeat;
			background-size: 100% 100%;
			width: 100%;
			text-align: center;
			color:white;
			font-size:.5rem;
		}
	}
}


</style>