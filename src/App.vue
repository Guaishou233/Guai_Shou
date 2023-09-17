<template>
  
    <div>
      <Header></Header>
      <router-view></router-view>
      <Footer v-show="$route.meta.show"></Footer>
    </div>
  
</template>

<script>
import Footer from "@/components/Footer";
import Header from  "@/components/Header";
export default {
  name: 'App',
  components: {
    Footer,
    Header
  },
  mounted(){
    //挂载后开始发送数据请求
    this.$store.dispatch("categoryList");
  }
  
}
</script>

<style>

</style>
