# RxSentry prototype

RxSentry is a medication-safety decision-support prototype. The landing page is at `/#top`; the live clinician workspace is at `/#workspace`.

## Run locally

In one terminal, install and start the API:

```bash
python3 -m pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```

In another terminal, start the web application:

```bash
npm install
npm run dev
```

## Architecture

- `backend/main.py` provides `/patients`, `/check-safety`, `/alerts/override`, and `/audit`.
- `backend/data/rules.json` is the editable deterministic rule base (drug-drug, drug-disease, allergy-class, therapeutic-duplication, and dose-limit rules).
- The React dashboard calls the API and surfaces structured findings with mechanism, clinical effect, patient context, evidence tag, and recommended action.
- Audit events and overrides are retained in memory for this MVP. A production service should store them in Postgres and use versioned, clinically reviewed rules.

## Safety and limitations

The rule engine—not an LLM—determines whether an alert is raised. The current curated data is intentionally small and illustrative; this is **not** a validated clinical product or a substitute for licensed clinician/pharmacist judgment. Production use requires licensed, current reference terminology and interaction data, clinical validation, privacy/security controls, and regulatory review.
