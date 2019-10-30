(function(global) {

    var canvas, gl, program, program2, shaders=[], flag=0;
    var scaleLoc, scale, scalling, theta, thetaLoc;
  
    glUtils.SL.init({ callback:function() { main(); } });
  
    function main() {
      // Register Callbacks
      window.addEventListener('resize', resizer);
  
      // Get canvas element and check if WebGL enabled
      canvas = document.getElementById("glcanvas");
      gl = glUtils.checkWebGL(canvas);
  
      // Initialize the shaders and program
      var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
          fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
      var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex),
          fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);

      theta = 0.0195;
      scale = 0.0195;
      scalling = 1;

      shaders.push(glUtils.createProgram(gl, vertexShader, fragmentShader));
      shaders.push(glUtils.createProgram(gl, vertexShader2, fragmentShader2));
  
      resizer();
    }
  
    // draw!
    function draw() {
      // renderer info
      gl.clearColor(0.22, 0.22, 0.22, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
  
      var linesVertices = new Float32Array([
      -0.7, -0.55,   -0.7, +0.5,  -0.6, +0.55,  -0.6, 0.1,  -0.4, 0.1,
      -0.4, +0.55,   -0.3, +0.5,  -0.3, -0.55,  -0.4, -0.5,  -0.4, -0.1,
      -0.6, -0.1,   -0.6, -0.5
      ]);
      var triangleVertices = new Float32Array([
      +0.7, -0.55,   +0.7, +0.5,  +0.6, -0.5,  +0.6, +0.55,
      +0.6, -0.1,  +0.6, +0.1, +0.4, -0.1,  +0.4, +0.1,
      +0.4, +0.55,   +0.4, -0.5,  +0.3, +0.5,  +0.3, -0.55
      ]);
      
      program=shaders[0];
      gl.useProgram(program);
      
      thetaLoc = gl.getUniformLocation(program, 'theta');
      drawA(gl.LINE_LOOP, linesVertices, program);

      program2=shaders[1];
      gl.useProgram(program2);
      
      scaleLoc = gl.getUniformLocation(program2, 'scale');
      drawA2(gl.TRIANGLE_STRIP, triangleVertices, program2);
      requestAnimationFrame(draw);
    }
    
    // Generic format
    function drawA(type, vertices, programs) {
      var n = initBuffers(vertices, programs);
      if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
      }
      gl.drawArrays(type, 0, n);
    }

    function drawA2(type, vertices, programs) {
      var n = initBuffers2(vertices, programs);
      if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
      }
      gl.drawArrays(type, 0, n);
    }
//-----------------------------------------------------------------------------------------------------//
    function initBuffers(vertices, programs) {
      var n = vertices.length / 2;

      var vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(programs, 'vPosition');
      if (vPosition < 0) {
        console.log('Failed to get the storage location of vPosition');
        return -1;
      }

      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);

      theta -= Math.PI * 0.0195 
      gl.uniform1f(thetaLoc, theta);
      
      return n;
    }
//--------------------------------------------------------------------------------------------------------//  
    function initBuffers2(vertices, programs) {
      var n = vertices.length / 2;

      var vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(programs, 'vPosition');
      if (vPosition < 0) {
        console.log('Failed to get the storage location of vPosition');
        return -1;
      }

      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);

      if (scale >= 1) scalling = -0.8;
      else if (scale <= -1) scalling = 0.8;
      scale = scale + (scalling * 0.0195);
      gl.uniform1f(scaleLoc, scale);

      return n;
    }

    function resizer() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      draw();

      if(flag==0)
      {
          draw();
          flag=1;
      }
    }
  
  })(window || this);