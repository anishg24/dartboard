module dartboard_controller (
  input clk, reset, undo,
  input [4:0] points,
  input [2:0] multiplier,
  output [8:0] score
);

reg [8:0] score_reg;

wire [5:0] points_scored;
reg [5:0] previous_score;

always @(posedge clk) begin
  if (reset) begin
    score_reg <= 9'd501;
  end else if (undo) begin
    score_reg <= score_reg + {3'b0, previous_score};
    previous_score <= '0;
  end else if (points != '0) begin
    score_reg <= score_reg - {3'b0, points_scored};
    previous_score <= points_scored;
  end
end

assign points_scored = points * multiplier;
assign score = score_reg;

endmodule
