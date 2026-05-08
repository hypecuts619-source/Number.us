
import https from 'https';

const url = 'https://raw.githubusercontent.com/smwa/routing-numbers/master/fedach_participants.json';

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => (data += chunk));
    res.on('end', () => {
        try {
            const parsed = JSON.parse(data);
            console.log('Sample Record:', JSON.stringify(parsed[0], null, 2));
        } catch (e) {
            console.log('Failed to parse');
        }
    });
});
