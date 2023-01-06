<template>
    <div>
        <label for="xxx">Title</label>
        <input :value="value" @change="updateParent" id="xxx"/>
    </div>
</template>

<script>
export default {
    name: 'TodoInput',
    props: {
        value: {
            type: String,
            required: true
        },
        todoId: {
            type: Number,
            required: true,
        }
    },

    data() {
        return {
            
        };
    },
    computed: {
        // title: {
        //     get() {
        //         return this.value;
        //     },
        //     set(newValue) {
        //         this.$emit('update:value', newValue);
        //     }
        // }
    },

    methods: {
        updateParent(event) {
            this.$emit('hasChanged', {id: this.todoId, value: event.target.value})
        }
    },
};
</script>

<style scoped>

</style>