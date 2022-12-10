from app import app
from flask_cors import CORS

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
