function renderImageOnCanvas(canvas, imageUrl, x, y, imageWidth, imageHeight) {
  const gl = canvas.getContext("webgl");
  const program = createShaderProgram(gl);

  // 이미지 로딩 및 텍스처 생성
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const image = new Image();
  image.src = imageUrl;
  image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    render();
  };

  // 셰이더 프로그램 생성
  function createShaderProgram(gl) {
    const vertexShaderSource = `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;
        varying vec2 v_texCoord;
        void main() {
          gl_Position = vec4(a_position, 0, 1);
          v_texCoord = a_texCoord;
        }
      `;
    const fragmentShaderSource = `
        precision mediump float;
        uniform sampler2D u_image;
        varying vec2 v_texCoord;
        void main() {
          gl_FragColor = texture2D(u_image, v_texCoord);
        }
      `;
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    return program;
  }

  // 셰이더 생성
  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  // 렌더링
  function render() {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 버텍스 데이터 생성
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      x,
      y,
      x + imageWidth,
      y,
      x,
      y + imageHeight,
      x + imageWidth,
      y + imageHeight,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    const positionAttributeLocation = gl.getAttribLocation(
      program,
      "a_position"
    );
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // 텍스처 좌표 데이터 생성
    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    const texCoords = [0, 0, 1, 0, 0, 1, 1, 1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
    const texCoordAttributeLocation = gl.getAttribLocation(
      program,
      "a_texCoord"
    );
    gl.enableVertexAttribArray(texCoordAttributeLocation);
    gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.useProgram(program);
    gl.uniform1i(gl.getUniformLocation(program, "u_image"), 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}
