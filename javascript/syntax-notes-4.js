// -------------------
const endpoint = `https://api.frankfurter.dev/v2/rates?${param()}`;

async function index(endpoint) {
    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
}

function param() {
    const params = {
        base: "GBP"
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

function displayExchangeRate() {
    const getInvoices = invoice();
    // return getInvoices.filter((item) => item.id === 1);
    return getInvoices.map((item) => item.id === 1);
}

function computation(params) {
    
}

console.log(displayExchangeRate());




// index(endpoint)
//     .then(data => console.log(data))
//     .catch(error => console.error(error));


// This will cause cors error unless use local server
// async function invoice() {
//     const response = await fetch("./invoices.json");
//     const invoices = await response.json();
//     console.log(invoices);
// }