function sendMessage() {
        const message = document.getElementById('message').value;
        fetch('/send_to_telegram', {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
                alert('Message sent');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error sending message');
        });
}
