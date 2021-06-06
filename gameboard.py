import position


class Gameboard:
    def __init__(self):
        self.grid = {
            "1": position.Position(), "2": position.Position(), "3": position.Position(),
            "4": position.Position(), "5": position.Position(), "6": position.Position(),
            "7": position.Position(), "8": position.Position(), "9": position.Position(),
        }

    def display_grid(self):
        for grid_position in self.grid:
            pos = self.get_position(grid_position)
            print(pos.get_card_name(), end=" ")

            if grid_position == "3":
                print()

            if grid_position == "6":
                print()

    def get_position(self, index):
        return self.grid.get(index)

    def add_card_to_position(self, position_index, card_name):
        pos = self.get_position(position_index)
        pos.add_card(card_name)
