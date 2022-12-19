import random
class Grid:
    def __init__(self, size, grid = 0):
        self.size = size
        if grid == 0:
            self.grid = self.initializeGrid()
        else:
            self.grid = grid
        self.moves_left = self.size * self.size

    def initializeGrid(self):
        grid = []
        for _ in range(self.size):
            grid.append([0]*self.size)

        return grid

    def checkWest(self, move, move_list):
        connection = 0
        if move.col - 1 >= 0:
            west = (move.row, move.col - 1)
            while [west[0], west[1] - connection] in move_list:  
                connection += 1
        return connection

    def checkEast(self, move, move_list):
        connection = 0
        if move.col + 1 < self.size:
            east = (move.row, move.col + 1)
            while [east[0], east[1] + connection] in move_list:  
                connection += 1
        return connection

    def checkNorth(self, move, move_list):
        connection = 0
        if move.row - 1 >= 0:
            north = (move.row - 1, move.col)
            while [north[0] - connection, north[1]] in move_list:  
                connection += 1
        return connection

    def checkSouth(self, move, move_list):
        connection = 0
        if move.row + 1 < self.size:
            south = (move.row + 1, move.col)
            while [south[0] + connection, south[1]] in move_list:  
                connection += 1
        return connection

    def checkNorthEast(self, move, move_list):
        connection = 0
        if move.row - 1 >= 0 and move.col + 1 < self.size:
            northeast = (move.row - 1, move.col + 1)
            while [northeast[0] - connection, northeast[1] + connection] in move_list:  
                connection += 1
        return connection

    def checkNorthWest(self, move, move_list):
        connection = 0
        if move.row - 1 >= 0 and move.col - 1 >= 0:
            northwest = (move.row - 1, move.col - 1)
            while [northwest[0] - connection, northwest[1] - connection] in move_list:  
                connection += 1
        return connection

    def checkSouthEast(self, move, move_list):
        connection = 0
        if move.row + 1 < self.size and move.col + 1 < self.size:
            southeast = (move.row + 1, move.col + 1)
            while [southeast[0] + connection, southeast[1] + connection] in move_list:  
                connection += 1
        return connection

    def checkSouthWest(self, move, move_list):
        connection = 0
        if move.row + 1 < self.size and move.col - 1 >= 0:
            southwest = (move.row + 1, move.col - 1)
            while [southwest[0] + connection, southwest[1] - connection] in move_list:  
                connection += 1
        return connection

    def checkConnections(self, move, move_list):
        horizontal = self.checkWest(move, move_list) + self.checkEast(move, move_list) + 1
        vertical = self.checkNorth(move, move_list) + self.checkSouth(move, move_list) + 1
        forward_diagonal = self.checkSouthWest(move, move_list) + self.checkNorthEast(move, move_list) + 1
        backward_diagonal = self.checkNorthWest(move, move_list) + self.checkSouthEast(move, move_list) + 1
        return max(horizontal, vertical, forward_diagonal, backward_diagonal)

    def isMoveValid(self, move):
        if move.row >= 0 and move.row < self.size and move.row >= 0 and move.col < self.size: 
            if self.grid[move.row][move.col] == 0:
                return True
            else:
                return False
        else:
            return False

    def makeMove(self, player, move):
        if self.isMoveValid(move):
            self.grid[move.row][move.col] = player.id
            self.moves_left -= 1
            player.move_list.append(move.coord)
            return True
        else:
            return False

    def printRowBorder(self):
        return "--" * self.size + "-\n"

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
        self.moved_first = False
        self.move_list = []

class Move:
    def __init__(self, row, col):
        self.row = row
        self.col = col
        self.coord = [self.row, self.col]

class GameState:
    def __init__(self, grid, player1, player2, win):
        self.grid = grid
        self.player1 = player1
        self.player2 = player2
        self.win = win
        self.result = -1
        self.player_order = []
        self.move_sequence = []

    def decideFirstPlayer(self):
        if random.choice([self.player1, self.player2]) == self.player1:
            return 1
        else:
            return -1

    def isGameOngoing(self):
        return self.grid.moves_left > 0 and self.result == -1

    def checkResult(self, move, player):
        if self.checkWin(move, player.move_list): # Win
            self.result = player.id # Win
            return True
        elif self.grid.moves_left == 0:
            self.result = 0
            return True
        else: # Still pending
            return False

    def checkWin(self, move, move_list):
        if self.grid.checkConnections(move, move_list) >= self.win:
            return True
        else:
            return False

    # Run the game in terminal
    def runGame(self):
        if self.decideFirstPlayer() == 1:
            self.player_order = [player1, player2]
        else:
            self.player_order = [player2, player1]

        while self.isGameOngoing():
            for p in self.player_order:
                turn_complete = False
                while self.isGameOngoing() and turn_complete == False:
                    row, col = input("Enter the move for player {} (eg. 1 1 for row 1, col 1):".format(p.id)).split()
                    move = Move(int(row)-1, int(col)-1)
                    if self.grid.makeMove(p, move):
                        turn_complete = True
                        print(grid.printGrid(player1, player2))
                    else:
                        print("Move invalid")

                    if self.checkResult(move, p):
                        if self.result == 1:
                            print("Result: Player 1 wins")
                        elif self.result == 2:
                            print("Result: Player 2 wins")
                        else:
                            print("Result: Draw")

    # Updates the grid with a new move for the POST request
    def update(self, player, move):
        self.grid.makeMove(player, move)
        return self.grid


if __name__ == '__main__':
    # size = min(int(input("Enter the size of the grid:\n")), 15)
    # grid = Grid(size)
    # symbol1 = input("Enter the symbol representing player 1:\n")[0].capitalize()
    # symbol2 = input("Enter the symbol representing player 2:\n")[0].capitalize()
    # player1 = Player(1, symbol1)
    # player2 = Player(2, symbol2)
    grid = Grid(int(3))
    player1 = Player(1, 'X')
    player2 = Player(2, 'O')
    win = 3
    print("The symbol for player 1 is: {}.\n".format(player1.symbol))
    print("The symbol for player 2 is: {}.\n".format(player2.symbol))
    print("Get {} in a row to win.\n".format(win))
    print(grid.printGrid(player1, player2))
    GameState(grid, player1, player2, win).runGame()