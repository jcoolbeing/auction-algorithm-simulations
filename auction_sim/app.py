from flask import Flask, request, jsonify, render_template
from auctions.english_auction import simulate_english_auction
from auctions.dutch_auction import simulate_dutch_auction
from auctions.vickrey_auction import simulate_vickrey_auction

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/auction/<auction_type>')
def auction(auction_type):
    return render_template('auction.html', auction_type=auction_type)

@app.route('/simulate-auction', methods=['POST'])
def simulate_auction():
    data = request.get_json()
    auction_type = data.get('auction_type')

    try:
        if auction_type == 'english':
            result = simulate_english_auction(
                int(data.get('num_bidders')),  # Ensure num_bidders is an integer
                int(data.get('duration')),  # Ensure duration is an integer
                int(data.get('reserve_price')) if data.get('reserve_price') else None,  # Reserve price might be None
                data.get('bidding_styles')  # Bidding styles is a list of strings
            )
        elif auction_type == 'dutch':
            result = simulate_dutch_auction(
                int(data.get('num_bidders')),  # Ensure num_bidders is an integer
                int(data.get('start_price')),  # Ensure start_price is an integer
                int(data.get('decrement')),  # Ensure decrement is an integer
                int(data.get('min_price'))  # Ensure min_price is an integer
            )
        elif auction_type == 'vickrey':
            result = simulate_vickrey_auction(int(data.get('num_bidders')))  # Ensure num_bidders is an integer
        else:
            return jsonify({'error': 'Invalid auction type'}), 400

        return jsonify(result)

    except ValueError as e:
        # Handle cases where conversion to int fails
        return jsonify({'error': f'Invalid input: {str(e)}'}), 400

if __name__ == '__main__':
    app.run(debug=True)
