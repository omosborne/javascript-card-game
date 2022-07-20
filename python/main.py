import gameboard as gb

board = gb.Gameboard()

board.display_grid()
print()
print()
board.add_card_to_position("1", "Card 9")
board.add_card_to_position("6", "Card 5")
board.add_card_to_position("8", "Card 2")

board.display_grid()
