def dutch_auction(bidders, start_price):
    """
    Dutch Auction simulation

    Parameters:
    bidders (list of tuples): contains name and max bid.
    start_price (int): price of item

    Returns: winners name, winning bid, bid history, and start price.
    """
    if not bidders:
        return "No bidders bidded", 0, [], start_price

    current_bid = start_price
    winner = None
    bid_history = []

    # price decreases aslong as no bid is placed
    while current_bid > 0 and not winner:
        for bidder, max_bid in bidders:
            # if current bid is less than or equal to max bid then bidder places a bid
            if max_bid >= current_bid:
                winner = bidder
                bid_history.append((bidder, current_bid))
                break  # First bid = end of auction

        current_bid -= 1

    return winner, current_bid + 1, bid_history, start_price

# prompt for starting price
try:
    start_price = int(input("Enter starting price: "))
except ValueError:
    print("Please enter a number.")
    exit()

# set bidders
bidders = [("Alice", 100), ("Bob", 85), ("Charlie", 95), ("Diana", 90)]

# simulation
winner, final_bid, bid_history, start_price = dutch_auction(bidders, start_price)

# print out results
print(f"The winner is {winner} with a bid of {final_bid}")
print(f"Starting bid was: {start_price}")
print("Bid history:")
for bidder, bid in bid_history:
    print(f"  {bidder} bid at price {bid}")
