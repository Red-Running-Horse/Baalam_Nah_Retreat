# Component Reusability Planning Worksheet

## Part 1: Current Project Inventory

### Existing Components (from Baalam_Nah_Retreat)

Based on the project structure, we have or will create:

#### UI Components
- [ ] Calendar component (Radix UI + custom)
- [ ] Booking form
- [ ] Review submission component
- [ ] Token reward display
- [ ] User profile/dashboard
- [ ] Navigation/header

**Question**: Which are generic enough to package?
- Calendar: YES (used in all booking businesses)
- Booking form: MAYBE (needs heavy customization)
- Token display: YES (same across all)

#### Services/Logic
- [ ] Booking service
- [ ] Reward calculation engine
- [ ] Review moderation
- [ ] fedi.xyz integration
- [ ] PocketBase wrapper
- [ ] Email notifications

**Question**: Which should be abstract interfaces?
- Booking: YES (interface + implementations)
- Reward: YES (interface + implementations)
- fedi.xyz: YES (core wallet abstraction)

---

## Part 2: Reusability Dimension Matrix

For each component, score (1-5) on reusability potential:

| Component | Generic (1-5) | Interface Clarity (1-5) | Config Friendly (1-5) | Reuse Score | Priority |
|-----------|---|---|---|---|---|
| Wallet Integration | 5 | 4 | N/A | 9/15 | 🔴 HIGH |
| Reward Engine | 5 | 4 | 5 | 14/15 | 🔴 HIGH |
| Calendar UI | 4 | 3 | 5 | 12/15 | 🟡 MED |
| Booking Service | 4 | 3 | 4 | 11/15 | �� MED |
| Review Service | 3 | 3 | 3 | 9/15 | 🟠 LOW |
| Email Notif | 5 | 4 | 3 | 12/15 | 🟡 MED |

**Insight**: Prioritize wallet + reward engine abstractions first!

---

## Part 3: Component Dependency Map

```
┌─────────────────────────────────────────────────────┐
│         fedi.xyz Wallet Integration                 │
│  (Lowest level - no dependencies)                   │
└────────────────────┬────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
    ┌────────┐  ┌─────────┐  ┌──────────┐
    │ Reward │  │ Booking │  │ Guardian │
    │ Engine │  │ Service │  │  Approval│
    └───┬────┘  └────┬────┘  └────┬─────┘
        │            │             │
        │    ┌───────┴─────────┐   │
        │    ↓                 ↓   ↓
        │  ┌──────────────────────────┐
        │  │   Booking Orchestrator   │
        └─→│ (composes services)      │
           └───────────┬──────────────┘
                       │
    ┌──────────────────┼──────────────────┐
    ↓                  ↓                   ↓
┌────────┐      ┌──────────┐      ┌──────────┐
│Calendar UI  │ Review UI │    │Analytics │
│ Component   │Component  │    │Component  │
└────────────┘└───────────┘    └──────────┘
```

**Key Insight**: Build bottom-up (wallet → rewards → services → UI)

---

## Part 4: Configuration vs Code Trade-off Analysis

### Booking Service - Decision Tree

**Question: What varies between businesses?**

| Decision | Baalam | Restaurant | Hotel | Solution |
|----------|--------|-----------|-------|----------|
| Slot duration | 4 hrs | 90 min | N/A (range) | CONFIG |
| Capacity | 50 people | 100 seats | 150 rooms | CONFIG |
| Advance booking | 30 days | 2 days | 60 days | CONFIG |
| Cancellation policy | 24 hrs | Same day | 7 days | CONFIG |
| Guide assignment | Required | N/A | Auto | PLUGIN |
| Price variations | None | Happy hour | Seasonal | PLUGIN |
| Custom metadata | Dietary needs | Seating pref | Room type | SCHEMA |

**Recommendation**: 
- 80% of logic → CONFIG
- 15% of logic → PLUGINS
- 5% of logic → Code fork (last resort)

### Reward Engine - Decision Tree

| Decision | Baalam | Restaurant | Hotel | Solution |
|----------|--------|-----------|-------|----------|
| Base reward | 50 tokens | 10 tokens | 100 tokens | CONFIG |
| Review bonus | 5 tokens | 3 tokens | 10 tokens | CONFIG |
| Loyalty tiers | None | 3 tiers | 3 tiers | PLUGIN |
| Referral bonus | 10 tokens | 15 tokens | 20 tokens | CONFIG |
| Guardian approval | Yes | No | Yes | CONFIG |
| Volunteer rates | Yes | No | No | PLUGIN |

**Recommendation**:
- 85% of logic → CONFIG
- 15% of logic → PLUGIN

---

## Part 5: npm Package Breakdown

### Core Infrastructure Packages (@fcpqroo/core-*)

#### @fcpqroo/core-wallet
**Purpose**: Wallet authentication and balance management
**Depends On**: None
**Used By**: Everything
**API Contract**:
```typescript
interface Wallet {
  verifySignature(message: string, signature: string): Promise<boolean>
  getBalance(wallet: string): Promise<number>
  getTransactionHistory(wallet: string, limit: number): Promise<Transaction[]>
  signMessage(message: string): Promise<string>
}
```

**Reusability Score**: ⭐⭐⭐⭐⭐ (5/5)

#### @fcpqroo/core-rewards
**Purpose**: Token calculation and issuance
**Depends On**: core-wallet
**Used By**: All booking services
**API Contract**:
```typescript
interface RewardEngine {
  calculateReward(context: BookingContext, config: RewardConfig): number
  issueReward(wallet: string, amount: number, reason: string): Promise<void>
  getRewardHistory(wallet: string): Promise<Reward[]>
}
```

**Reusability Score**: ⭐⭐⭐⭐⭐ (5/5)

#### @fcpqroo/core-storage
**Purpose**: PocketBase abstraction layer
**Depends On**: None (but wraps PocketBase)
**Used By**: All services
**API Contract**:
```typescript
interface DataStore {
  create(table: string, data: any): Promise<any>
  read(table: string, id: string): Promise<any>
  update(table: string, id: string, data: any): Promise<any>
  delete(table: string, id: string): Promise<void>
  query(table: string, filters: any): Promise<any[]>
}
```

**Reusability Score**: ⭐⭐⭐⭐ (4/5)

---

### Service Packages (@fcpqroo/service-*)

#### @fcpqroo/service-booking
**Purpose**: Abstract booking service interface and utilities
**Depends On**: core-wallet, core-storage
**Provides**: IBookingService interface, plugin hooks, validators
**Used By**: Business-specific booking services

**Implementations**:
- BalaamsBookingService (group experiences)
- RestaurantBookingService (time slots)
- HotelBookingService (date ranges)

**Reusability Score**: ⭐⭐⭐⭐ (4/5)

---

### UI Packages (@fcpqroo/ui-*)

#### @fcpqroo/ui-booking
**Purpose**: Reusable booking UI components
**Depends On**: service-booking, ui-theme
**Exports**:
- `<BookingCalendar />` - Generic calendar with configurable slots
- `<SlotSelector />` - Generic slot selection
- `<BookingForm />` - Extensible form with field validation
- `<BookingConfirmation />` - Standard confirmation display

**Reusability Score**: ⭐⭐⭐ (3/5) - Medium customization

---

## Part 6: Implementation Priority Matrix

### High Priority (Build First)
```
⭐⭐⭐⭐⭐ Wallet Integration (core-wallet)
  └─ Everything else depends on this
  
⭐⭐⭐⭐⭐ Reward Engine (core-rewards)
  └─ Differentiator + easy to extract
  
⭐⭐⭐⭐ Storage Abstraction (core-storage)
  └─ Enables PocketBase flexibility
```

**Timeline**: Week 1-2 of Baalam development

### Medium Priority (Build Concurrently)
```
⭐⭐⭐⭐ Booking Service Interface (service-booking)
  └─ Separates generic from specific
  
⭐⭐⭐⭐ Calendar UI Component (ui-booking)
  └─ Most reused UI component
```

**Timeline**: Week 2-3 of Baalam development

### Lower Priority (Extract Later)
```
⭐⭐⭐ Review Service (service-reviews)
  └─ More business-specific needs
  
⭐⭐⭐ Governance Dashboard (ui-guardian)
  └─ Fewer users, more specialized
```

**Timeline**: After Baalam MVP, before scaling

---

## Part 7: Business-Specific Extension Points

### Baalam_Nah_Retreat Specific

**Plugin Hooks Needed**:
1. `beforeBooking` - Verify guide availability
2. `afterBooking` - Update social media calendar
3. `beforeReview` - Check if attendee actually participated
4. `rewardMultiplier` - Group size discounts

**Custom Fields** (stored in metadata):
```javascript
{
  guide_assigned: string,
  group_composition: { adults, children, dietary_needs },
  retreat_type: "cultural" | "wellness" | "adventure",
  weather_alert: boolean
}
```

**Custom Config**:
```toml
[team]
guides_required = 1
guide_briefing_days_before = 2

[weather]
rain_cancellation = true
temperature_limits = { min: 15, max: 40 }

[photos]
auto_generate_album = true
share_to_fcpqroo = true
```

---

## Part 8: Testing Strategy for Reusable Components

### Core Packages (100% coverage expected)
- Unit tests for all interfaces
- Integration tests with real PocketBase
- Mock fedi.xyz for offline testing

### Service Packages (80% coverage)
- Unit tests for business logic
- Integration tests with core packages
- Multiple scenario tests (restaurant, hotel, retreat)

### UI Components (70% coverage)
- Component story tests
- User interaction scenarios
- Theme/config variations

---

## Part 9: Documentation Requirements for Reusability

For each npm package, create:

1. **README.md**
   - What problem does it solve?
   - Installation instructions
   - Basic usage example

2. **API.md**
   - Every exported interface
   - Every configuration option
   - Return types and error cases

3. **EXAMPLES.md**
   - Restaurant scenario
   - Hotel scenario
   - Retreat scenario

4. **MIGRATION.md**
   - Version history
   - Breaking changes
   - Upgrade path

---

## Part 10: Decision Log

### Decision 1: Monorepo vs Multiple Repos

**Options**:
A) Monorepo (single @fcpqroo namespace)
B) Multiple separate GitHub repos

**Recommendation**: **A - Monorepo**

**Rationale**:
- Easier to manage consistent versions
- Shared dependencies install once
- Atomic commits across packages
- Better for business sites to stay in sync

**Structure**:
```
fcpqroo (monorepo)
├── packages/
│   ├── core/
│   │   ├── wallet
│   │   ├── rewards
│   │   └── storage
│   ├── services/
│   │   ├── booking
│   │   └── reviews
│   └── ui/
│       └── booking
└── sites/
    ├── baalam-nah-retreat
    ├── fcpqroo-restaurant
    └── fcpqroo-hotel
```

---

### Decision 2: Configuration Format (TOML vs YAML vs JSON)

**Options**:
A) TOML (typed, requires less syntax)
B) YAML (flexible, popular)
C) JSON (strict, programmatic)

**Recommendation**: **A - TOML**

**Rationale**:
- Non-technical users can edit
- Less error-prone than YAML indentation
- Type hints help prevent mistakes
- Comments are easy and clear

---

### Decision 3: Plugin System - Hooks vs Middleware

**Options**:
A) Hooks (discrete points: beforeCreate, afterCreate)
B) Middleware (pipeline: request → middleware chain → response)

**Recommendation**: **A - Hooks** (with middleware for future)

**Rationale**:
- Simpler mental model
- Named hooks are self-documenting
- Easier to debug
- Middleware pattern can layer on top later

---

## Action Items

- [ ] Review this worksheet with team
- [ ] Prioritize which packages to extract first
- [ ] Create npm package scaffolding templates
- [ ] Set up monorepo structure
- [ ] Document API contracts for core packages
- [ ] Create TOML config schema with validation
- [ ] Set up shared testing utilities
- [ ] Create examples for 3 business types

