function simulateEnglishAuction() {
    const numBidders = parseInt(document.getElementById('num_bidders').value);
    const duration = parseInt(document.getElementById('duration').value);
    const reservePrice = parseInt(document.getElementById('reserve_price').value);
    const biddingStyles = {};

    for (let i = 1; i <= numBidders; i++) {
        const style = document.getElementById(`bidder_${i}_style`).value;
        biddingStyles[`Bidder ${i}`] = style;
    }

    fetch('/simulate-auction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            auction_type: 'english',
            num_bidders: numBidders,
            duration: duration,
            reserve_price: reservePrice,
            bidding_styles: biddingStyles
        }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('simulation-result').style.display = 'block';
        document.getElementById('winning-bidder').textContent = data.winning_bidder;
        document.getElementById('winning-bid').textContent = data.winning_bid;

        const allBiddersList = document.getElementById('all-bidders');
        allBiddersList.innerHTML = '';
        for (const bidder in data.bidders) {
            allBiddersList.innerHTML += `<li>${bidder}: $${data.bidders[bidder]}</li>`;
        }

        const historyList = document.getElementById('history');
        historyList.innerHTML = '';
        data.history.forEach(round => {
            let roundDetails = `Round ${round.round}: `;
            for (const [bidder, bid] of Object.entries(round.bids)) {
                roundDetails += `${bidder} - $${bid}, `;
            }
            historyList.innerHTML += `<li>${roundDetails.slice(0, -2)}</li>`;
        });

        document.getElementById('feedback').textContent = data.feedback;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function simulateDutchAuction() {
    const numBidders = parseInt(document.getElementById('num_bidders').value);
    const startPrice = parseInt(document.getElementById('start_price').value);
    const decrement = parseInt(document.getElementById('decrement').value);
    const minPrice = parseInt(document.getElementById('min_price').value);

    fetch('/simulate-auction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            auction_type: 'dutch',
            num_bidders: numBidders,
            start_price: startPrice,
            decrement: decrement,
            min_price: minPrice,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
            return;
        }

        document.getElementById('simulation-result').style.display = 'block';
        document.getElementById('winning-bidder').textContent = data.winning_bidder;
        document.getElementById('winning-bid').textContent = data.winning_bid;
        document.getElementById('final-price').textContent = `$${data.final_price}`;
        document.getElementById('rounds').textContent = data.rounds;

        const allBiddersList = document.getElementById('all-bidders');
        allBiddersList.innerHTML = '';
        for (const bidder in data.bidders) {
            const bid = data.bidders[bidder];
            allBiddersList.innerHTML += `<li>${bidder}: ${bid !== null ? `$${bid}` : 'Did not bid'}</li>`;
        }

        document.getElementById('feedback').textContent = data.feedback || 'Auction completed successfully.';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


function simulateVickreyAuction() {
    const numBidders = parseInt(document.getElementById('num_bidders').value);

    fetch('/simulate-auction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            auction_type: 'vickrey',
            num_bidders: numBidders,
        }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('simulation-result').style.display = 'block';
        document.getElementById('winning-bidder').textContent = data.winning_bidder;
        document.getElementById('winning-bid').textContent = data.winning_bid;

        const allBiddersList = document.getElementById('all-bidders');
        allBiddersList.innerHTML = '';
        for (const bidder in data.bidders) {
            allBiddersList.innerHTML += `<li>${bidder}: $${data.bidders[bidder]}</li>`;
        }

        document.getElementById('feedback').textContent = data.feedback || 'Auction completed successfully.';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
