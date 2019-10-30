precision mediump float;

attribute vec4 vPosition;
uniform float theta;
uniform float scale;

void main() {
  mat4 skalasi = mat4(
    scale, 0.0, 0.0, 0.0,   
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  gl_Position = (vPosition-vec4(0.5,0,0,0)) * skalasi + vec4(0.5,0,0,0.2);
}