<template>
    <div class="about">
        <p>I'm Coming!{{about}}</p>
        <img src="../../assets/images/jiaju.jpg" alt="jiaju" />
    </div>
</template>

<script>
export default {
    data(){
        return{
            about:"Webpack4 + Vue2"
        }
    }
}
</script>

<style>
.about{
    color: lawngreen;
}
</style>
