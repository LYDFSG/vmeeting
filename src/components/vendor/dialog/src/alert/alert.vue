<template>
    <div class="mask-black-dialog">
        <div class="m-confirm m-alert">
            <div class="confirm-bd" v-html="mes"></div>
            <div class="confirm-ft">
                <a href="javascript:;" class="confirm-btn primary" @click.stop="closeAlert">好的</a>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        props: {
            mes: String,
            callback: Function
        }
    }
</script>

<style lang="less">
    @import "../../../../../styles/components/vendor/dialog.less";
</style>
