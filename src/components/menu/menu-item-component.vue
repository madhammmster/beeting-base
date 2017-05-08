<template>

  <div class="menu-item row">
  <!--<a v-bind:href="item.url">-->
  <router-link v-bind:to="item.url">
    <div class="menu-item-icon" v-bind:class="item.icon"></div>
    <div class="menu-item-text">
         {{item.value}}
    </div>
  </router-link>
  <!--</a>-->
  </div>

</template>



<script>

export default {
  name: 'menu-item-component',
  props: ['item']
}

</script>

