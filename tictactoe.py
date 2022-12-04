class Grid:
    def __init__(self, size):
        self.size = size
    
    def getSize(self):
        return self.size

    def initilizeGrid(self):
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


    def printGrid(self, grid, player1, player2):
        grid_str = "_ _ _\n"
        for row, cols in enumerate(grid):
            for col in cols:
                grid_str += "|"
                if grid[row][col] == 0:
                    grid_str += " |"
                elif grid[row][col] == 1:
                    grid_str += player1.getSymbol + "|"
                else:
                    grid_str += player2.getSymbol + "|"
                grid_str += "\n_ _ _\n"
        
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
    