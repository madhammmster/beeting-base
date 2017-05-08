

<template>

    <div class="left-menu column two wide centered grid">        

             <menu-item-component 
                v-for="item in items" 
                v-bind:item="item"
                v-bind:key="item.value">
            </menu-item-component>

    </div>

</template>

<script>
import menuItemComponent from './menu-item-component.vue'

export default {
  name: 'menu-component',
  data: function () {
  return {
    items: [
      { value: 'HOME', url: '/app/', icon:'home', current: 1 },
      { value: 'FAVORITE DISCIPLINES', url: '/disciplines', icon:'favorites', current: 0 },
      { value: 'LIST OF BETS',url: '/bets', icon:'list-icon',  current: 0 },
      { value: 'PROFILE', url: '/app/profile', icon:'profile', current: 0 },
      { value: 'SETTINGS', url: '/settings', icon:'settings', current: 0 },
    ]
  }
},
  components: {
    menuItemComponent
  }
}
</script>