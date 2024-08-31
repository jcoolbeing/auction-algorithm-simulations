import React, { useState } from 'react';

function EnglishAuction() {
    const [bids, setBids] = useState({});
    const [result, setResult] = useState(null);

    const handleBidChange = (e) => {
        const { name, value } = e.target;
        setBids({
            ...bids,
            [name]: Number(value)
        });
    };

    const handleSubmit = () => {
        // We'll connect this to the backend later
        const mockResult = {
            winner: "Alice",
            winning_bid: 200
        };
        setResult(mockResult);
    };

    return (
        <div>
            <h1>English Auction</h1>
            <form>
                <div>
                    <label htmlFor="Alice">Alice's Bid: </label>
                    <input id="Alice" name="Alice" onChange={handleBidChange} />
                </div>
                <div>
                    <label htmlFor="Bob">Bob's Bid: </label>
                    <input id="Bob" name="Bob" onChange={handleBidChange} />
                </div>
                <div>
                    <label htmlFor="Charlie">Charlie's Bid: </label>
                    <input id="Charlie" name="Charlie" onChange={handleBidChange} />
                </div>
                <button type="button" onClick={handleSubmit}>Submit Bids</button>
            </form>
            {result && (
                <div>
                    <h2>Auction Result</h2>
                    <p>Winner: {result.winner}</p>
                    <p>Winning Bid: ${result.winning_bid}</p>
                </div>
            )}
        </div>
    );
}

export default EnglishAuction;
