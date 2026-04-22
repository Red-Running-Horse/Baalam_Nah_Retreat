# Quick Reference: Reusability Principles for Baalam Development

Use this one-page reference while coding to maintain reusability.

## The 5 Core Principles

### 1️⃣ NO HARDCODING
```javascript
// ❌ DON'T DO THIS
const RETREAT_NAME = "Baalam Nah Retreat";
const TOKEN_REWARD = 50;
const MAX_GUESTS = 50;

// ✅ DO THIS INSTEAD
import config from './baalam.config.toml';
const retreatName = config.business.name;
const tokenReward = config.rewards.base_token_per_booking;
const maxGuests = config.booking.max_capacity;
```

### 2️⃣ USE INTERFACES FOR CONTRACTS
```javascript
// ❌ DON'T DO THIS
function createBooking(userId, date, details) {
  // Retreat-specific logic mixed in
}

// ✅ DO THIS INSTEAD
class BookingService {
  async createBooking(userId, date, details) {
    // Generic logic
  }
}

class BalaamsBookingService extends BookingService {
  async createBooking(userId, date, details) {
    // Only retreat-specific additions via plugins
  }
}
```

### 3️⃣ PLUGINS FOR CUSTOMIZATION
```javascript
// ❌ DON'T DO THIS
if (isRetreat) {
  assignGuide();
  updateCalendar();
}

// ✅ DO THIS INSTEAD
bookingService.on('afterCreate', async (booking) => {
  await assignGuide(booking);
  await updateCalendar(booking);
});
```

### 4️⃣ EXTRACT GENERIC LOGIC
```javascript
// ❌ DON'T DO THIS - Mixing generic and specific
function calculateRewardForRetreat(booking) {
  let tokens = 50; // Baalam specific
  if (booking.partySize > 20) tokens *= 0.95;
  return tokens;
}

// ✅ DO THIS INSTEAD - Separate concerns
function calculateReward(baseAmount, multipliers) {
  let tokens = baseAmount;
  for (let [name, value] of Object.entries(multipliers)) {
    tokens *= value;
  }
  return tokens;
}

// In config:
rewards.multipliers = { groupSize: 0.95, earlyBird: 1.2 }
```

### 5️⃣ THINK RESTAURANT FIRST
Before writing code, ask:
- "How would this work at a restaurant?"
- "How would this work at a hotel?"
- "How would this work at a spa?"

If you can't answer, your code is too specific.

---

## File Organization for Reusability

```
src/
├── services/           ← Generic service logic (exportable to npm)
│   ├── BookingService.js
│   ├── RewardService.js
│   └── ReviewService.js
│
├── hooks/              ← Baalam-specific plugins
│   ├── useGuideAssignment.js
│   ├── useWeatherAlert.js
│   └── usePhotoSync.js
│
├── components/         ← UI components (mix reusable + custom)
│   ├── BookingCalendar.jsx    ← Reusable (core package)
│   ├── BalaamsSpecialOffer.jsx ← Baalam-specific
│   └── TokenReward.jsx         ← Reusable (core package)
│
├── config/
│   └── baalam.config.toml      ← All business logic here
│
└── pages/
    ├── BookingPage.jsx         ← Uses generic services + config
    ├── ReviewPage.jsx
    └── DashboardPage.jsx
```

---

## Configuration Hierarchy

Your config file should answer:
```toml
# WHAT is this business?
[business]
name = "Baalam Nah Retreat"
type = "group_experience"

# WHEN are they available?
[availability]
monday = "09:00-17:00"

# WHAT do they offer?
[booking]
slot_duration = 4 hours
max_capacity = 50

# HOW do they reward customers?
[rewards]
base_token = 50
review_bonus = 5

# WHO are their team?
[team]
guide_roles = ["guide", "photographer"]
```

Every value here should be editable by a non-programmer.

---

## Testing for Reusability

### For Generic Components
```javascript
// ✅ Test it works for MULTIPLE business types
describe('BookingCalendar', () => {
  it('renders 4-hour slots for retreats', () => { /* test */ });
  it('renders 90-minute slots for restaurants', () => { /* test */ });
  it('renders day slots for hotels', () => { /* test */ });
});
```

### For Services
```javascript
// ✅ Test it without hardcoded values
describe('RewardService', () => {
  it('calculates base reward from config', () => { /* test */ });
  it('applies multipliers correctly', () => { /* test */ });
  it('respects maximum reward cap', () => { /* test */ });
});
```

### For Business Logic
```javascript
// ✅ Keep tests generic
describe('Booking workflow', () => {
  it('creates booking with configured slot duration', () => { /* test */ });
  it('calls afterCreate hooks', () => { /* test */ });
  it('calculates reward based on config', () => { /* test */ });
});
```

---

## Checklist: Before Committing Code

- [ ] No hardcoded business names or values
- [ ] All business rules in config file
- [ ] Generic logic extracted to service
- [ ] Plugin hooks exist for customization
- [ ] Code passes "restaurant test" (would work there?)
- [ ] Test covers generic scenarios, not just Baalam
- [ ] Comments explain WHY, not WHAT
- [ ] No tight coupling to other Baalam services
- [ ] Error messages are generic
- [ ] Documentation includes other business examples

---

## Common Patterns to AVOID

### ❌ Pattern 1: Hardcoded Business Logic
```javascript
if (businessName === 'Baalam') {
  // Do special thing
}
```
👉 Use config + plugins instead

### ❌ Pattern 2: Mixing Concerns
```javascript
async function handleBooking() {
  // 1. Booking creation
  // 2. Reward calculation
  // 3. Email sending
  // 4. Calendar update
}
```
👉 Use service composition + orchestration

### ❌ Pattern 3: Custom UI for Each Business
```jsx
<BalaamsBookingForm />
<RestaurantBookingForm />
<HotelBookingForm />
```
👉 Use configurable form component

### ❌ Pattern 4: Duplicate Validation
```javascript
// BookingService validates dates
// BalaamsBookingService validates dates again
```
👉 Call parent validation, extend only if needed

---

## Key Npm Packages to Extract

**Priority 1 (Extract from Baalam MVP):**
- `@fcpqroo/core-wallet` - fedi.xyz integration
- `@fcpqroo/core-rewards` - token calculation engine
- `@fcpqroo/core-storage` - PocketBase wrapper

**Priority 2 (Extract as you develop):**
- `@fcpqroo/ui-booking` - calendar + form components
- `@fcpqroo/service-booking` - abstract booking service
- `@fcpqroo/ui-rewards` - token display components

**Priority 3 (After MVP validation):**
- `@fcpqroo/service-reviews` - review service
- `@fcpqroo/service-governance` - guardian workflows
- `@fcpqroo/ui-dashboard` - shared admin interface

---

## Reusability Score Targets

**Your code should aim for:**
- 70-80% reusable code (shared across businesses)
- 15-20% configuration (business-specific rules)
- 5-10% hard customization (truly unique logic)

**Check your progress with:**
```bash
# Count lines of code
find src -name "*.js" -o -name "*.jsx" | xargs wc -l

# Estimate generic vs specific
# Generic = services/, components/, hooks/ (except Baalam-specific ones)
# Specific = Baalam-only components, Baalam-specific config
```

---

## When to Extract to npm

**Extract when:**
- ✅ Used or could be used in 2+ businesses
- ✅ No hardcoded business references
- ✅ Well-tested (80%+ coverage)
- ✅ Clear documentation
- ✅ Stable API

**Don't extract when:**
- ❌ Only used in Baalam
- ❌ Still rapidly changing
- ❌ Poor test coverage
- ❌ Unclear interface

---

## Decision Log Template

When you make a reusability decision, record it:

```markdown
### Decision: [What did you decide?]

**Context**: [Why did you need to make this decision?]

**Options Considered**:
1. [Option A and why you rejected it]
2. [Option B and why you rejected it]
3. [Option C - CHOSEN and why]

**Consequences**:
- [Pro: Impact if new restaurant joins]
- [Pro: Impact on code maintenance]
- [Con: Short-term dev effort]

**Date**: 2026-04-22
**Committed By**: Copilot
```

---

## Quick Wins for Reusability

1. **Extract configuration first** (baalam.config.toml)
   - 30 min → 30% of work
   
2. **Create interfaces before implementation**
   - 1 hour → Prevents hardcoding
   
3. **Write tests for 3 scenarios**
   - 2 hours → Validates reusability
   
4. **Document with examples**
   - 1 hour → Helps next developer understand
   
5. **Create npm package stubs early**
   - 1 hour → Clear boundaries

---

## Reach Out When

- ❓ You're about to hardcode a value → Use config
- ❓ You see Baalam-specific logic → Plugin or interface
- ❓ Component is only for Baalam → Make it configurable
- ❓ You have questions about patterns → Check COMPONENT_REUSABILITY_STRATEGY.md

Remember: **Building once for 100 businesses is better than building 100 times for 1 business.**

