<template>
  <div id="app">
    {{#router}}
    <router-view/>
    {{else}}
    <HelloWorld/>
    {{/router}}
  </div>
</template>

<script>
{{#unless router}}
import Login from './page/login.vue'

{{/unless}}
export default {
  name: 'App'{{#router}}{{else}},
  components: {
    Login
  }{{/router}}
}
</script>
<style lang="less">
  @import 'assets/css/yto.less';
</style>
