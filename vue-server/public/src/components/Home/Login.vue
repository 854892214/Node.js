<template>
  <div style="position: relative; width: 1280px;height: 800px;">
    <video
      loop
      autoplay
      muted
      webkit-playsinline="true"
      playsinline="true"
      x5-video-player-fullscreen="true"
      class="videoPos"
      width="100%"
      height="100%"
    >
      <source src="../../img/mos.mp4" type="video/mp4">
    </video>
    <div class="form-bg">
      <form class="formPos background-color" name="f1">
        帐号:
        <input class="input-bgcolor" type="text">
        <br>密码:
        <input type="password" class="input-bgcolor">
        <br>
        <div></div>
        <div></div>
        <div></div>
        <input type="button" value="点我">
      </form>
    </div>
    <img src="../../img/p5.png" alt="">
  </div>
</template>
<script>
export default {};
</script>
    <style>
input:hover {
  border: 3px solid red;
}

input {
  background-color: transparent;
}

.formPos {
  position: absolute;
}

.videoPos {
  position: absolute;
}

.form-bg {
  display: flex;
  flex-flow: row-reverse wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.input-bgcolor {
  background-color: transparent !important;
  border: 2px solid pink !important;
}
</style>
