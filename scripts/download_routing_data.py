import requests
import json
import re

def download_and_parse_routing_data(output_file='src/data/routing.json'):
    # The actual Federal Reserve ACH directory list requires agreement to terms,
    # but some mirror URLs provide the raw TXT file. 
    # For a real programmatic SEO pipeline, you would hit the official URL or a reliable mirror.
    url = "https://www.frbservices.org/assets/financial-services/ach/routing-number-dir/fedachdir.txt"
    
    # Due to anti-bot protection on FRBServices, you may need to download this manually 
    # or use headers. We present a simplified parsing script below assuming a local file or 
    # successful request.
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
    
    print(f"Downloading Federal Reserve routing data...")
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print("Could not download file directly. Please download fedachdir.txt manually from frbservices.org and update this script to read the local file.")
        return

    data = response.text.splitlines()
    parsed_data = []

    for line in data:
        # Federal Reserve fixed-width text format parsing
        # Example format (approximate representation):
        # 011000015STATE STREET BANK AND TRUST CO.    BOSTON         MA...
        if len(line) < 60:
            continue
            
        routing_number = line[0:9].strip()
        bank_name = line[9:45].strip()
        city = line[45:65].strip()
        state = line[65:67].strip()
        
        # Phone and specialized flags are not always standard in the public plain-text list, 
        # so for an SEO site, you might append scraped data or defaults.
        # But for this dataset, we map it to our required format:
        parsed_data.append({
            "routing_number": routing_number,
            "bank_name": bank_name,
            "address": "Headquarters / Main Branch", # Mocked as fed list lacks full street
            "city": city.title(),
            "state": state,
            "zip": "Unknown", 
            "phone": "Check Online", 
            "type": "ACH"
        })

    with open(output_file, 'w') as f:
        json.dump(parsed_data, f, indent=2)
        
    print(f"Successfully generated {output_file} with {len(parsed_data)} routing numbers.")

if __name__ == "__main__":
    download_and_parse_routing_data()
