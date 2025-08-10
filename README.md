# Refurbished Steam Deck Stock API

This project provides a simple API to check the availability of refurbished Steam Decks on the Steam store.

## 🚀 Features

- Exposes a single API endpoint to check stock status.
- Built with Hono.js for high performance.
- Written in TypeScript.

## 🛠️ Setup & Usage

### Prerequisites

- Node.js (v18 or higher)
- pnpm

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/refurb-steamdeck-stock-tracker.git
    cd refurb-steamdeck-stock-tracker
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

### Running the Server

To start the development server, run:

```bash
pnpm dev
```

The server will start on port 3000.

### API Endpoint

#### `GET /api/stock/:packageid`

This endpoint checks the stock for a given Steam Deck model.

- **URL Params**:
  - `packageid`: The package ID of the Steam Deck model.
- **Query Params**:
  - `country` (optional): The two-letter country code (e.g., `US`, `DE`). Defaults to `US`.

**Example Request**:

```bash
curl http://localhost:3000/api/stock/903905?country=US
```

**Example Response**:

```json
{
  "inventory_available": true,
  "high_pending_orders": false
}
```

### Steam Deck Models

- **64GB LCD**: 903905
- **256GB LCD**: 903906
- **512GB LCD**: 903907
- **512GB OLED**: 1202542
- **1TB OLED**: 1202547

## 📜 License

This project is licensed under the ISC License.
