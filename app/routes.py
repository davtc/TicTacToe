from app import app
from flask import request
from flask_restx import Api, Resource, fields
from app import game

api = Api(app)

ns_settings = api.namespace('settings', description='The settings to start the game')
game_settings = api.model('Settings', {
    'size': fields.Integer(required=True, min=3, max=15, description='The size of the grid'),
    'win': fields.Integer(required=True, min=3, max=5, description='The number of squares you need to connect in a row to win'),
    'player1': fields.String(required=True, min_length=1, max_length=1, description='The letter representing player 1'),
    'player2': fields.String(required=True, min_length=1, max_length=1, description='The letter representing player 2')
})


@ns_settings.route('/settings')
class Setting(Resource):
    def __init__(self):
        self.size = 3
        self.win = 3
        self.player1_symbol = 'O'
        self.player1_symbol = 'X'

    @ns_settings.expect(game_settings, validate=True)
    def post(self):
        data = request.get_json()

        self.size = int(data.get('size'))
        self.win = int(data.get('win'))
        player1_symbol = data.get('player1')
        player2_symbol = data.get('player2')

        grid = game.Grid(self.size)
        player1 = game.Player(1, player1_symbol)
        player2 = game.Player(2, player2_symbol)

        return {'grid': grid}


