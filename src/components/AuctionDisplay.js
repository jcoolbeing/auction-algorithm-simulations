import React from 'react';

const AuctionDisplay = ({ currentBid, isAuctionActive, bids }) => {
    return (
        <div>
            <p>{isAuctionActive ? `Current Bid: $${currentBid}` : 'Auction has ended.'}</p>
            <h3>Bid History:</h3>
            <ul>
                {bids.map((bid, index) => (
                    <li key={index}>{`Bidder ${bid.bidder_id}: $${bid.amount}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default AuctionDisplay;
