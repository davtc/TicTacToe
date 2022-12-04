class Grid:
    def __init__(self, size):
        self.size = size
        self.grid = self.initializeGrid()
    
    def getSize(self):
        return self.size

    def initializeGrid(self):
        grid = []
        for _ in range(self.size):
            grid.append([0]*self.size)

        return grid

    def isMoveValid(self, grid, row, col):
        if grid[row][col] == 0:
            return True
        else:
            return False

    def makeMove(self, grid, player, row, col):
        grid[row][col] = player.getId()
        return grid

    def printRowBorder(self):
        return "--"*self.size +"-\n"

    def printGrid(self, player1, player2):
        grid_str = ""
        grid_str += self.printRowBorder()
        for row, cols in enumerate(self.grid):
            grid_str += "|"
            for col in cols:
                if self.grid[row][col] == 0:
                    grid_str += " |"
                elif self.grid[row][col] == 1:
                    grid_str += player1.getSymbol() + "|"
                else:
                    grid_str += player2.getSymbol() + "|"
            grid_str += "\n" + self.printRowBorder()
        
        return grid_str
            


class Player:
    def __init__(self, id, symbol):
        self.id = id
        self.symbol = symbol

    def getId(self):
        return self.id

    def getSymbol(self):
        return self.symbol

if __name__ == '__main__':
    # size = input("Enter the size of the grid:\n")
    # grid = Grid(int(size))
    # symbol1 = input("Enter the symbol representing player 1:\n")
    # symbol2 = input("Enter the symbol representing player 2:\n")
    # player1 = Player(1, symbol1)
    # player2 = Player(2, symbol2)
    grid = Grid(int(5))
    player1 = Player(1, 'X')
    player2 = Player(2, 'O')
    print(grid.printGrid(player1, player2))