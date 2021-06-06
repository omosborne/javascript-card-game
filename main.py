import gameboard as gb

board = gb.Gameboard()

board.display_grid()
print()
board.add_card_to_position(0, 0, "Card 9")
# board.add_card_to_position(1, 2, "Card 5")
# board.add_card_to_position(2, 1, "Card 2")

board.display_grid()
