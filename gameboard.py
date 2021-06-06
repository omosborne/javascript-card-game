import position


grid_width = 3
grid_height = 3


class Gameboard:
    def __init__(self):
        self.grid = []
        self.create_grid()

    def display_grid(self):
        for x in range(grid_width):
            for y in range(grid_height):
                pos = self.get_position(x, y)
                print(pos.get_card_name(), end=" ")
            print()

    def create_grid(self):
        for x in range(grid_width):
            for y in range(grid_height):
                self.grid.append(position.Position())

                # pos = self.grid[x][y]
                # pos.add_card()

    def get_position(self, x, y):
        return self.grid[x][y]

    def add_card_to_position(self, position_x, position_y, card_name):
        # pos = self.get_position(position_x, position_y)
        pos = self.grid[position_x][position_y]
        pos.add_card(card_name)
