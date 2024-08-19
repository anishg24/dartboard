1. Install emscripten from source (need xz-utils package)
2. Build Verilator from source
    - Set VL_CPU_RELAX() to be empty macro (see patch)
    - When include/verilated.mk is generated, comment out CXX
3. Use emmake -f for obj_dir
4. Use em++ to compile to WASM
