import React from 'react';

const AuctionControls = ({ startAuction, stopAuction, setCurrentBid }) => {
    const handleBid = () => {
        setCurrentBid((prev) => prev + 10);
    };

    return (
        <div>
            <button onClick={startAuction}>Start Auction</button>
            <button onClick={stopAuction}>Stop Auction</button>
            <button onClick={handleBid}>Place Bid</button>
        </div>
    );
};

export default AuctionControls;
