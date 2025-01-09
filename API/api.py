import json
from flask import Flask, jsonify, request
from flask_cors import CORS

import databasehandler

app = Flask(__name__)
CORS(app)

@app.route('/onderwijsontwerp', methods=['GET'])
def get_onderwijsontwerp():
 data = databasehandler.get_onderwijsontwerpdata()
 return jsonify(data)

if __name__ == '__main__':
   databasehandler.startup()
   app.run(port=5000)