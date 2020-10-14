<template>
  <div style="width: 256px">
    <a-button type="primary" size="large" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="collapsed ? 'right-circle' : 'left-circle'" />
    </a-button>
    <a-menu
      :default-selected-keys="['1']"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <a-menu-item key="1">
        <a-icon type="smile" />
        <span>All</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="menu" /><span>Screenshots</span></span>
        <a-menu-item key="5">
          Racing
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="highlight" /><span>Review</span></span>
        <a-menu-item key="9">
          Option 9
        </a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11">
            Option 11
          </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-menu-item key="4">
        <a-icon type="menu" /><span>Guides</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
// // @ is an alias to /src
export default {
  name: 'Store',
  components: {
  },
  data () {
    return {
      collapsed: false,
      selectedKeys: ['1'],
      openKeys: ['sub1'],
      preOpenKeys: ['sub1']
    }
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>
