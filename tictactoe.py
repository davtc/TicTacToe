import random
class Grid:
    def __init__(self, size):
        self.size = size
        self.grid = self.initializeGrid()
        self.moves_left = len(self.grid[0]) * len(self.grid[0])
        self.connections = {}

    def initializeGrid(self):
        grid = []
        for _ in range(self.size):
            grid.append([0]*self.size)

        return grid

    def checkLeftBound(self, y):
        return y >= 0

    def checkRightBound(self, y):
        return y < self.size

    def addConnection(self, move, move_list):
        # Modify number of horizontal connections
        h_connections = 1
        if self.checkLeftBound(move.col - 1): 
            left = (move.row, move.col - 1)
            if left in move_list:
                h_connections += self.connections[left][0]

        if self.checkRightBound(move.col + 1):
            right = (move.row, move.col + 1)
            if right in move_list:
                h_connections += self.connections[right][0]

        self.connections[move.coord] = [h_connections, 0, 0]

        if self.checkLeftBound(move.col - 1):
            left = (move.row, move.col - 1)
            print(list(reversed(range(left[1]))))
            for i in reversed(range(left[1] + 1)):
                if (left[0], i) in move_list:
                    self.connections[(left[0], i)][0] = h_connections
                else:
                    break
        
        if self.checkRightBound(move.col + 1):
            right = (move.row, move.col + 1)
            for i in range(right[1], self.size):
                if (right[0], i) in move_list:
                    self.connections[(right[0], i)][0] = h_connections
                else:
                    break

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
            self.addConnection(move, player.move_list)
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
        self.coord = (self.row, self.col)

class GameState:
    def __init__(self, grid, player1, player2):
        self.grid = grid
        self.player1 = player1
        self.player2 = player2
        self.result = -1
        self.player_order = []
        self.move_sequence = []

    def decideFirstPlayer(self):
        if random.randint(0, 1) == 0:
            player1.moved_first = True
        else:
            player2.moved_first = True

    def isGameOngoing(self):
        return self.grid.moves_left > 0 and self.result == -1

    def checkResult(self, player):
        if self.checkWin():
            self.result = player.id
            return True
        elif self.grid.moves_left == 0:
            self.result = 0
            return True
        else:
            return False

    def checkWin(self):
        return False

    def runGame(self):
        self.decideFirstPlayer()
        if player1.moved_first:
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
                        p.move_list.append(move.coord)
                        print(grid.connections)
                        turn_complete = True
                        print(grid.printGrid(player1, player2))
                    else:
                        print("Move invalid")

                    if self.checkResult(p):
                        match self.result:
                            case 1:
                                print("Result: Player 1 wins")
                            case 2:
                                print("Result: Player 2 wins")
                            case default:
                                print("Result: Draw")


if __name__ == '__main__':
    # size = min(int(input("Enter the size of the grid:\n")), 15)
    # grid = Grid(size)
    # symbol1 = input("Enter the symbol representing player 1:\n")[0].capitalize()
    # symbol2 = input("Enter the symbol representing player 2:\n")[0].capitalize()
    # player1 = Player(1, symbol1)
    # player2 = Player(2, symbol2)
    grid = Grid(int(5))
    player1 = Player(1, 'X')
    player2 = Player(2, 'O')
    print("The symbol for player 1 is: {}.\n".format(player1.symbol))
    print("The symbol for player 2 is: {}.\n".format(player2.symbol))
    print(grid.printGrid(player1, player2))
    GameState(grid, player1, player2).runGame()