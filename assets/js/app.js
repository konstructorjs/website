/* add your js here */
/* eslint-disable no-new, import/no-extraneous-dependencies */
import Vue from 'vue';

new Vue({
  el: '#main-navbar',
  data: {
    active: false,
  },
  methods: {
    toggleActive() {
      this.active = !this.active;
    },
  },
});
