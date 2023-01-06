<template>
    <div class="overlay">
        <div class="dialog">
            <header>
                <slot v-if="withHeader" name="header">
                    <h2>Modal</h2>
                </slot>
                <button
                    @click="close"
                    class="close-btn">
                x
                </button>
            </header>
            <main>
                <slot name="body"></slot>
            </main>
            <footer>
                <slot name="footer" :closeFunction="close"></slot>
            </footer>
        </div>
    </div>
</template>

<script>

export default {
    name: "VuexexampleModal",
    props: {
        withHeader: {
            type: Boolean,
            default: true
        },
        withFooter: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {};
    },
    mounted() {
    },
    methods: {
        close() {
            console.log('im hit');
        }
    },
};
</script>

<style scoped>

</style>