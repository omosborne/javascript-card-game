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
                pos = position.Position()
                self.grid.append(pos)
                # print(position.Position())
                # numpy.insert(y, position.Position())
                # numpy.insert(self.grid, y, position.Position())
                # self.grid.insert(y, position.Position())
                # self.grid.append(position.Position())
                # self.grid[x][y].position.add_card()
                test1 = self.grid[x][y]
                test1.add_card()
                print(pos.get_card_name())

    def get_position(self, x, y):
        return self.grid[x][y]
