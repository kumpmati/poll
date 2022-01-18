# Poll

## Getting started

1. Clone the repository
2. Navigate to the repository root
3. Run `npm install`
4. Create a `.env` file in the repository root, with the following contents:

```bash
# '/poll/ws' is the path for the poll's websocket route in @kumpmati/tools-backend
# NOTE: use 'ws' as protocol when the backend is running locally, otherwise use 'wss'!
VITE_PUBLIC_WS_URL=wss://<backend url>/poll/ws
# '/poll' is the path for the poll REST api when using @kumpmati/tools-backend
VITE_API_URL=https://<backend url>/poll
```

5. Run `npm run dev` in the repository root

## Scripts

```bash
npm run dev // starts development server
```
