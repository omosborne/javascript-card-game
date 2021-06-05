# import numpy
import position
# import array


class Gameboard:
    def __init__(self):
        # self.grid = numpy.array([[position.Position(), position.Position(), position.Position()], [position.Position(), position.Position(), position.Position()], [position.Position(), position.Position(), position.Position()]])
        # self.grid = numpy.empty((3, 3), numpy.object)
        # self.grid = numpy.ndarray((3, 3), numpy.object)
        # self.grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        self.grid = []
        self.create_grid()

    def display_grid(self):
        for x in self.grid:
            for y in x:
                print(y, end=" ")
            print()

    def create_grid(self):
        for x in range(3):
            for y in range(3):
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
