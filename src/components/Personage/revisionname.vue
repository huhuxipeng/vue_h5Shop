<template>
	<div id="revisionname">
		<commonTop header-title="修改昵称" header-type="1" header-class="bg-white" has-back="true"></commonTop>
		<div class="main">
			<div class="name">
				<u class="num">昵称</u>
				<input type="text" v-model.trim="name" placeholder="请输入昵称" />
			</div>
			<p class="next" @click="right">确认</p>
		</div>
	</div>
</template>

<script>
	import commonTop from '../../components/commonTop'
	export default {
		data() {
			return {
				name: '',
				token: ''
			}
		},
		components: {
			'commonTop': commonTop,
		},
		mounted() {
			this.token = sessionStorage.getItem('token')
		},
		methods: {
			right() {
				if(this.name.length > 10) {
					alert('请输入1-10个字符')
				} else {
					this.$axios({
						method: "post",
						url: '/member/updateMemberInfo',
						responseType: 'json',
						data: {
							token: this.token,
							nickname: this.name
						}
					}).then(data => {

						if(data.status == 200) {
							this.$router.push('/perIndex')
						}
					}).catch(err => {
						console.log(err)
					})
				}

			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#revisionname {
		.main {
			padding: .3rem;
			padding-left: .5rem;
			padding-right: .5rem;
			background:white;
			input {
				font-size: .35rem;
				margin-bottom: .2rem;
				outline: none;
				padding: .2rem;
			}
			.mobile {
				margin-bottom: .3rem;
			}
			.next {
				position: fixed;
				bottom: 0;
				left: 0;
				right: 0;
				text-align: center;
				padding: .3rem;
				font-size: .4rem;
				color: white;
				background: orangered;
			}
		}
	}
</style>