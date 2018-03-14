<template>
  <transition name="el-zoom-in-center">
    <div class="yto-jsc-menu">
      <div style="padding-bottom: 30px;">
        <img src="../../assets/img/logo.png"/>
      </div>
      <div style="color: #fff; padding-bottom: 30px;">
        工号：{{empNo}} &nbsp;&nbsp; 姓名：{{name}}
      </div>
      <div v-for="(lvl1, index) in linkList" :key="index" class="linkBox">
        <div v-if="lvl1.children">
          <p>
            <el-tag size="big" style="color: #ddd;">{{lvl1.meta.title}}</el-tag>
          </p>
          <div v-for="lvl2 in lvl1.children">
            <div v-if="lvl2.children">
              <p style="color: #ddd; font-size: 12px; margin-bottom: 3px; margin-top: 20px;">
                {{lvl2.meta.title}}
              </p>
              <div v-for="lvl3 in lvl2.children">
                <div v-if="lvl3.children">
                  <router-link :to="{name:lvl4.name}" v-for="(lvl4, num4) in lvl3.children" :key="num4">{{lvl4.name}}</router-link>
                </div>
                <router-link :to="{name:lvl3.name}" v-else>{{lvl3.name}}</router-link>
              </div>
            </div>
            <router-link :to="{name:lvl2.name}" v-else>{{lvl2.name}}</router-link>
          </div>
        </div>
        <router-link :to="{path:lvl1.path}" v-else>{{lvl1.meta.title}}</router-link>
      </div>
      <div style="margin-top: 50px;">
        <el-button @click="logout" type="primary" round>退出</el-button>
      </div>
    </div>
  </transition>
</template>

<script>
  import { getStore } from '@/components/date';
  import { modulesRouterMap } from '@/router';

  export default {
    components: {},
    data() {
      return {
        name: getStore('name'),
        empNo: getStore('empNo'),
        linkList: modulesRouterMap
      };
    },
    computed: {},
    created() {
      // console.log(JSON.stringify(this.linkList));
    },
    methods: {
      logout() {
        this.$store.dispatch('FedLogOut').then(() => {
          this.$router.push({path: '/login'});
        });
      }
    }
  };
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .linkBox {
    display: inline-block;
    vertical-align: top;
    div a {
      color: #90c6ff;
    }
    div a:hover {
      color: #fff;
    }
  }
</style>
