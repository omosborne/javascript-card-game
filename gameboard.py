import position


grid_width = 3
grid_height = 3


class Gameboard:
    def __init__(self):
        self.grid = []
        self.create_grid()

    def display_grid(self):
        for x in self.grid:
            for y in x:
                print(y, end=" ")
            print()

    def create_grid(self):
        for x in range(grid_width):
            for y in range(grid_height):
                self.grid.append(position.Position())

                pos = self.grid[x][y]
                pos.add_card()

                print(pos.get_card_name())

    def get_position(self, x, y):
        return self.grid[x][y]
