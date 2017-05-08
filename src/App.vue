<template>
  <div>
    <top-bar-component></top-bar-component>
    <div class="container-content">
        <div class="content ui three column grid ">

          <menu-component></menu-component>

          <center-panel-component></center-panel-component>

          <right-panel-component></right-panel-component>

      </div>
    </div>
  </div>
</template>

<script>
import topBarComponent from './components/top-bar-component.vue'
import menuComponent from './components/menu/menu-component.vue'
import rightPanelComponent from './components/right-panel-component.vue'
import centerPanelComponent from './components/center-panel-component.vue'

export default {
  name: 'app',
  components: {
    topBarComponent,
    menuComponent,
    rightPanelComponent,
    centerPanelComponent
  }
}

</script>
