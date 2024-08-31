import random

def simulate_vickrey_auction(num_bidders):
    bids = {}

    for i in range(num_bidders):
        bid = random.randint(1, 1000)  # Random bid between 1 and 1000
        bids[f"Bidder {i+1}"] = bid

    # Sort bidders by their bid values in descending order
    sorted_bidders = sorted(bids.items(), key=lambda x: x[1], reverse=True)

    # Get the highest and second-highest bids
    winning_bidder, highest_bid = sorted_bidders[0]
    second_highest_bid = sorted_bidders[1][1]

    return {
        'winning_bidder': winning_bidder,
        'winning_bid': second_highest_bid,  # The price paid is the second-highest bid
        'highest_bid': highest_bid,
        'bidders': bids
    }
