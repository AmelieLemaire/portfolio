const btn = document.getElementById('button');

document.getElementById('form')
    .addEventListener('submit', function(event) {
        event.preventDefault();

        btn.value = 'Sending...';

        const serviceID = 'default_service';
        const templateID = 'template_5kzomgh';

        const from_name = document.getElementById('from_name').value;
        const to_name = document.getElementById('to_name').value;
        const message = document.getElementById('message').value;
        const reply_to = document.getElementById('reply_to').value;

        const concatenatedMessage = `${message}\n\nEmail: ${reply_to}`;

        const templateParams = {
            from_name: from_name,
            to_name: to_name,
            message: concatenatedMessage,
            reply_to: reply_to
        };

        emailjs.send(serviceID, templateID, templateParams)
            .then(() => {
                btn.value = 'Send Email';
                alert('Message envoyé avec succès !');
                document.getElementById('form').reset();
            }, (err) => {
                btn.value = 'Send Email';
                alert(JSON.stringify(err));
            });
    });