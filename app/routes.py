from app import app
from flask import request, jsonify
from flask_restx import Api, Resource, fields
from app.game import Grid, Player, Move, GameState

api = Api(app)

ns_settings = api.namespace('settings', description='The settings to start the game')
game_settings = api.model('Settings', {
    'size': fields.Integer(required=True, min=3, max=15, description='The size of the grid'),
    'win': fields.Integer(required=True, min=3, max=5, description='The number of squares you need to connect in a row to win'),
    'symbol1': fields.String(required=True, min_length=1, max_length=1, description='The letter representing player 1'),
    'symbol2': fields.String(required=True, min_length=1, max_length=1, description='The letter representing player 2')
})

# Handles the POST request for the game settings form in the back-end
@app.route('/settings', methods = ['POST'])
def start():
    data = request.get_json()
    print(data)
    size = int(data.get('size'))
    win = int(data.get('win'))
    player1_symbol = data.get('symbol1')
    player2_symbol = data.get('symbol2')

    grid = Grid(size)
    player1 = Player(1, player1_symbol)
    player2 = Player(2, player2_symbol)
    gs = GameState(grid, player1, player2, win)
    turn = gs.decideFirstPlayer()

    response = jsonify({
            'size': size,
            'grid': grid.grid, 
            'win': win,
            'symbol1': player1_symbol,
            'prev_moves1': [],
            'symbol2': player2_symbol,
            'prev_moves2': [],
            'turn': turn,
            'result': -1
            })
    print(response)
    print(grid.printGrid(player1, player2))

    return response

# Handles the POST request to update the game state in the back-end
@app.route('/game', methods = ['POST'])
def game():
    data = request.get_json()
    print(data)
    size = int(data.get('size'))
    grid = data.get('grid')
    win = int(data.get('win'))
    player1_symbol = data.get('symbol1')
    prev_moves1 = data.get('prev_moves1')
    player2_symbol = data.get('symbol2')
    prev_moves2 = data.get('prev_moves2')
    turn = data.get('turn')
    move = Move(data.get('move')[0], data.get('move')[1])

    grid = Grid(size, grid)
    player1 = Player(1, player1_symbol,)
    player1.move_list = prev_moves1
    player2 = Player(2, player2_symbol)
    player2.move_list = prev_moves2
    gs = GameState(grid, player1, player2, win)

    # Update game state values
    move_success = False
    if grid.isMoveValid(move):
        if turn == 1:
            grid = gs.update(player1, move)
            gs.checkResult(move, player1)
        else:
            grid = gs.update(player2, move)
            gs.checkResult(move, player2)
        result = gs.result
        turn = -turn
        move_success = True
    else:
        move_success = False

    response = jsonify({
            'size': size,
            'grid': grid.grid, 
            'win': win,
            'symbol1': player1_symbol,
            'prev_moves1': player1.move_list,
            'symbol2': player2_symbol,
            'prev_moves2': player2.move_list,
            'turn': turn,
            'result': result,
            'move_success': move_success
            })
    print(response)
    print(grid.printGrid(player1, player2))

    return response


