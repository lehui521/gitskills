<template>
  <div class="hello">
    <canvas id="MyCanvas" width="1000" height="400"></canvas>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      xMove: 0,
      xSpeed: -0.4
    };
  },
  mounted: function() {
    window.requestAnimationFrame(() => {
      this.draw();
    });
  },
  methods: {
    draw: function() {
      window.requestAnimationFrame(() => {
        this.draw();
      });
      var my_canvas = document.getElementById("MyCanvas");
      const width = (my_canvas.width = my_canvas.offsetWidth);
      const height = (my_canvas.height = my_canvas.offsetHeight);
      var ctx = my_canvas.getContext("2d");
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(1, 100);
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, "#6e45e2");
      grad.addColorStop(1, "#88d3ce");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;
      ctx.moveTo(0, height * 0.5);
      this.xMove += this.xSpeed;
      for (let x = 0; x < width; x++) {
        const scale =
          (Math.sin(x / width * Math.PI * 2 - Math.PI * 0.5) + 1) * 0.5;
        const y = Math.sin(x * 0.02 + this.xMove) * 50 * scale + height / 2;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.closePath();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
