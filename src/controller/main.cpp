#include "Vdartboard_controller.h"

auto* controller = new Vdartboard_controller;

extern "C" {
    void advance_clk() {
        controller->clk = 0;
        controller->eval();
        controller->clk = 1;
        controller->eval();
    }

    void reset() {
        controller->reset = 1;
        advance_clk();
        controller->reset = 0;
        advance_clk();
    }

    void register_dart(int points, int multiplier) {
        controller->points = points;
        controller->multiplier = multiplier;
        advance_clk();
        controller->points = 0;
        controller->multiplier = 1;
        advance_clk();
    }

    void undo_dart() {
        controller->undo = 1;
        advance_clk();
        controller->undo = 0;
        advance_clk();
    }

    int get_score() {
        return controller->score;
    }
}

int main() {
    reset();
    return 0;
}
