import random

def simulate_dutch_auction(num_bidders, start_price, decrement, min_price):
    current_price = start_price
    round_num = 0
    winner = None
    bids = {}

    # Initialize all bidders with no bids
    for i in range(num_bidders):
        bids[f"Bidder {i+1}"] = None

    while current_price > min_price and not winner:
        round_num += 1
        for i in range(num_bidders):
            # Very low probability in the first round, then gradually increase
            if round_num == 1:
                acceptance_probability = 0.05  # Start with a 5% chance
            else:
                # Gradually increase the acceptance probability
                acceptance_probability = min(0.5, 0.05 + (round_num * 0.05) + (decrement / start_price * 0.2))

            if random.random() < acceptance_probability:
                if not winner:
                    winner = f"Bidder {i+1}"
                    bids[winner] = current_price
                if bids[f"Bidder {i+1}"] is None:
                    bids[f"Bidder {i+1}"] = current_price

        current_price -= decrement

    if not winner:
        return {
            'error': 'No bidder accepted the price.',
            'bidders': bids,
            'final_price': current_price + decrement,
            'rounds': round_num
        }

    return {
        'winning_bidder': winner,
        'winning_bid': bids[winner],
        'bidders': bids,
        'final_price': current_price + decrement,
        'rounds': round_num,
        'feedback': f"The winning bidder was {winner} with a bid of ${bids[winner]} after {round_num} rounds."
    }
