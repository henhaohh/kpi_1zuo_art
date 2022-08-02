<template>
  <router-view />
</template>

<style>
html,
body {
  font-size: calc(100vw / 72)!important;
}

body {
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
</style>
