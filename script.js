document.getElementById('astrology-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const birthdate = document.getElementById('birthdate').value;

    // Format the birthdate
    const datetime = `${birthdate}T00:00:00Z`;

    // Function to determine sun sign
    function getSunSign(date) {
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();

        if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
            return "Aquarius";
        } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
            return "Pisces";
        } else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
            return "Aries";
        } else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
            return "Taurus";
        } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
            return "Gemini";
        } else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
            return "Cancer";
        } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
            return "Leo";
        } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
            return "Virgo";
        } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
            return "Libra";
        } else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
            return "Scorpio";
        } else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
            return "Sagittarius";
        } else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
            return "Capricorn";
        }
    }

    try {
        const response = await fetch('http://localhost:3000/birth-chart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                datetime: datetime,
                location: 'Unknown' // Placeholder since birth place is removed
            })
        });

        if (response.ok) {
            const data = await response.json();
            const birthDateObj = new Date(birthdate);
            const sunSign = getSunSign(birthDateObj);
            const result = `Birthdate: ${birthdate}<br>Sun Sign: ${sunSign}<br><br>Birth Chart: ${JSON.stringify(data)}`;
            document.getElementById('horoscope-result').innerHTML = result;
        } else {
            const birthDateObj = new Date(birthdate);
            const sunSign = getSunSign(birthDateObj);
            const result = `Birthdate: ${birthdate}<br>Sun Sign: ${sunSign}`;
            document.getElementById('horoscope-result').innerHTML = result;
        }
    } catch (error) {
        const birthDateObj = new Date(birthdate);
        const sunSign = getSunSign(birthDateObj);
        const result = `Birthdate: ${birthdate}<br>Sun Sign: ${sunSign}`;
        document.getElementById('horoscope-result').innerHTML = result;
    }
});