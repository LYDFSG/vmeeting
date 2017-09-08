<template>
    <div class="mask-white-dialog-2">
        <div class="m-toast">
            <div class="iconsClass toast-loading-icon"></div>
            <p class="toast-content" v-html="title"></p>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        props: {
            title: String
        }
    }
</script>
