# Clarifying Questions: DestinyMap Project

## AI & Analysis Logic
1. **Prompt Engineering**: What specific structure should the DeepSeek prompt follow? Should it include:
   - A system prompt defining the astrologer persona?
   - Specific formatting instructions for the JSON response?
   - Examples of expected output format?

2. **Response Schema**: What exact JSON structure should DeepSeek return? For example:
   ```json
   {
     "analysis": "string",
     "luckyElements": ["Water", "Wood"],
     "recommendations": [
       {
         "location": "Kyoto, Japan",
         "reason": "string",
         "element": "Water"
       }
     ]
   }
   ```

3. **Error Handling**: How should we handle:
   - Invalid birth dates (future dates, impossible dates)?
   - API failures or timeouts?
   - Malformed JSON responses from DeepSeek?

## Affiliate Link Mapping
4. **Link Generation Strategy**: How should affiliate links be generated?
   - Pre-defined mapping (location → affiliate URL)?
   - Dynamic search URLs (e.g., `https://www.klook.com/search?q=Kyoto`)?
   - Should we include tracking parameters (UTM, affiliate IDs)?

5. **Affiliate Partners**: Which specific affiliate platforms should we target?
   - Klook, Agoda, Booking.com, Expedia?
   - Should we use different platforms for different regions?

## User Experience & Data
6. **Birth Time Precision**: How specific should birth time be?
   - Hour only (e.g., 14:00)?
   - Hour and minute (e.g., 14:30)?
   - Timezone consideration?

7. **Data Persistence**: Should we store any user data?
   - Session storage for returning users?
   - Analytics for clicks/conversions?
   - Privacy considerations (GDPR, etc.)?

8. **Result Sharing**: Should users be able to:
   - Share their results via social media?
   - Save/print their analysis?
   - Return to their results later?

## Business & Monetization
9. **Affiliate Disclosure**: What legal requirements exist?
   - Should we display "affiliate link" disclaimers?
   - Where should these disclaimers appear?

10. **Analytics Tracking**: What metrics should we track?
    - Number of analyses generated?
    - Click-through rates on affiliate links?
    - Conversion tracking?

## Technical Implementation
11. **API Rate Limiting**: How should we handle:
    - DeepSeek API rate limits?
    - User request limits (to prevent abuse)?
    - Cost management for AI calls?

12. **Caching Strategy**: Should we cache:
    - Common birth date analyses?
    - Affiliate link mappings?
    - To reduce API costs and improve performance?

13. **Fallback Content**: What should display if:
    - DeepSeek API is unavailable?
    - Analysis takes too long to generate?
    - Should we have static example results?

## Design & Content
14. **Branding Elements**: Should we include:
    - Specific color scheme (mystical/modern)?
    - Logo or brand name treatment?
    - Favicon and meta tags for SEO?

15. **Content Localization**: Should the app support:
    - Multiple languages?
    - Region-specific travel recommendations?
    - Currency considerations for affiliate links?

Please provide clarification on these points before proceeding to the implementation plan.

# Spec Clarification & Decision Document (v1.0)

This document serves as the official addendum to the original Spec, resolving all issues raised in the Audit Report.

## 1. Ambiguity Resolutions

### AI & Analysis Logic
* **Prompt Structure:** The DeepSeek System Prompt must strictly enforce this JSON schema:
    ```json
    {
      "personality_summary": "String (Max 50 chars)",
      "lucky_elements": ["Element1", "Element2"],
      "lucky_direction": "String (e.g., North-West)",
      "recommendations": [
        {
          "city": "Kyoto",
          "country": "Japan",
          "reason": "String (Why this fits the user's chart)"
        }
      ] // Strictly 3 items
    }
    ```
* **Affiliate Link Mapping:**
    * **Strategy:** "Static Mapping with Dynamic Fallback".
    * **Implementation:** Create a local file `lib/destinations.json` mapping popular cities to specific Affiliate URLs.
    * **Fallback Logic:** If the AI suggests a city NOT in the JSON, generate a generic search URL: `https://www.klook.com/search?q={CityName}&affiliate_id={ID}`.

### Business & Legal
* **Target Market:** Taiwan (Traditional Chinese users).
* **Legal/Privacy:**
    * **Data Persistence:** strictly **NO DATABASE**. User input is ephemeral (processed in memory) or encoded in the URL for sharing.
    * **GDPR:** Not applicable for MVP (Focus on Taiwan/Asia).

## 2. Acceptance Criteria

### Technical Limits
* **Rate Limiting:** Implement a simple rate limiter (using Vercel KV or simple memory cache if stateless): **Max 5 requests per IP per hour** to control API costs.
* **Caching:** Cache DeepSeek responses for **24 hours** based on a hash of the input (Name + Birth Date + Time).

### Analytics
* **Metrics to Track:**
    1.  `form_submit`: When user requests analysis.
    2.  `affiliate_click`: When user clicks a travel card.
* **Tool:** Use Vercel Analytics or a simple console log for MVP.

## 3. Logic & Constraints

### Language Support
* **Scope:** **Traditional Chinese (zh-TW)** ONLY. The AI output must be requested in Traditional Chinese.

### Input Precision
* **Birth Time:**
    * Format: `HH:mm` (24-hour format).
    * **Logic:** If user does not know the time, provide a "Don't know" checkbox.
    * **Handling:** If "Don't know", the AI prompt should use "12:00" but the analysis text should mention "Time unknown - General reading".

### Conflict Resolution
* **Fallback Content vs. Tracking:** Fallback links (Search Queries) MUST also have tracking tags appended.

## 4. Critical Missing Specs

### Security
* **API Keys:** `DEEPSEEK_API_KEY` must be stored in `.env.local` and accessed ONLY on the server side.
* **Endpoint Protection:** The API route calling DeepSeek must verify the `origin` header to prevent direct curl attacks.

### Performance SLA
* **Timeout:** Set API timeout to **15 seconds**.
* **Loading State:** Must show a "Calculating Destiny..." skeleton or spinner during the wait.

### Error Handling
* **User Feedback:**
    * If API fails/times out: Show "The stars are cloudy. Please try again later."
    * If Birth Date is future: Block at frontend validation.

### Testing Standard
* **Requirement:**
    1.  Unit Test for `Date` to `Lunar/Solar` conversion (if strictly needed) or simple Input Validation logic.
    2.  Integration Test: Mock the DeepSeek API response to test the Frontend rendering logic.

---
**Instruction to Cursor:**
Based on these clarifications, please mark the Spec as **APPROVED** and proceed to generate the **Implementation Plan**.

# Final Spec Lock & Decision Document (v2.0)

This document addresses ALL blockers raised in the Audit Report. It supersedes previous specs.

## 1. AI Prompt Engineering (Definitive)
The DeepSeek API call must use the following strict structure:

* **Model:** `deepseek-chat`
* **Temperature:** `1.1` (High creativity for fortune telling)
* **System Prompt:**
    ```text
    Role: You are a "Zi Wei Dou Shu" (Purple Star Astrology) master and a travel consultant.
    Language: ALWAYS output in Traditional Chinese (繁體中文).
    Task: Analyze the user's birth data. If "is_time_unknown" is true, ignore the "Hour" pillar and provide a general date-based reading.
    Output Format: JSON ONLY. No markdown, no conversational text.
    JSON Structure:
    {
      "personality_summary": "String (Max 60 chars, mystical tone)",
      "lucky_elements": ["Element1", "Element2"],
      "lucky_direction": "String (e.g., 南方)",
      "fortune_score": Integer (1-100),
      "recommendations": [
        {
          "city": "String (City Name)",
          "country": "String (Country Name)",
          "reason": "String (Why this fits the user's stars)"
        }
      ]
    }
    ```
* **User Prompt:** `Name: {name}, Date: {date}, Time: {time}, UnknownTime: {boolean}`

## 2. Affiliate Data Structure & Logic
* **File:** `/lib/destinations.json`
* **Structure:**
    ```json
    [
      {
        "city": "Kyoto",
        "country": "Japan",
        "keywords": ["culture", "temple", "history"],
        "affiliate_url": "[https://www.klook.com/](https://www.klook.com/)..."
      }
    ]
    ```
* **Matching Logic:**
    1.  **Normalization:** Convert AI output City/Country to lowercase.
    2.  **Exact Match:** Check if `city` exists in JSON.
    3.  **Fallback:** If no match, construct a dynamic URL: `https://www.klook.com/search?q={CityName}&affiliate_id={YOUR_ID}`.

## 3. Architecture & Rate Limiting Resolution
To resolve the "No Database vs. Rate Limit" conflict:
* **Solution:** Use **Vercel KV (Upstash Redis)** for rate limiting and caching. It is serverless and fits the stack.
* **Limit:** 5 requests per IP per hour.
* **Cache:** Cache AI results for 24 hours (Key: `Hash(Name+Date+Time)`).
* **GDPR/Privacy:** We hash the IP address before storing it in KV. We do not store PII (Personally Identifiable Information) in any persistent database, only in the temporary KV cache which expires.

## 4. URL Sharing & Encoding
* **Mechanism:** We do NOT encode the full JSON result. We encode the **Inputs**.
* **Format:** `https://destinymap.com/result?data={Base64String}`
* **Payload:** Base64 encodes `{ name, birthDate, birthTime, isUnknownTime }`.
* **Flow:** When a shared link is opened -> Decode Base64 -> Check Vercel KV Cache -> If miss, call DeepSeek -> Display Result.

## 5. Acceptance Criteria & Validation
* **Frontend Validation:**
    * Birth Date must be `< Today`.
    * If Date is future -> Show "Cannot read the future of the unborn."
* **Performance:**
    * API Timeout: **20 seconds** (DeepSeek can be slow).
    * Loading State: Must display a "Divining..." animation.
* **Language:**
    * DeepSeek System Prompt explicitly enforces `Traditional Chinese`.
    * Frontend UI hardcoded in Traditional Chinese.

---
**Instruction to Cursor:**
This document resolves all ambiguities.
1. **Analyze** this final decision.
2. **Generate** the **Implementation Plan** immediately. Do not ask further clarifying questions unless a strict technical blocker exists.