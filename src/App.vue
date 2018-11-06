<template>
  <div id="app">
    <router-view v-if='show'></router-view>
    <div class="bg" v-if='!show'>
    	
    </div>
  </div>
</template>

<script>
export default {
	data(){
		return{
			show:false
		}
	},
	mounted(){
		if(navigator.onLine){
			this.show=true	
		
		}else{
			this.show=false		
		}
	}
}
</script>
<style scoped="scoped" lang="scss">
	.bg{
		height: 15rem;
		background:url(./common/image/pic_没有数据@2x.png) no-repeat;
		background-size: 100%;
	}
	/*.back-transition{
		transition: transform 50s linear;
	}
	.back-enter{
		transform:translate(100%,0);
	}
	.back-leave{
		transform: translate(-100%,0);
	}*/
</style>

