from app import app
from flask import request
from flask_restx import Api, Resource, fields
from game import Grid, Player, GameState

api = Api(app)

ns_settings = api.namespace('settings', description='The settings to start the game')
game_settings = api.model('Settings', {
    'size': fields.Integer(required=True, min=3, max=15, description='The size of the grid'),
    'win': fields.Integer(required=True, min=3, max=5, description='The number of squares you need to connect in a row to win'),
    'symbol1': fields.String(required=True, min_length=1, max_length=1, description='The letter representing player 1'),
    'symbol2': fields.String(required=True, min_length=1, max_length=1, description='The letter representing player 2')
})


@ns_settings.route('/settings')
class Setting(Resource):
    def __init__(self):
        self.size = 3
        self.win = 3
        self.symbol1 = 'O'
        self.symbol2 = 'X'

    @ns_settings.expect(game_settings, validate=True)
    def post(self):
        data = request.get_json()

        self.size = int(data.get('size'))
        self.win = int(data.get('win'))
        self.player1_symbol = data.get('player1')
        self.player2_symbol = data.get('player2')

        self.grid = Grid(self.size)
        self.player1 = Player(1, self.player1_symbol)
        self.player2 = Player(2, self.player2_symbol)
        gs = GameState(self.grid, self.player1, self.player2, self.win)
        self.turn = gs.decideFirstPlayer()

        return {'grid': self.grid.grid, 
                'symbol1': self.player1_symbol,
                'symbol2': self.player2_symbol,
                'turn': self.turn,
                'result': -1
                }


