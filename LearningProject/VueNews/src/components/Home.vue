<template>
    <div class="content">
        <Slider></Slider>
        <div class="newsList">
	    	<ul>
                <li v-for="(value, index) in arrList">
                    <router-link :to="'/article/' + value.id">
                        <h2>{{index + 1}} . {{value.title}}</h2>
                        <p>{{value.detail}}</p>
                    </router-link>
                </li>
	        </ul>
	    </div>
    </div>
</template>

<script>
import Slider from "./Slider.vue";

export default {
    data(){
        return {
            arrList:[]
        }
    },
    components:{
        Slider
    },
    mounted(){
        this.fetchData();
    },
    methods:{
        fetchData(){
            var _this = this;
            this.$http.get('src/data/index.data').then(res => {
                _this.arrList = res.data
            }).catch(err => {
                console.log(err)
            })
        }
    },
}
</script>

<style scoped>
@import "../assets/css/index.css";
</style>
