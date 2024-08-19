.PHONY: clean wasm

TOP_LEVEL_DESIGN	?= dartboard_controller
VERILATOR_ROOT		 = $(PWD)/../../tools/verilator
VERILATOR_EXE			 = $(VERILATOR_ROOT)/bin/verilator
EMMAKE 				 		 = emmake
EMCXX 				 		 = em++

OUTPUT_DIR			 	 = $(PWD)/../simulator/scripts/wasm

wasm: $(OUTPUT_DIR)

obj_dir: verilog/
	$(VERILATOR_EXE) --cc -Wall ./verilog/*.v
	$(EMMAKE) make -C obj_dir -f V$(TOP_LEVEL_DESIGN).mk

$(OUTPUT_DIR): obj_dir main.cpp
	mkdir -p $(OUTPUT_DIR)
	$(EMCXX) -O3 -Iobj_dir -I$(VERILATOR_ROOT)/include main.cpp obj_dir/*.o -o "$(OUTPUT_DIR)/dartboard_controller.js" \
		-sEXPORTED_FUNCTIONS=_advance_clk,_reset,_register_dart,_undo_dart,_get_score,_main

clean:
	$(RM) -r obj_dir $(OUTPUT_DIR)
