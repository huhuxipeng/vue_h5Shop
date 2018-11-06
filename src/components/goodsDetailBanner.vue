<template>
	<div class="swiper-container" id="page">
		<div class="swiper-wrapper" id="swiper-wrapper">
			<div class="swiper-slide" v-for="(item,index) in listImg">
				<img :src="item.image" :onerror="logo" />
			</div>
		</div>
		<div class="swiper-pagination swiper-pagination-white"></div>
	</div>
</template>

<script>
	import Swiper from 'swiper';
	export default {
		data() {
			return {
				detail: [],
				logo: 'this.src="' + require('../common/image/defaultimg.png') + '"',
			}
		},
		props:{'listImg':Array},
		mounted(){
			
			const swiper = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				loop: true,
				speed: 500,
				autoplay: 5000,
				onTouchEnd: function() {
					swiper.startAutoplay()
				},
				onInit: function(swiper) {
					document.getElementById("swiper-wrapper").style.transform = "translate3d(0px, 0px, 0px)"
				},
				onImagesReady: function(swiper) {
					const lengSwi = swiper.slides.length - 3;
					const pageW = document.getElementById('page').offsetWidth / 2;
					// console.log(pageW);
					const wh = -(pageW * lengSwi) + 'px';
					document.getElementById("swiper-wrapper").style.transform = "translate3d(" + wh + ", 0px, 0px)";
				},
				onAfterResize: function(swiper) {}
			});
		},
		methods: {

		}
	}
</script>