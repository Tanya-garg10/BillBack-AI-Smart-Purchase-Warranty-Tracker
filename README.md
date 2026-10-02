# BillBack AI — Smart Purchase & Warranty Tracker

BillBack AI is a neo-luxury purchase vault that turns invoices into structured purchase records, tracks return deadlines, monitors active warranties, and generates ready-to-submit warranty claim packs — all in one place.

## Features

- **Invoice Upload & Extraction** — Upload PDF or image invoices; OpenAI GPT-4o extracts product name, seller, price, return window, and warranty period automatically
- **Return Deadline Tracker** — Color-coded urgency alerts (critical / warning / safe) so you never miss a return window
- **Warranty Vault** — Tracks active warranties with months remaining, provider hotlines, and serial numbers
- **Claim Ready Pack** — One-click warranty claim preparation with evidence export
- **Ask BillBack AI** — Natural language chat interface to query purchases, warranties, and deadlines
- **Analytics Dashboard** — Spend breakdown by category across all tracked purchases
- **AWS Integration** — Amazon S3 for invoice storage, DynamoDB for purchase records, EventBridge for scheduled deadline scanning

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS v4, Vite |
| Backend | Express.js, Node.js (tsx) |
| AI / Extraction | OpenAI GPT-4o |
| Storage | Amazon S3 |
| Database | Amazon DynamoDB |
| Events | Amazon EventBridge |
| Animations | Motion (Framer Motion) |

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- OpenAI API key
- (Optional) AWS credentials for S3, DynamoDB, EventBridge

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Tanya-garg10/BillBack-AI-Smart-Purchase-Warranty-Tracker.git
   cd BillBack-AI-Smart-Purchase-Warranty-Tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Set up environment variables — copy `.env.example` to `.env.local` and fill in your keys:
   ```bash
   cp .env.example .env.local
   ```

   | Variable | Required | Description |
   |---|---|---|
   | `OPENAI_API_KEY` | Yes | OpenAI API key for invoice extraction |
   | `OPENAI_MODEL_ID` | No | Model to use (default: `gpt-4o`) |
   | `AWS_REGION` | No | AWS region (default: `ap-south-1`) |
   | `AWS_ACCESS_KEY_ID` | No | AWS access key (for S3/DynamoDB/EventBridge) |
   | `AWS_SECRET_ACCESS_KEY` | No | AWS secret key |
   | `AWS_S3_INVOICE_BUCKET` | No | S3 bucket name (default: `billback-invoices-prod`) |
   | `AWS_DYNAMODB_TABLE` | No | DynamoDB table name (default: `BillBack-Purchases`) |

   > Without AWS credentials, the app runs in local simulation mode using mock data — fully functional for demo purposes.

4. Start the development server:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── server.ts                  # Express server entry point
├── server/
│   └── aws/
│       ├── bedrock.ts         # OpenAI invoice extraction
│       ├── dynamodb.ts        # DynamoDB purchase records
│       ├── s3.ts              # S3 invoice storage
│       ├── eventbridge.ts     # EventBridge deadline scanner
│       └── deadline-engine.ts # Return & warranty deadline logic
├── src/
│   ├── pages/                 # Route-level page components
│   ├── components/            # Reusable UI components
│   ├── context/               # App-wide state (AppContext)
│   ├── lib/                   # Mock data & utilities
│   └── types.ts               # Shared TypeScript types
└── public/                    # Static assets
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build frontend + bundle server for production |
| `npm run start` | Run production build |
| `npm run lint` | TypeScript type check |

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/invoices/upload-url` | Generate S3 pre-signed upload URL |
| `POST` | `/api/invoices/process` | Extract invoice data via OpenAI + store in DynamoDB |
| `GET` | `/api/purchases` | Fetch all purchases from DynamoDB |
| `POST` | `/api/eventbridge/check-deadlines` | Trigger EventBridge deadline scanner |

## License

MIT
