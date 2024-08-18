document.getElementById('shorten').addEventListener('click', shortenURL);
document.getElementById('copy').addEventListener('click', copyURL);

function shortenURL() {
    const longURL = document.querySelector('.right-card input[type="text"]').value;
    if (!longURL) return;
    
    const apiURL = `https://api.tinyurl.com/create?url=${encodeURIComponent(longURL)}`;
    const apiToken = 'okpY8c4ZxjeLiXUGUQUk83F6eGe11wlJdOxFCk4Lnd6anVQ6hMrtJVOqEJUM'; 

    fetch(apiURL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            url: longURL,
        }),
    })
    .then(response => response.json())
    .then(data => {
        const outputField = document.querySelector('.left-card input[type="text"]');
        if (data.data) {
            const shortURL = data.data.tiny_url;
            outputField.value = shortURL;
        } else {
            outputField.value = `Error: ${data.errors[0].message}`;
        }
    })
    .catch(error => {
        document.querySelector('.left-card input[type="text"]').value = `Error: ${error.message}`;
    });
}

function copyURL() {
    const outputField = document.querySelector('.left-card input[type="text"]');
    outputField.select();
    outputField.setSelectionRange(0, 99999); 

    try {
        document.execCommand('copy');
        alert('Short URL copied to clipboard!');
    } catch (err) {
        alert('Failed to copy URL!');
    }
}
