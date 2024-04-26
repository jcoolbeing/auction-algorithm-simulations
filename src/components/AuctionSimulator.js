import React, { useState, useEffect } from 'react';
import AuctionDisplay from './AuctionDisplay';
import './AuctionSimulator.css';

const AuctionSimulator = () => {
    const [auctionType, setAuctionType] = useState('English');
    const [numBidders, setNumBidders] = useState(3);
    const [startingBid, setStartingBid] = useState(100);
    const [increment, setIncrement] = useState(10);
    const [auctionValueScore, setAuctionValueScore] = useState(Math.ceil(Math.random() * 10));
    const [currentBid, setCurrentBid] = useState(startingBid);
    const [isAuctionActive, setIsAuctionActive] = useState(false);
    const [showBidders, setShowBidders] = useState(false);  // New state to control display of bidders
    const [bids, setBids] = useState([]);
    const [bidders, setBidders] = useState([]);

    useEffect(() => {
        if (isAuctionActive) {
            setBidders(createBidders());
            setShowBidders(true);  // Show bidders when auction starts
        }
    }, [isAuctionActive, numBidders]);

    const createBidders = () => {
        const strategies = ["aggressive", "conservative", "mixed"];
        return Array.from({ length: numBidders }, (_, index) => ({
            bidder_id: index + 1,
            maxBid: Math.ceil(Math.random() * 1000),
            valueScore: Math.ceil(Math.random() * 10),
            strategy: strategies[Math.floor(Math.random() * strategies.length)]
        }));
    };

    const startAuction = () => {
        setCurrentBid(startingBid);
        setIsAuctionActive(true);
        setBids([]);
        setShowBidders(false);  // Reset when starting new auction
        handleEnglishAuction();
    };

    const handleEnglishAuction = () => {
        let bid = startingBid;
        let lastBidderID = null;
        let consecutiveBidsBySameBidder = 0;
        const interval = setInterval(() => {
            let activeBidders = false;
            let uniqueBidderCount = new Set();

            bidders.forEach(bidder => {
                let bidIncrease = calculateBidIncrease(bidder, bid);
                if (bid + bidIncrease > bid) {
                    bid += bidIncrease;
                    setCurrentBid(bid);
                    recordBid(bid, bidder.bidder_id);
                    activeBidders = true;
                    uniqueBidderCount.add(bidder.bidder_id);

                    if (lastBidderID === bidder.bidder_id) {
                        consecutiveBidsBySameBidder++;
                    } else {
                        lastBidderID = bidder.bidder_id;
                        consecutiveBidsBySameBidder = 1;
                    }
                }
            });

            if (!activeBidders || (uniqueBidderCount.size === 1 && consecutiveBidsBySameBidder > 1)) {
                clearInterval(interval);
                setIsAuctionActive(false);
            }
        }, 1000);
    };

    const calculateBidIncrease = (bidder, currentBid) => {
        const valueDifference = auctionValueScore - bidder.valueScore;
        let willingness = 1;

        if (valueDifference <= 0) {
            willingness = bidder.strategy === "aggressive" ? 2 : (bidder.strategy === "conservative" ? 0.5 : 1);
        } else {
            willingness = bidder.strategy === "aggressive" ? 3 : (bidder.strategy === "conservative" ? 1 : 1.5);
        }

        return currentBid + (increment * willingness) <= bidder.maxBid + (10 * valueDifference) ? increment * willingness : 0;
    };

    const recordBid = (amount, bidderId) => {
        const newBid = { bidder_id: bidderId, amount };
        setBids(currentBids => [...currentBids, newBid]);
    };

    const renderBiddersInfo = () => (
        <div>
            <h2>Bidders Information</h2>
            <ul>
                {bidders.map((bidder, index) => (
                    <li key={index}>
                        Bidder {bidder.bidder_id}: Max Bid - ${bidder.maxBid}, Strategy - {bidder.strategy}
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="auction-container">
            <div className="input-section">
                <h1>Auction Simulator</h1>
                <select value={auctionType} onChange={e => setAuctionType(e.target.value)}>
                    <option value="English">English</option>
                </select>
                <label>
                    Number of Bidders:
                    <input type="number" value={numBidders} onChange={e => setNumBidders(Number(e.target.value))} />
                </label>
                <label>
                    Starting Bid:
                    <input type="number" value={startingBid} onChange={e => setStartingBid(Number(e.target.value))} />
                </label>
                <label>
                    Bid Increment:
                <input type="number" value={increment} onChange={e => setIncrement(Number(e.target.value))} />
                </label>
                <button onClick={startAuction} disabled={isAuctionActive}>Start Auction</button>
                <button onClick={() => setIsAuctionActive(false)} disabled={!isAuctionActive}>Stop Auction</button>
            </div>
            <AuctionDisplay currentBid={currentBid} isAuctionActive={isAuctionActive} bids={bids} />
            {showBidders && renderBiddersInfo()}
        </div>
    );
};

export default AuctionSimulator;
