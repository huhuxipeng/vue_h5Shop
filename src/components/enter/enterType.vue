<template>
	<div id="entertype">
		<commonTop header-title="商家入驻" header-type="1" header-class="bg-white" has-back="true"></commonTop>
		<div class="main">
			<div class="shopenter">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.</p>
				<button @click="enter('shop')">商家入驻</button>
			</div>
			<div class="personage">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.</p>
				<button @click="enter('per')">个人入驻</button>
			</div>
		</div>

	</div>
</template>

<script>
	import commonTop from '../../components/commonTop'
	export default {
		data() {
			return {

			}
		},
		components: {
			'commonTop': commonTop,
		},
		methods: {
			enter(vals){
				if(vals=='shop'){
//					alert('shop')
					this.$router.push('/enter/shopEnterOne')
				}else if(vals=='per'){
					alert("per")					
//					this.$router.push('')
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#entertype {
		.main{
			padding:.5rem;
			font-size:.3rem;
			line-height:1.5;
			text-align: center;
			.shopenter {
				margin-bottom: 1rem;
				p{
					text-align: left;
					padding-top: .3rem;
					padding-bottom: .5rem;
				}
				
			}
			button{
				padding: .2rem;
				padding-left:.4rem;
				padding-right: .4rem;
				border: 1px solid black;
				background: none;
				border-radius:.1rem;
			}
			.personage{
				p{
					text-align: left;
					padding-top: .3rem;
					padding-bottom: .5rem;
				}
				
			}
		}
		
	}
</style>