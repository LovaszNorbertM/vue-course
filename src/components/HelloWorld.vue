<template>
  <div class="hello">
    <slot a;lsda;ldsksa;dl></slot>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  name: 'HelloWorld',
  // props: ['initialMessage'],//Array
  // props: {
  //   initialMessage: String,
  // },
  props: {
    msg: {
      type: String,
      default: ''
    },
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
