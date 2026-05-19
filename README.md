# US Routing Number Database – Free API & CSV Dataset

> 🇺🇸 Complete, up‑to‑date directory of ABA routing numbers for all US financial institutions.

**Live lookup tool:** 👉 [usroutingnumber.com](https://usroutingnumber.com)

---

## 📦 What's inside this repository?

This repo provides:
- A **CSV / JSON dataset** of 6,000+ active US routing numbers, including bank name, address, phone number, and FedACH status.
- A **free API endpoint** to validate or look up routing numbers programmatically.
- Code examples for JavaScript, Python, PHP, and cURL.

---

## 🚀 Quick Start – Use the Online Tool

Need a quick answer? Visit the live website:  
➡️ **[usroutingnumber.com](https://usroutingnumber.com)**

Enter any 9‑digit ABA routing number to instantly see:
- Bank name and location
- FedACH (ACH transfer) eligibility
- Fedwire (wire transfer) support
- Record type (main office, branch, etc.)

---

## 🔌 API Example (No API Key Required)

Our public API is free and rate‑limited to 100 requests/minute.

### Lookup by Routing Number

```bash
curl "https://usroutingnumber.com/api/lookup?routing=021000021"
```

**Response:**
```json
{
  "routing_number": "021000021",
  "bank_name": "JPMorgan Chase Bank",
  "address": "270 Park Avenue, New York, NY 10017",
  "phone": "800-677-7477",
  "ach_status": "eligible",
  "fedwire_status": "eligible",
  "record_type": "main office",
  "last_updated": "2026-01-15"
}
```

### Validate a Routing Number (Returns 200 OK or 404 Not Found)

```bash
curl -I "https://usroutingnumber.com/api/validate?routing=111000025"
```

**Possible status codes:**
- `200 OK` – valid, active routing number
- `404 Not Found` – invalid or inactive
- `429 Too Many Requests` – rate limit exceeded

### Search by Bank Name (Partial match)

```bash
curl "https://usroutingnumber.com/api/search?q=chase&limit=5"
```

---

## 📊 Dataset – Full Routing Number CSV

Download the complete offline dataset:

- [`routing_numbers.csv`](./data/routing_numbers.csv) – all 6,000+ active routing numbers
- [`routing_numbers.json`](./data/routing_numbers.json) – same data in JSON format

**CSV schema:**

| Column | Description |
| :--- | :--- |
| `routing_number` | 9‑digit ABA number |
| `bank_name` | Official institution name |
| `address` | Street address |
| `city` | City |
| `state` | Two‑letter state code |
| `zip` | ZIP code |
| `phone` | Main bank phone |
| `ach_eligible` | Yes/No – can be used for ACH transfers |
| `wire_eligible` | Yes/No – can be used for Fedwire |
| `record_type` | Main office / Branch |
| `last_updated` | YYYY‑MM‑DD |

---

## 💻 Code Examples

### JavaScript (Node.js / Browser)

```javascript
async function lookupRoutingNumber(routing) {
  const res = await fetch(`https://usroutingnumber.com/api/lookup?routing=${routing}`);
  return res.json();
}

lookupRoutingNumber('021000021').then(console.log);
```

### Python

```python
import requests

def lookup_routing(routing):
    url = f"https://usroutingnumber.com/api/lookup?routing={routing}"
    return requests.get(url).json()

print(lookup_routing('021000021')['bank_name'])  # JPMorgan Chase Bank
```

### PHP

```php
$routing = '021000021';
$json = file_get_contents("https://usroutingnumber.com/api/lookup?routing=$routing");
$data = json_decode($json, true);
echo $data['bank_name'];
```

### cURL (Command line)

```bash
# Save result to file
curl -o bank_info.json "https://usroutingnumber.com/api/lookup?routing=021000021"
```

---

## 🤝 Contributing

Routing numbers change occasionally (bank mergers, closures, etc.). If you find an outdated or incorrect entry:

1. Fork this repository.
2. Update `data/routing_numbers.csv` or `data/routing_numbers.json`.
3. Open a pull request with your source (e.g., FedACH directory link).

Alternatively, [open an issue](https://github.com/yourusername/us-routing-number-dataset/issues) with the correction.

---

## 📄 License

**MIT License** – free for commercial and personal use.  
No attribution required, though a link back is appreciated.

---

## 🌐 Related Resources

- [Live Routing Number Lookup](https://usroutingnumber.com) – validate online instantly.
- [SWIFT Code Directory](https://swiftcodedir.com) – global bank codes for international wires.
- [Quick Unit Converter](https://quickconvertunits.com) – fast unit conversions.

---

**⭐ Found this useful? Star the repo to help others discover these free banking data tools.**
