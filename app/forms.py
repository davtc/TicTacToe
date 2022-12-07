from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField
from wtforms.validators import NumberRange, Length, DataRequired

class SettingsForm(FlaskForm):
    size = IntegerField('Grid Size', validators=[NumberRange(min=3, max=15), DataRequired()], message='Please enter an integer in the range 3 to 15')
    win = IntegerField('Win Condition', validators=[NumberRange(min=3, max=5), DataRequired()], message='Please enter an integer in the range 3 to 5')
    player1 = StringField('Player 1', validators=[Length(min=1, max=1), DataRequired()], message='Please enter a letter to repesent Player 1')
    player2 = StringField('Player 2', validators=[Length(min=1, max=1), DataRequired()], message='Please enter a letter to repesent Player 1')
    submit = SubmitField('Start Game')