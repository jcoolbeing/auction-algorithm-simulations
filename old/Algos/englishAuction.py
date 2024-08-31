def english_auction(bidders, reserve_price):
    """
    This is a English Auction(Ascending) Simulator.

    its parameters are:
    bidders (list of tuples): tuple consists of name and max bid.
    reserve_price (int): is the minimum price at which the item can be sold for.
    The data returned is the winner's name, winning bid, bid history, and reserve price.
    """
    #no bids
    if not bidders:
        return "No bidders placed a bid", 0, [], reserve_price

    current_bid = reserve_price
    winner = None
    bid_history = []

    # continues as long as there is a new bid
    while True:
        new_bid_made = False
        for bidder, max_bid in bidders:
            # if a bidders max bid is higher than the current bid then they will create a new bid
            if max_bid > current_bid:
                current_bid += 1
                winner = bidder
                new_bid_made = True
                bid_history.append((bidder, current_bid))

        # End auction (no new bid)
        if not new_bid_made:
            break

    return winner, current_bid, bid_history, reserve_price

# prompt user for reserve price
try:
    reserve_price = int(input("Enter the reserve price: "))
except ValueError:
    print("Please enter a number.")
    exit()

# Set bidders
bidders = [("Alice", 100), ("Bob", 85), ("Charlie", 95), ("Diana", 90)]

# simulation
winner, final_bid, bid_history, reserve_price = english_auction(bidders, reserve_price)

# Data analysis
total_bids = len(bid_history)
winner_max_bid = next((max_bid for bidder, max_bid in bidders if bidder == winner), 0)
participant_count = len(set([bidder for bidder, _ in bid_history]))
active_bidder_frequency = {bidder: 0 for bidder, _ in bidders}
for bidder, _ in bid_history:
    active_bidder_frequency[bidder] += 1

# printing out results
print(f"The winner is {winner} with a bid of {final_bid}")
print(f"Winning bid compared to reserve price: {final_bid - reserve_price}")
print(f"Total number of bids made: {total_bids}")
print(f"Winner's maximum bid vs final bid: {winner_max_bid} vs {final_bid}")
print(f"Number of active participants: {participant_count}")
print("Bidder participation frequency:")
for bidder, frequency in active_bidder_frequency.items():
    print(f"  {bidder}: {frequency} bids")

# bid increments, time to conclude. maybe!