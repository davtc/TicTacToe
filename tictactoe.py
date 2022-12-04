import random
class Grid:
    def __init__(self, size):
        self.size = size
        self.grid = self.initializeGrid()
        self.moves_left = len(self.grid[0]) * len(self.grid[0])

    def initializeGrid(self):
        grid = []
        for _ in range(self.size):
            grid.append([0]*self.size)

        return grid

    def isMoveValid(self, move):
        if move.row < self.size and move.col < self.size and self.grid[move.row][move.col] == 0:
            return True
        else:
            return False

    def makeMove(self, player, move):
        if self.isMoveValid(move):
            self.grid[move.row][move.col] = player.id
            self.moves_left -= 1
            return True
        else:
            return False

    def printRowBorder(self):
        return "--"*self.size +"-\n"

    def printGrid(self, player1, player2):
        grid_str = ""
        grid_str += self.printRowBorder()
        for row, cols in enumerate(self.grid):
            grid_str += "|"
            for col in range(len(cols)):
                if self.grid[row][col] == 0:
                    grid_str += " |"
                elif self.grid[row][col] == 1:
                    grid_str += player1.symbol + "|"
                else:
                    grid_str += player2.symbol + "|"
            grid_str += "\n" + self.printRowBorder()
        
        return grid_str
            


class Player:
    def __init__(self, id, symbol):
        self.id = id
        self.symbol = symbol
        self.movedFirst = False

class Move:
    def __init__(self, row, col):
        self.row = int(row)
        self.col = int(col)
        self.move = (self.row, self.col)

class GameState:
    def __init__(self, grid, player1, player2):
        self.grid = grid
        self.player1 = player1
        self.player2 = player2
        self.player_order = []
        self.move_sequence = []

    def decideFirstPlayer(self):
        if random.randint(0, 1) == 0:
            player1.movedFirst = True
        else:
            player2.movedFirst = True

    def runGame(self):
        self.decideFirstPlayer()
        if player1.movedFirst:
            self.player_order = [player1, player2]
        else:
            self.player_order = [player2, player1]

        while grid.moves_left > 0:
            for p in self.player_order:
                turn_complete = False
                while turn_complete == False:
                    row, col = input("Enter the move for player {} (eg. 1 1 for row 1, col 1):".format(p.id)).split()
                    move = Move(row, col)
                    if self.grid.makeMove(p, move):
                        self.move_sequence.append(move)
                        turn_complete = True
                        print(grid.printGrid(player1, player2))
                    else:
                        print("Move invalid")


if __name__ == '__main__':
    size = input("Enter the size of the grid:\n")
    grid = Grid(int(size))
    symbol1 = input("Enter the symbol representing player 1:\n")[0].capitalize()
    symbol2 = input("Enter the symbol representing player 2:\n")[0].capitalize()
    player1 = Player(1, symbol1)
    player2 = Player(2, symbol2)
    # grid = Grid(int(5))
    # player1 = Player(1, 'X')
    # player2 = Player(2, 'O')
    print("The symbol for player 1 is: {}.\n".format(symbol1))
    print("The symbol for player 2 is: {}.\n".format(symbol2))
    print(grid.printGrid(player1, player2))
    GameState(grid, player1, player2).runGame()