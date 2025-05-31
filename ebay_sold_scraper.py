
import requests
import json

# Replace with your actual eBay Production App ID (Client ID)
EBAY_APP_ID = 'YOUR_EBAY_APP_ID'
HEADERS = {
    'X-EBAY-C-ENDUSERCTX': 'contextualLocation=country=GB',
    'Authorization': 'Bearer YOUR_OAUTH_TOKEN',  # Requires OAuth token
    'Content-Type': 'application/json'
}

def get_sold_items_count(game_title):
    url = f"https://api.ebay.com/buy/browse/v1/item_summary/search?q={game_title}&filter=buyingOptions:{'FIXED_PRICE'}&limit=10"

    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        data = response.json()
        return len(data.get('itemSummaries', []))
    else:
        print(f"Failed to fetch data for {game_title}: {response.status_code}")
        return None

# Example usage
game_titles = [
    "Final Fantasy VII",
    "Panzer Dragoon Saga",
    "Castlevania Symphony of the Night"
]

sold_counts = {}
for title in game_titles:
    count = get_sold_items_count(title)
    sold_counts[title] = count

# Save results
with open("sold_counts.json", "w") as f:
    json.dump(sold_counts, f, indent=2)

print("Sold counts saved to sold_counts.json")
