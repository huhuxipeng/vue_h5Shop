<template>
	<div id="toppoto">
		<mt-header flexd title="充值" class="header">
			<mt-button icon="back" @click="backgo" slot="left"></mt-button>
		</mt-header>
		<div class="content">
			<p>
				1、对本店的经营管理负全面责任，行使一切经营管理职权，并接受甲方及甲方指定的负责人的领导、监督，保证本店长效管理，保值增值。    2、负责本店的经营工作，制定本店周＼月目标，并跟踪执行情况。     ３、不得以甲方名义对外提供任何形式的担保以及甲方名义贷款。                            ４、应于每月 10 日前据实向甲方报送本店的业绩报表。 ５、每天定时开晨会，分析业绩，总结经验，分配目标，鼓励店员。  6、对员工的考勤、仪容仪表和服务规范情况进行监督与管理。 7、协调各方面的人际关系，增强员工的凝聚力。  8、维护本店的清洁卫生，设施（消防、电源等）安全管理以防盗窃。  9、维护好客户关系，了解顾客的意见和需求，做好顾客资料档案。  10、加强现场监督，及时发现和纠正质量提高顾客管理。
			</p>
		</div>
		<div class="footer">
			<input type="button" value="我已阅读并同意协议" @click='clicks'/>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				radi:false,
			}
		},
		methods:{
			clicks(){
				this.radi=true
				localStorage.setItem("radi",true);
				var tiem=setTimeout(()=>{
					localStorage.radi=''
					
				},5000);
				this.$router.go(-1)
				
			},
			backgo(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss" scoped>
#toppoto{
	.header{
		background:white;
		padding:10px;
		color:black;
		font-size:.6rem;
		border-bottom:1px solid #eee;
	}
	.content{
		padding: 10px;
		
		p{
			text-indent: 2em;
			line-height:1.8;
			font-size: .3rem;
		}
	}
	.footer{
		margin-top: 80%;
		margin-left: 10px;
		margin-right: 10px;
		input{
			width: 100%;
			padding: 10px;
			background: #ff403c;
			color:white;
			font-size: .4rem;
			letter-spacing: 2px;
			border-radius: 10px;
		}
	}
}
</style>