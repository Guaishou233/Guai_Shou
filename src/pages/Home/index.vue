<template>
    <div>
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <Like></Like>
        <Floor v-for="(floor,inde) in floorList" :key="floor.id" :floorDataFromHome = "floor"></Floor>
        <Brand></Brand>
    </div>
</template>

<script>
import Brand from "@/pages/Home/Brand";
import Floor from "@/pages/Home/Floor";
import Like from "@/pages/Home/Like";
import ListContainer from "@/pages/Home/ListContainer";
import Rank from "@/pages/Home/Rank";
import Recommend from "@/pages/Home/Recommend";

import { mapState } from "vuex";
export default {
    name: "",
    components: {
        Brand,
        Floor,
        Like,
        ListContainer,
        Rank,
        Recommend
    },
    mounted(){
        this.$store.dispatch("getFloorList");
    },
    computed:{
       ...mapState({
        floorList: state => state.home.floorList
       })
    }
}
</script>

<style scoped></style>