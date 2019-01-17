<template>
  <div id="select">
    <div
      :style="{
        position: 'absolute',
        bottom: '0',
        right: '0',
        width: 0,
        height: 0,
        borderWidth: '0 0 12px 12px',
        borderStyle: 'solid',
        borderColor: '#c62f2f transparent'
    }"
    ></div>
    <span
      :style="{
        position: 'absolute',
        bottom: '0',
        right: '0',
        fontWeight: 'bold',
        color:'#fff',
        fontSize: '8px'
        }"
    >
      <i class="el-icon-check"></i>
    </span>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>