<template>
  <div class="yto-login-bg">
    <iframe :src="iframeUrl" style="width: 100%; height: 100%; border: 0; display: block;"></iframe>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        iframeUrl: 'static/three/bird.html'
      };
    }
  };
</script>
