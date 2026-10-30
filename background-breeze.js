/* Animate the foliage in the existing wallpaper; the camera stays fixed. */
(() => {
  'use strict';
  if (document.querySelector('.prontera-background')) return;
  const imageUrl = new URL('prontera-background.png', document.currentScript.src).href;
  const background = document.createElement('div');
  background.className = 'prontera-background';
  background.setAttribute('aria-hidden', 'true');
  const scenery = document.createElement('div');
  scenery.className = 'prontera-scenery';
  const motes = document.createElement('div');
  motes.className = 'prontera-motes';
  // Reuse the reference app's forty softly drifting lightballs.
  const moteStyles = [
    "--lane:0.15;--top:69.18%;--duration:29.67s;--delay:-22.33s;--size:6.30px;--dx:-7.72px;--dy:-32.75px;--end-x:13.39px;--end-y:-26.49px",
    "--lane:0.18;--top:84.56%;--duration:31.82s;--delay:-27.06s;--size:6.26px;--dx:5.48px;--dy:-35.21px;--end-x:-15.12px;--end-y:-74.53px",
    "--lane:0.48;--top:32.50%;--duration:36.67s;--delay:-6.56s;--size:5.65px;--dx:22.48px;--dy:-54.99px;--end-x:31.16px;--end-y:17.89px",
    "--lane:0.22;--top:85.90%;--duration:20.47s;--delay:-10.22s;--size:6.44px;--dx:9.57px;--dy:10.96px;--end-x:-10.78px;--end-y:-8.57px",
    "--lane:0.21;--top:95.23%;--duration:26.09s;--delay:-1.91s;--size:6.46px;--dx:28.15px;--dy:-26.35px;--end-x:22.94px;--end-y:1.37px",
    "--lane:0.87;--top:40.00%;--duration:35.64s;--delay:-27.39s;--size:5.46px;--dx:-20.01px;--dy:22.63px;--end-x:21.17px;--end-y:-51.33px",
    "--lane:0.48;--top:95.24%;--duration:29.97s;--delay:-0.42s;--size:5.33px;--dx:2.37px;--dy:-40.10px;--end-x:0.04px;--end-y:-82.84px",
    "--lane:0.47;--top:58.63%;--duration:28.91s;--delay:-24.90s;--size:4.79px;--dx:24.50px;--dy:3.54px;--end-x:24.50px;--end-y:-89.79px",
    "--lane:0.91;--top:6.93%;--duration:25.77s;--delay:-20.91s;--size:5.57px;--dx:4.39px;--dy:-54.70px;--end-x:35.24px;--end-y:-53.65px",
    "--lane:0.84;--top:50.40%;--duration:28.95s;--delay:-28.57s;--size:4.76px;--dx:2.28px;--dy:22.20px;--end-x:37.61px;--end-y:-39.49px",
    "--lane:0.13;--top:34.40%;--duration:37.94s;--delay:-26.25s;--size:6.75px;--dx:13.03px;--dy:5.46px;--end-x:-11.01px;--end-y:-77.15px",
    "--lane:0.81;--top:25.44%;--duration:33.22s;--delay:-24.24s;--size:6.63px;--dx:9.81px;--dy:-14.47px;--end-x:-7.17px;--end-y:-72.03px",
    "--lane:0.07;--top:8.13%;--duration:23.06s;--delay:-13.36s;--size:4.03px;--dx:-27.26px;--dy:-3.52px;--end-x:29.08px;--end-y:-80.84px",
    "--lane:0.83;--top:38.25%;--duration:35.55s;--delay:-11.49s;--size:6.29px;--dx:21.24px;--dy:-0.28px;--end-x:13.44px;--end-y:-93.93px",
    "--lane:0.16;--top:30.43%;--duration:25.34s;--delay:-7.84s;--size:7.55px;--dx:-27.62px;--dy:-32.47px;--end-x:-11.59px;--end-y:-19.00px",
    "--lane:0.74;--top:13.96%;--duration:25.88s;--delay:-20.04s;--size:4.19px;--dx:-1.73px;--dy:-14.43px;--end-x:18.07px;--end-y:-87.58px",
    "--lane:0.39;--top:61.52%;--duration:34.53s;--delay:-5.61s;--size:6.53px;--dx:-28.13px;--dy:-44.09px;--end-x:-14.42px;--end-y:22.15px",
    "--lane:0.12;--top:11.71%;--duration:29.41s;--delay:-28.67s;--size:4.41px;--dx:13.94px;--dy:8.43px;--end-x:29.65px;--end-y:12.30px",
    "--lane:0.12;--top:48.77%;--duration:23.83s;--delay:-3.90s;--size:4.32px;--dx:-4.13px;--dy:-9.39px;--end-x:-35.76px;--end-y:-12.85px",
    "--lane:0.92;--top:35.31%;--duration:23.49s;--delay:-0.07s;--size:5.29px;--dx:19.55px;--dy:-33.56px;--end-x:11.57px;--end-y:18.00px",
    "--lane:0.70;--top:74.05%;--duration:21.17s;--delay:-20.69s;--size:7.90px;--dx:-14.50px;--dy:18.95px;--end-x:33.68px;--end-y:14.85px",
    "--lane:0.71;--top:88.89%;--duration:25.48s;--delay:-7.08s;--size:5.66px;--dx:-13.63px;--dy:-40.06px;--end-x:-36.90px;--end-y:-68.81px",
    "--lane:0.49;--top:42.02%;--duration:35.08s;--delay:-8.03s;--size:6.30px;--dx:8.03px;--dy:-17.94px;--end-x:20.43px;--end-y:-58.29px",
    "--lane:0.12;--top:63.44%;--duration:22.25s;--delay:-4.12s;--size:6.70px;--dx:9.76px;--dy:-15.47px;--end-x:-37.67px;--end-y:-83.86px",
    "--lane:0.22;--top:86.30%;--duration:28.10s;--delay:-15.69s;--size:6.13px;--dx:-11.44px;--dy:4.19px;--end-x:13.55px;--end-y:-53.39px",
    "--lane:0.38;--top:11.16%;--duration:36.44s;--delay:-28.00s;--size:6.15px;--dx:-5.55px;--dy:15.89px;--end-x:-24.37px;--end-y:-59.01px",
    "--lane:0.68;--top:39.81%;--duration:25.88s;--delay:-23.64s;--size:5.62px;--dx:16.16px;--dy:-6.04px;--end-x:9.83px;--end-y:-50.91px",
    "--lane:0.38;--top:32.21%;--duration:33.14s;--delay:-5.85s;--size:4.30px;--dx:21.02px;--dy:-9.75px;--end-x:0.43px;--end-y:-64.23px",
    "--lane:0.34;--top:47.14%;--duration:22.14s;--delay:-8.53s;--size:7.46px;--dx:-11.62px;--dy:5.75px;--end-x:24.10px;--end-y:8.40px",
    "--lane:0.18;--top:48.89%;--duration:29.33s;--delay:-8.87s;--size:6.35px;--dx:28.76px;--dy:16.20px;--end-x:39.56px;--end-y:33.79px",
    "--lane:0.13;--top:55.69%;--duration:28.20s;--delay:-15.46s;--size:7.56px;--dx:0.92px;--dy:3.71px;--end-x:9.89px;--end-y:-59.76px",
    "--lane:0.87;--top:37.67%;--duration:33.57s;--delay:-17.73s;--size:4.34px;--dx:12.08px;--dy:5.75px;--end-x:-35.09px;--end-y:-39.81px",
    "--lane:0.72;--top:27.28%;--duration:32.44s;--delay:-20.91s;--size:5.68px;--dx:-16.72px;--dy:-27.43px;--end-x:20.86px;--end-y:-9.02px",
    "--lane:0.39;--top:43.15%;--duration:21.21s;--delay:-5.46s;--size:7.88px;--dx:-18.81px;--dy:-29.67px;--end-x:-39.30px;--end-y:33.14px",
    "--lane:0.68;--top:52.62%;--duration:21.84s;--delay:-6.76s;--size:5.39px;--dx:13.40px;--dy:-45.30px;--end-x:-20.62px;--end-y:13.26px",
    "--lane:0.62;--top:93.11%;--duration:36.85s;--delay:-1.25s;--size:5.04px;--dx:15.79px;--dy:-3.80px;--end-x:-12.73px;--end-y:-58.85px",
    "--lane:0.82;--top:21.09%;--duration:24.66s;--delay:-18.27s;--size:6.66px;--dx:15.64px;--dy:5.82px;--end-x:-9.40px;--end-y:31.72px",
    "--lane:0.41;--top:70.93%;--duration:37.91s;--delay:-3.03s;--size:6.28px;--dx:-12.68px;--dy:-22.43px;--end-x:20.27px;--end-y:-0.10px",
    "--lane:0.93;--top:40.63%;--duration:22.65s;--delay:-11.97s;--size:5.40px;--dx:3.49px;--dy:-21.59px;--end-x:-27.70px;--end-y:-58.10px",
    "--lane:0.82;--top:56.25%;--duration:26.15s;--delay:-2.42s;--size:6.98px;--dx:-5.42px;--dy:-29.25px;--end-x:22.03px;--end-y:-93.80px"
  ];
  moteStyles.forEach(style => {
    const mote = document.createElement('i');
    mote.style.cssText = style;
    motes.append(mote);
  });
  background.append(scenery, motes);
  document.body.prepend(background);

  const positionMotes = () => {
    const main = document.querySelector('main');
    if (!main) return;
    const gutter = main.getBoundingClientRect().left + parseFloat(getComputedStyle(main).paddingLeft);
    motes.style.setProperty('--gutter', `${Math.max(0, gutter)}px`);
  };
  positionMotes();
  window.addEventListener('resize', positionMotes);
  document.addEventListener('visibilitychange', () => {
    motes.classList.toggle('is-paused', document.hidden);
  });
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const narrowScreen = matchMedia('(max-width: 1100px)');
  const canvas = document.createElement('canvas');
  canvas.className = 'prontera-breeze';
  canvas.setAttribute('aria-hidden', 'true');
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, powerPreference: 'low-power' });
  if (!gl) return; // The original CSS wallpaper remains available without WebGL.

  const vertexSource = `
    attribute vec2 a_position;
    varying vec2 v_uv;
    void main() {
      v_uv = vec2(a_position.x * 0.5 + 0.5, 0.5 - a_position.y * 0.5);
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;
  const fragmentSource = `
    precision highp float;
    uniform sampler2D u_image;
    uniform vec2 u_imageSize;
    uniform vec2 u_viewSize;
    uniform float u_time;
    varying vec2 v_uv;

    float canopy(vec2 uv, vec2 center, vec2 radius) {
      return 1.0 - smoothstep(0.55, 1.0, length((uv - center) / radius));
    }
    float foliage(vec3 color) {
      return smoothstep(0.015, 0.10, color.g - color.b)
        * smoothstep(-0.025, 0.065, color.g - color.r);
    }
    void main() {
      // Match CSS background-size: cover, including its centered crop.
      float scale = max(u_viewSize.x / u_imageSize.x, u_viewSize.y / u_imageSize.y);
      vec2 uv = (v_uv - 0.5) * u_viewSize / (u_imageSize * scale) + 0.5;
      vec2 pixel = 1.0 / u_imageSize;
      vec3 original = texture2D(u_image, uv).rgb;

      // Canopy locations are normalized to prontera-background.png, not the screen.
      float trees = canopy(uv, vec2(0.025, 0.285), vec2(0.075, 0.145));
      trees = max(trees, canopy(uv, vec2(0.115, 0.480), vec2(0.075, 0.120)));
      trees = max(trees, canopy(uv, vec2(0.025, 0.970), vec2(0.130, 0.150)));
      trees = max(trees, canopy(uv, vec2(0.290, 0.775), vec2(0.075, 0.155)));
      trees = max(trees, canopy(uv, vec2(0.345, 0.600), vec2(0.065, 0.095)));
      trees = max(trees, canopy(uv, vec2(0.450, 0.910), vec2(0.060, 0.120)));
      trees = max(trees, canopy(uv, vec2(0.625, 0.930), vec2(0.075, 0.130)));
      trees = max(trees, canopy(uv, vec2(0.700, 0.980), vec2(0.075, 0.100)));
      trees = max(trees, canopy(uv, vec2(0.810, 0.715), vec2(0.095, 0.150)));
      trees = max(trees, canopy(uv, vec2(0.935, 0.445), vec2(0.095, 0.095)));

      // Include a small leaf-edge fringe so silhouettes can sway into the sky.
      // Color selection prevents the nearby roofs and stonework from swaying.
      float leaves = foliage(original);
      leaves = max(leaves, foliage(texture2D(u_image, uv + vec2(3.0, 0.0) * pixel).rgb));
      leaves = max(leaves, foliage(texture2D(u_image, uv - vec2(3.0, 0.0) * pixel).rgb));
      leaves = max(leaves, foliage(texture2D(u_image, uv + vec2(0.0, 2.0) * pixel).rgb));
      leaves = max(leaves, foliage(texture2D(u_image, uv - vec2(0.0, 2.0) * pixel).rgb));
      float strength = trees * leaves;
      float gust = 0.75 * sin(u_time * 0.85 + uv.x * 4.0)
        + 0.25 * sin(u_time * 1.37 + uv.y * 5.0);
      float flutter = sin(u_time * 2.4 + uv.y * 85.0 + uv.x * 37.0);
      vec2 breeze = vec2(gust * 3.6 + flutter * 0.55,
        sin(u_time * 1.1 + uv.x * 16.0) * 0.7);
      gl_FragColor = vec4(texture2D(u_image, uv + breeze * pixel * strength).rgb, 1.0);
    }
  `;

  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }
  const vertex = compile(gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertex || !fragment) return;
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const timeUniform = gl.getUniformLocation(program, 'u_time');
  const sizeUniform = gl.getUniformLocation(program, 'u_viewSize');
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.uniform1i(gl.getUniformLocation(program, 'u_image'), 0);

  let ready = false;
  let frame = 0;
  let lastTime = 0;
  let elapsed = 0;
  function draw() {
    gl.uniform1f(timeUniform, elapsed);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  function animate(now) {
    if (!lastTime) lastTime = now;
    if (now - lastTime >= 1000 / 30) {
      elapsed += Math.min(now - lastTime, 100) / 1000;
      lastTime = now;
      draw();
    }
    frame = requestAnimationFrame(animate);
  }
  function updateMotion() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    if (!ready) return;
    const show = !reducedMotion.matches && !narrowScreen.matches;
    canvas.hidden = !show;
    if (show && !document.hidden) {
      frame = requestAnimationFrame(animate);
    }
  }
  function resize() {
    if (!ready) return;
    const width = scenery.clientWidth;
    const height = scenery.clientHeight;
    // Limit rendering cost on large/high-density displays.
    const density = Math.min(devicePixelRatio || 1, 1.5, Math.sqrt(2000000 / (width * height)));
    canvas.width = Math.max(1, Math.round(width * density));
    canvas.height = Math.max(1, Math.round(height * density));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(sizeUniform, width, height);
    draw();
    updateMotion();
  }
  const image = new Image();
  image.onload = () => {
    try {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    } catch {
      return; // Local-file restrictions also fall back to the static wallpaper.
    }
    gl.uniform2f(gl.getUniformLocation(program, 'u_imageSize'), image.naturalWidth, image.naturalHeight);
    ready = true;
    scenery.append(canvas);
    resize();
  };
  image.src = imageUrl;
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', updateMotion);
  reducedMotion.addEventListener('change', updateMotion);
  narrowScreen.addEventListener('change', updateMotion);
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    ready = false;
    cancelAnimationFrame(frame);
    canvas.hidden = true;
  });
})();
