from app import app
from flask import request, jsonify
from flask_restx import Api, Resource, fields
from app.game import Grid, Player, GameState

api = Api(app)

ns_settings = api.namespace('settings', description='The settings to start the game')
game_settings = api.model('Settings', {
    'size': fields.Integer(required=True, min=3, max=15, description='The size of the grid'),
    'win': fields.Integer(required=True, min=3, max=5, description='The number of squares you need to connect in a row to win'),
    'symbol1': fields.String(required=True, min_length=1, max_length=1, description='The letter representing player 1'),
    'symbol2': fields.String(required=True, min_length=1, max_length=1, description='The letter representing player 2')
})

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
    print(jsonify({
            'size': size,
            'grid': grid.grid, 
            'symbol1': player1_symbol,
            'symbol2': player2_symbol,
            'turn': turn,
            'result': -1
            }))
    return jsonify({
            'size': size,
            'grid': grid.grid, 
            'symbol1': player1_symbol,
            'symbol2': player2_symbol,
            'turn': turn,
            'result': -1
            })

