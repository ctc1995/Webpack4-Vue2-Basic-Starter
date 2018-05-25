<template>
    <div class="home">
        <p>
            <i class="iconfont icon-location"></i>
            You should be login!<br/> {{name}}
        </p>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name:"You can click on the button to login!"
        }
    }
}
</script>

<style>
.home{
    color: lawngreen;
}
</style>