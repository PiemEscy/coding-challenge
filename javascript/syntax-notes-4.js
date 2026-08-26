// -------------------
// Display converted invoice base on rate api and its GBP outstanding balance
// api source: https://frankfurter.dev/#rates
const endpoint = `https://api.frankfurter.dev/v2/rates?${param()}`;

async function fetchExchangeRate(endpoint) {
    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
}


function convertInvoiceAmountToGbp(data) {
    const getInvoices = invoice();

    return getInvoices.map(function (item) {
        const filteredRate = data.filter((rates) => rates.quote === item.currency)[0]?.rate ?? 1;
        const amount = parseFloat(item.amount);
        item.rate = filteredRate;
        item.converted = amount * filteredRate;
        return item;
    });
}

function calculateOutstandingGbpBalance(fetchConverted) {
    let total = 0;
    for (const item of fetchConverted){
        total += item.converted;
    }
    return total;
    // easy way const total = fetchConverted.reduce((sum, item) => sum + item.converted, 0);
}

function result(data) {
    const fetchConverted = convertInvoiceAmountToGbp(data);
    return {
        conversion: fetchConverted,
        outstanding: calculateOutstandingGbpBalance(fetchConverted)
    }
}

function param() {
    const params = {
        base: "GBP",
        date: formattedDateToday()
    };
    return new URLSearchParams(params).toString();
}

function invoice() {
    const invoices = `[
        {
            "id": 1,
            "currency": "AUD",
            "amount": 250.00
        },
        {
            "id": 2,
            "currency": "EUR",
            "amount": 180.00
        },
        {
            "id": 3,
            "currency": "USD",
            "amount": 450.99
        },
        {
            "id": 4,
            "currency": "GBP",
            "amount": 125.50
        },
        {
            "id": 5,
            "currency": "AUD",
            "amount": 89.95
        },
        {
            "id": 6,
            "currency": "USD",
            "amount": 19.99
        },
        {
            "id": 7,
            "currency": "EUR",
            "amount": 999.99
        },
        {
            "id": 8,
            "currency": "GBP",
            "amount": 42.75
        }
    ]`;

    const data = JSON.parse(invoices);
    return data;
}

function formattedDateToday() {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

fetchExchangeRate(endpoint)
    .then(data => console.log(result(data)))
    .catch(error => console.error(error));


// This will cause cors error unless use local server
// async function invoice() {
//     const response = await fetch("./invoices.json");
//     const invoices = await response.json();
//     console.log(invoices);
// }