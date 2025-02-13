import json
from flask import Flask, jsonify, request
from flask_cors import CORS

import databasehandler
import definitionLogic

app = Flask(__name__)
CORS(app)

@app.route('/onderwijsontwerp', methods=['GET'])
def get_onderwijsontwerp():
 data = databasehandler.get_onderwijsontwerpdata()
 return jsonify(data)

@app.route('/admin', methods=['Get'])
def get_Admin():
  data = databasehandler.get_admin()
  return jsonify(data)

@app.route('/admin', methods=['POST'])
def post_Term():
   data = request.get_json()
   print(data)
   term_params = data[0]
   definitionterm_list = definitionLogic.getCorrectPerspective(term_params["Term_Perspective"], data[1])
   databasehandler.insert_term_and_definitionterm(data[0], definitionterm_list)
   return 'ok'

if __name__ == '__main__':
   app.run(port=5000)