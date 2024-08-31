import random

def simulate_english_auction(num_bidders, duration, reserve_price, bidding_styles):
    # Initialize bidders with their respective bidding styles
    bidders = {f"Bidder {i+1}": 0 for i in range(num_bidders)}
    
    # Process the bidding styles as a list
    bidding_styles_dict = {f"Bidder {i+1}": bidding_styles[i] for i in range(num_bidders)}
    
    # Variable to keep track of the final price
    final_price = 0

    for round_number in range(1, duration + 1):
        for bidder, style in bidding_styles_dict.items():
            # Example bidding logic based on style
            if style == 'aggressive':
                bid = random.randint(50, 100)
            elif style == 'conservative':
                bid = random.randint(10, 50)
            else:  # Random
                bid = random.randint(20, 70)

            bidders[bidder] += bid

            # Update the final price with the highest bid so far
            if bidders[bidder] > final_price:
                final_price = bidders[bidder]
            
            # Check if the reserve price is met
            if reserve_price and bidders[bidder] >= reserve_price:
                return {
                    'winning_bidder': bidder,
                    'winning_bid': bidders[bidder],
                    'final_price': bidders[bidder],
                    'rounds': round_number,
                    'bidders': bidders,
                    'feedback': f'{bidder} met the reserve price in round {round_number}.'
                }
    
    # Find the highest bid after all rounds if no one met the reserve price
    winning_bidder = max(bidders, key=bidders.get)
    return {
        'winning_bidder': winning_bidder,
        'winning_bid': bidders[winning_bidder],
        'final_price': final_price if final_price > 0 else 'N/A',
        'rounds': duration,
        'bidders': bidders,
        'feedback': f'No bidder met the reserve price. {winning_bidder} had the highest bid.'
    }
