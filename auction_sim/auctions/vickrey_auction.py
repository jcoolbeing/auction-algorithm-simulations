import random

def simulate_vickrey_auction(num_bidders):
    bids = {}

    # Generate random bids for each bidder
    for i in range(num_bidders):
        bids[f"Bidder {i+1}"] = random.randint(100, 1000)  # Random bid between 100 and 1000

    # Determine the winner (highest bid) and second-highest bid
    sorted_bidders = sorted(bids.items(), key=lambda item: item[1], reverse=True)
    winner, winning_bid = sorted_bidders[0]
    second_highest_bid = sorted_bidders[1][1]

    # In a Vickrey auction, the winner pays the second-highest bid
    return {
        'winning_bidder': winner,
        'winning_bid': second_highest_bid,  # Winner pays the second-highest bid
        'bidders': bids,
        'feedback': f"The winning bidder was {winner} with a second-highest bid of ${second_highest_bid}."
    }
