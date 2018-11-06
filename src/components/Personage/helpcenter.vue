<template>
    <div id="helpcenter">
      <mt-header flexd title="帮助中心" class="tops">
        <mt-button icon="back" @click="backgo" slot="left"></mt-button>
      </mt-header>
    </div>
</template>

<script>
    export default {
        name: "helpcenter",
      data(){
          return{

          }
      },
      mounted(){

      },
      methods:{
        backgo() {
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped lang="scss">
#helpcenter{
  .tops {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 10px;
    color: black;
    font-size: .5rem;
    z-index: 1000;
  }
}
</style>
