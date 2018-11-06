<template>
	<div id="how">
		<commonTop header-title="如何成为店长及收益说明" header-type="1" header-class="bg-white" has-back="true"></commonTop>
		<div class="main">
			<i>一、申请店长操作说明及收益：</i>
			<p>
				1关注“巨柚juyooo”公众号<br />
				2点击“巨柚商城”<br />
				3点击个人中心“申请成为店长”<br />
				<img src="../common/image/how/how1.jpg"/><br />
				4进入店长中心，输入手机号码，点击获取验证码，输入验证码，勾选“我已经阅读并同意店长协议”，点击下一步<br />
				<img src="../common/image/how/how2.jpg"/><br />
				5进入“店长条件”，满足以下任意一条，即可获取店长资格<br />
				<img src="../common/image/how/how3.jpg"/><br />
				①“充满200元，立送200云积分”，点击立即充值，输入金额，勾选“我已经阅读并同意充值协议”，点击充值<br />
				<img src="../common/image/how/how4.jpg"/><br />
				②“消费满200元，立送200云积分”，点击立即购买<br />
 				③“购买店长礼包”点击立即购买（指定商品），购买店长礼包，提交订单<br />
				<img src="../common/image/how/how5.jpg"/><br />
				6点击下一步，完成申请店长操作流程<br />
				7已是店长之后，分享产品并且成功购买可以得到分润<br />
				8.店长的下级分润会员成功购买商品，两者都有分润；如果下级是普通会员，只有店长有分润
			</p>
			
		</div>
	</div>
</template>

<script>
import commonTop from '../components/commonTop'
	export default{
		data(){
			return{
				
			}
		},
		components: {
			'commonTop': commonTop,
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#how{
		.main{
			padding:.3rem;
			line-height:1.5;
			i{
				font-weight: bolder;
				display: block;
			}
		}
	}
</style>