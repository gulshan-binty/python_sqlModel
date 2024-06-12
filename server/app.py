from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:bin123@localhost/stock_market'
db = SQLAlchemy(app)
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

class TradeData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(50))
    trade_code = db.Column(db.String(50))
    close = db.Column(db.Float)
    low = db.Column(db.Float)
    high = db.Column(db.Float)
    open = db.Column(db.Float)
    volume = db.Column(db.Integer)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'date': self.date,
            'trade_code': self.trade_code,
            'close': self.close,
            'low': self.low,
            'high': self.high,
            'open': self.open,
            'volume': self.volume
        }

with app.app_context():
    db.create_all()


@app.route("/")
def hello_world():
    return "<p>Hello</p>"

@app.route('/api/data', methods=['GET'])
def get_data():
    trades = TradeData.query.limit(20).all()
    return jsonify([trade.serialize for trade in trades])
# @app.route('/api/data/<int:id>', methods=['GET'])
# def get_data_by_id(id):
#     trade = TradeData.query.get(id)
#         return jsonify(trade.serialize)
#     return jsonify({'message': 'Data not found'}), 404
@app.route('/api/data', methods=['POST'])
def add_data():
    new_data = request.json
    trade = TradeData(
        date=new_data['date'],
        trade_code=new_data['trade_code'],
        close=new_data['close'],
        low=new_data['low'],
        high=new_data['high'],
        open=new_data['open'],
        volume=new_data['volume']
    )
    db.session.add(trade)
    db.session.commit()
    return jsonify(trade.serialize), 201

@app.route('/api/data/<int:id>', methods=['PUT'])
def update_data(id):
    update = request.json
    trade = TradeData.query.get(id)
    if trade:
        trade.date = update['date']
        trade.trade_code = update['trade_code']
        trade.close = update['close']
        trade.low = update['low']
        trade.high = update['high']
        trade.open = update['open']
        trade.volume = update['volume']
        db.session.commit()
        return jsonify(trade.serialize)
    return jsonify({'message': 'Data not found'}), 404

@app.route('/api/data/<int:id>', methods=['DELETE'])
def delete_data(id):
    trade = TradeData.query.get(id)
    if trade:
        db.session.delete(trade)
        db.session.commit()
        return jsonify({'message': 'Data deleted successfully'})
    return jsonify({'message': 'Data not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
