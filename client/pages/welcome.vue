<template>
  <div class="welcome">
    <nuxt-link to="/login" class="grey">登录</nuxt-link>
    <nuxt-link to="/register" class="blue">新用户</nuxt-link>
  </div>
</template>

<script>
export default {
  mounted() {

  },
  methods: {
    async getData() {

    }
  }
};
</script>

 <style scoped lang="scss" type="text/css">
.welcome{
  position:absolute;
  width:100%;
  height:100%;
  background: url('../assets/images/splash.png') no-repeat center center;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 2.6rem 1rem;
  a{
    flex: 1;
    margin: 0.5rem;
    line-height: 2.6em;
    color: white;
    border-radius: 0.6rem;
    letter-spacing: 0.2rem;
    &.blue{
      background: #9cf
    }
    &.grey{
      background: #ccc;
    }
  }
}
</style>
