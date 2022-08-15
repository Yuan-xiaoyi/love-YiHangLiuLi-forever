<template>
  <div>
    <div v-for="(item,index) in list" :key="index" style="padding-right: 20px">
      <!-- <router-link
        class="link" :class="{isActive: acitveIndex === index}"
        :to="item.link">{{item.label}}
      </router-link> -->
      <router-link
        :to="item.link"
        v-slot="{ href, navigate}"
        custom
      >
        <li class="link" :class="{isActive: acitveIndex === index}">
          <a :href="href" @click="navigate & linkTo(index)">{{ item.label }}</a>
        </li>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sider',
  data () {
    return {
      acitveIndex: undefined,
      list: []
    }
  },
  watch: {
    '$route' (to, from) {
      if (to && to.name) {
        if (this.list.length > 0) {
          let curRouter = this.list.find(rt => rt.link === to.name)
          if (curRouter) {
            this.linkTo(this.list.indexOf(curRouter))
          } else {
            this.linkTo(0)
          }
        }
      }
    }
  },
  mounted () {
    this.list = this.baseConfig.leftMenus
    if (this.list.length > 0) {
      let curRouter = this.list.find(rt => rt.link === this.$router.currentRoute.name)
      if (curRouter) {
        this.linkTo(this.list.indexOf(curRouter))
      } else {
        this.linkTo(0)
      }
    }
  },
  methods: {
    linkTo (index) {
      this.acitveIndex = index
    }
  }
}
</script>

<style scoped>
  .isActive{
    background: var(--activeBgColor);
    color: var(--activeColor) !important;
  }
  .isActive > a{
    color: var(--activeColor) !important;
  }
  .link{
    color: var(--fontColor);
    line-height: 24px;
    text-indent: 20px;
    list-style: none;
  }
  .link > a{
    color: var(--fontColor);
    text-decoration-line: none;
  }
</style>
