(function(global) {

  var canvas, gl, program, program2, shaders=[];
  var flag=0;
  
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

    shaders.push(glUtils.createProgram(gl, vertexShader, fragmentShader));
    shaders.push(glUtils.createProgram(gl, vertexShader2, fragmentShader2));

    program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader2);

    thetaLoc = gl.getUniformLocation(program, 'theta'); 
    transLoc = gl.getUniformLocation(program, 'vec');
    sizeLoc = gl.getUniformLocation(program, 'size');
    size = 0.3;
    theta = [20, 40, 0];
    vec = [0, 0, 0];
    xAdder = 0.0081;
    yAdder = 0.0099;
    zAdder = 0.053;
    adder = 0.61;

    thetaLoc2 = gl.getUniformLocation(program2, 'theta');
    theta2 = [40, 20, 0];

    resizer();
  }

  function cube(){
    gl.useProgram(program2);

    var CubeVertices = [
      // x, y, z             r, g, b
      
      // ABCD
      -0.375, -0.75, 0.45,    0.0, 1.0, 1.0,    //A
      -0.375, 0.75, 0.45,     0.0, 1.0, 1.0,    //B
      -0.375, 0.75, 0.45,     0.0, 1.0, 1.0,    //B
      0.375, 0.75, 0.45,      0.0, 1.0, 1.0,    //C

      0.375, 0.75, 0.45,      0.0, 1.0, 1.0,    //C
      0.375, -0.75, 0.45,     0.0, 1.0, 1.0,    //D
      0.375, -0.75, 0.45,     0.0, 1.0, 1.0,    //D
      -0.375, -0.75, 0.45,    0.0, 1.0, 1.0,    //A
      
      //DCGH
      0.375, 0.75, 0.45,      0.0, 1.0, 1.0,    //C
      0.375, 0.75, -0.45,     0.0, 1.0, 1.0,    //G
      0.375, -0.75, 0.45,     0.0, 1.0, 1.0,    //D
      0.375, -0.75, -0.45,    0.0, 1.0, 1.0,    //H

      //ABFE
      -0.375, -0.75, 0.45,    0.0, 1.0, 1.0,    //A
      -0.375, -0.75, -0.45,   0.0, 1.0, 1.0,    //E
      -0.375, 0.75, 0.45,     0.0, 1.0, 1.0,    //B
      -0.375, 0.75, -0.45,    0.0, 1.0, 1.0,    //F

      //EFGH
      -0.375, -0.75, -0.45,   0.0, 1.0, 1.0,    //E
      -0.375, 0.75, -0.45,    0.0, 1.0, 1.0,    //F
      -0.375, 0.75, -0.45,    0.0, 1.0, 1.0,    //F
      0.375, 0.75, -0.45,     0.0, 1.0, 1.0,    //G

      0.375, 0.75, -0.45,     0.0, 1.0, 1.0,    //G
      0.375, -0.75, -0.45,    0.0, 1.0, 1.0,    //H
      0.375, -0.75, -0.45,    0.0, 1.0, 1.0,    //H
      -0.375, -0.75, -0.45,   0.0, 1.0, 1.0,    //E
    ];

    var CubeVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, CubeVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(CubeVertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program2, 'vPosition');
    var vColor = gl.getAttribLocation(program2, 'vColor');
    gl.vertexAttribPointer(
      vPosition,  // variabel yang memegang posisi attribute di shader
      3,          // jumlah elemen per attribute
      gl.FLOAT,   // tipe data atribut
      gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
      0                                   // offset dari posisi elemen di array
    );
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 
      6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    gl.uniform3fv(thetaLoc2, theta2);

  }

  function triangle(){
    gl.useProgram(program);

    // Definisi vertex and buffer
    var triangleVertices = [
      //x,y         r,g,b
      +0.7, -0.55, 0.50, 0.50, 0.50,  
      +0.7, +0.5, 0.50, 0.50, 0.50,
      +0.6, -0.5, 0.50, 0.50, 0.50,
      +0.6, +0.55, 0.50, 0.50, 0.50,
      +0.6, -0.1, 0.50, 0.50, 0.50,
      +0.6, +0.1, 0.50, 0.50, 0.50,
      +0.4, -0.1, 0.50, 0.50, 0.50,
      +0.4, +0.1, 0.50, 0.50, 0.50,
      +0.4, +0.55, 0.50, 0.50, 0.50,
      +0.4, -0.5, 0.50, 0.50, 0.50,
      +0.3, +0.5, 0.50, 0.50, 0.50,
      +0.3, -0.55, 0.50, 0.50, 0.50,
      
    ];

    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');

    gl.vertexAttribPointer(
      vPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0
    );
    gl.vertexAttribPointer(
      vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.uniform1f(sizeLoc, size);

    //Hit the Wall

    if(vec[0] > 0.375*(1-size) || vec[0] < -0.375*(1-size) ){
      xAdder = xAdder * -1;
    }
    vec[0] += xAdder;

    if(vec[1] > 0.75*(1-size) || vec[1] < -0.75*(1-size) ){
      yAdder = yAdder * -1;
    }
    vec[1] += yAdder;

    if(vec[2] > 0.45*(1-size) || vec[2] < -0.45*(1-size) ){
      zAdder = zAdder * -1;
    }
    vec[2] += zAdder;

    gl.uniform3fv(transLoc, vec);

    // gl.enableVertexAttribArray(vPosition);
    // gl.enableVertexAttribArray(vColor);

    //Y Rotation

    theta[1] -= ( adder * 3 );

    gl.uniform3fv(thetaLoc, theta);
  }


  function resizer() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    if(flag==0)
    {
        render();
        flag=1;
    }  
  }

  function render() {
    // Bersihkan layar jadi hitam
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    
    // Bersihkan buffernya canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    triangle();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 12);

    cube();
    gl.drawArrays(gl.LINES, 0, 24);

    requestAnimationFrame(render);
  }
  
})(window || this);