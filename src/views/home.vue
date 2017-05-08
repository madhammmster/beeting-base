<template>
    <div class="main-content column ten wide">
        <div class="main-content-header">
            <div class="main-content-header-icon list-icon"></div>
            <div class="main-content-header-text">HOME</div>               
            <div class="clear"></div>
        </div>
        <div class="main-content-inner-container">
            <ul>
                <li v-for="(value, key) in response[0]">
                Klucz: {{ key }} : Wartosc {{ value }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import Axios from 'axios'

export default {
  name: 'home',
  data: function(){
      return{
        response: ""
      }
  },
  mounted: function(){
    Axios({
        method:'get',
        url:'/api/users'
    }).then(response => this.response = response.data);


  }
};
</script>