# Component Reusability Strategy for fcpqroo Ecosystem

## Executive Summary
Baalam_Nah_Retreat is the **first implementation** of an integrated booking + token rewards system for fcpqroo. To maximize value across all future business sites, we must architect components as:
- **Generic + Configurable** (not hardcoded to retreat specifics)
- **Modular + Composable** (mix-and-match features)
- **Shareable + Maintainable** (npm packages or monorepo)
- **Multi-tenant ready** (support different business types)

## Business Scenarios in fcpqroo Ecosystem

Different businesses will have different needs:

### Scenario A: Baalam_Nah_Retreat (Current)
- **Type**: Group retreat/experience
- **Booking Model**: Date-based, group capacity
- **Key Features**: Calendar, group size, guide assignment
- **Token Rewards**: Fixed per booking + review bonus

### Scenario B: Restaurant/Cafe
- **Type**: Daily service business
- **Booking Model**: Time slot reservation (tables)
- **Key Features**: Table management, party size, special requests
- **Token Rewards**: Per transaction + loyalty tiers

### Scenario C: Accommodation (Hotel/Airbnb)
- **Type**: Multi-day bookings
- **Booking Model**: Check-in/check-out dates, room types
- **Key Features**: Room inventory, rate variations, housekeeping tracking
- **Token Rewards**: Per night + length-of-stay bonuses

### Scenario D: Tour Operator
- **Type**: Multi-activity, multi-day experiences
- **Booking Model**: Package selection, date ranges
- **Key Features**: Activity bundling, guide scheduling, transport coordination
- **Token Rewards**: Per package + volunteer hour tracking

### Scenario E: Service Provider (Spa/Hair)
- **Type**: Appointment-based
- **Booking Model**: Time slots, service types
- **Key Features**: Staff scheduling, service menu, duration variants
- **Token Rewards**: Per service + referral bonuses

## Component Architecture Strategy

### Layer 1: Core Infrastructure (Shared Across All)
```
┌─────────────────────────────────────────────────────┐
│         Shared Core Libraries (npm packages)        │
│  • Wallet Auth (fedi.xyz integration)               │
│  • Token Reward Engine                              │
│  • PocketBase Schema Generator                      │
│  • Guardian Governance Interface                    │
│  • Error Handling & Logging                         │
│  • UI Component Kit (Radix UI + Tailwind)          │
└─────────────────────────────────────────────────────┘
```

### Layer 2: Domain Services (Configurable)
```
┌────────────────────────────────────────────────────────┐
│         Domain Service Implementations                 │
│  (Each business extends and configures)                │
├────────────────────────────────────────────────────────┤
│  Booking Service    │  Review Service │  Reward Service│
│  (Abstract)         │  (Abstract)     │  (Abstract)    │
│  • Time slots       │  • Rating algo  │  • Calc logic  │
│  • Capacity mgmt    │  • Moderation   │  • Rate tables │
│  • Availability     │  • Promotions   │  • Distribution│
└────────────────────────────────────────────────────────┘
```

### Layer 3: Business-Specific (Customizable)
```
┌────────────────────────────────────────────────────────┐
│    Business-Specific Implementation                    │
│  (e.g., Baalam_Nah_Retreat, Restaurant, etc.)         │
│                                                        │
│  • Config (capacity, rewards, hours)                   │
│  • Custom UI (branding, theme)                         │
│  • Business Logic Extensions                           │
│  • Local Features                                      │
└────────────────────────────────────────────────────────┘
```

## Design Patterns for Reusability

### Pattern 1: Configuration Over Customization

**Goal**: Most differences should be config, not code.

**Example - Booking Service**:
```javascript
// Generic booking service
class BookingService {
  constructor(config) {
    this.capacity = config.maxCapacity;
    this.slotDuration = config.slotDurationMinutes;
    this.availability = config.availabilityHours;
    this.rewardPerBooking = config.tokenRewardBase;
  }
  
  async createBooking(userId, slotId, partySize) {
    // Generic logic, uses config values
  }
}

// Baalam_Nah_Retreat config
const balaamsConfig = {
  maxCapacity: 50,
  slotDurationMinutes: 240, // 4-hour retreats
  availabilityHours: { start: 9, end: 17 },
  tokenRewardBase: 50,
  rewardMultipliers: {
    groupDiscount: 0.9, // Larger groups get slight discount per person
    earlyBird: 1.2,
    lastMinute: 0.8
  }
};

// Restaurant config
const restaurantConfig = {
  maxCapacity: 100, // Total seats
  slotDurationMinutes: 90, // Typical meal duration
  availabilityHours: { lunch: [12, 14], dinner: [18, 22] },
  tokenRewardBase: 10,
  rewardMultipliers: {
    groupDiscount: 1.0,
    happyHour: 1.5,
    loyaltyTier: [1.0, 1.2, 1.5] // Based on customer tier
  }
};
```

### Pattern 2: Interface Contracts

**Goal**: Define what each service must implement, not how.

```javascript
// Abstract Booking Interface (contract)
class IBookingService {
  async getAvailability(startDate, endDate) { /* required */ }
  async createBooking(userId, slotId, details) { /* required */ }
  async cancelBooking(bookingId, reason) { /* required */ }
  async getBooking(bookingId) { /* required */ }
  async listUserBookings(userId) { /* required */ }
}

// Abstract Reward Interface (contract)
class IRewardService {
  async calculateReward(bookingId, context) { /* required */ }
  async issueReward(userId, amount, reason) { /* required */ }
  async getRewardHistory(userId) { /* required */ }
  async logTransaction(transaction) { /* required */ }
}

// Business implements these contracts
class BalaamsBookingService extends IBookingService {
  // Specific implementation for retreat bookings
}

class RestaurantBookingService extends IBookingService {
  // Specific implementation for restaurant reservations
}
```

### Pattern 3: Plugin Architecture

**Goal**: Allow businesses to extend core functionality without modifying core.

```javascript
// Core booking system with plugin hooks
class BookingService {
  constructor(config, plugins = {}) {
    this.config = config;
    this.beforeCreate = plugins.beforeCreate || [];
    this.afterCreate = plugins.afterCreate || [];
    this.validateSlot = plugins.validateSlot || this.defaultValidateSlot;
  }

  async createBooking(userId, slotId, details) {
    // Run before hooks
    for (let hook of this.beforeCreate) {
      await hook(userId, slotId, details);
    }

    // Validate using custom validator or default
    await this.validateSlot(slotId, details);

    // Create booking
    const booking = await this.db.create('bookings', {
      userId, slotId, details, status: 'confirmed'
    });

    // Run after hooks (e.g., send email, update inventory)
    for (let hook of this.afterCreate) {
      await hook(booking);
    }

    return booking;
  }
}

// Baalam plugins
const balaamsPlugins = {
  beforeCreate: [
    async (userId, slotId, details) => {
      // Verify guide availability for that date
      const guide = await GuideService.getAssignedGuide(slotId);
      if (!guide) throw new Error('No guide available');
    }
  ],
  afterCreate: [
    async (booking) => {
      // Send retreat details to user
      await EmailService.sendReteatConfirmation(booking.userId, booking);
      // Update social media availability calendar
      await CalendarSync.updateExternalCals(booking.slotId);
    }
  ]
};
```

### Pattern 4: Service Composition

**Goal**: Combine services cleanly, avoid tight coupling.

```javascript
// Each service is independent but can be composed
class BookingOrchestrator {
  constructor(bookingService, rewardService, notificationService, analyticsService) {
    this.booking = bookingService;
    this.reward = rewardService;
    this.notify = notificationService;
    this.analytics = analyticsService;
  }

  async completeBooking(userId, slotId, details) {
    // Orchestrate workflow without tight coupling
    const booking = await this.booking.createBooking(userId, slotId, details);
    const reward = await this.reward.calculateReward(booking.id, { 
      bookingType: details.type,
      partySize: details.partySize 
    });
    await this.reward.issueReward(userId, reward.amount, booking.id);
    await this.notify.sendBookingConfirmation(userId, booking, reward);
    await this.analytics.logBookingEvent(booking, reward);
    
    return { booking, reward };
  }
}
```

## Shared Component Library Structure

### Proposed npm Package Organization

```
@fcpqroo/core
  ├── @fcpqroo/core-wallet        # fedi.xyz integration
  ├── @fcpqroo/core-rewards       # Token reward engine
  ├── @fcpqroo/core-storage       # PocketBase abstraction
  ├── @fcpqroo/core-governance    # Guardian management
  └── @fcpqroo/core-utils         # Shared utilities

@fcpqroo/services
  ├── @fcpqroo/service-booking    # Abstract booking service
  ├── @fcpqroo/service-reviews    # Abstract review service
  ├── @fcpqroo/service-promotions # Promotion coordination
  └── @fcpqroo/service-analytics  # Cross-business analytics

@fcpqroo/ui
  ├── @fcpqroo/ui-booking         # Calendar, slot selector, form
  ├── @fcpqroo/ui-reviews         # Review display, ratings, forms
  ├── @fcpqroo/ui-rewards         # Token display, claim interface
  ├── @fcpqroo/ui-guardian        # Governance dashboard
  └── @fcpqroo/ui-theme           # Tailwind config, Radix setup

Business Sites
  ├── Baalam_Nah_Retreat (current)
  ├── fcpqroo-restaurant (next?)
  ├── fcpqroo-accommodation (next?)
  └── fcpqroo-services (next?)
```

## Data Model Strategy

### Universal Schema (All Businesses)

**Core Tables** (in @fcpqroo/core-storage):
```
- users (wallet, profile, tier)
- bookings (universal fields: id, userId, date, tokens)
- reviews (universal: id, bookingId, rating, comment, tokens)
- token_transactions (universal: from, to, amount, reason)
- volunteers (universal: userId, hours, verified, tokensEarned)
```

### Business-Specific Schema Extensions

```javascript
// Baalam_Nah_Retreat extends base schema
const balaamsSchema = {
  ...baseBookingSchema,
  guide_assigned: string,
  group_composition: json, // ages, dietary needs, etc.
  retreat_type: enum, // "cultural", "wellness", "adventure"
  custom_field: "any field specific to your business"
};

// Restaurant extends base schema
const restaurantSchema = {
  ...baseBookingSchema,
  table_number: integer,
  party_size: integer,
  special_requests: string,
  dietary_restrictions: json
};
```

**Strategy**: 
- Core fields are strict (enforced)
- Business fields are flexible (add to `metadata` JSONB column)
- Migrations are non-breaking (new businesses don't affect existing ones)

## Workflow Design for Reusability

### Generic Booking Workflow (Template)

All businesses follow this pattern, but with configurable steps:

```
1. CHECK AVAILABILITY
   ├─ Generic: Query availability
   └─ Config: Slot duration, capacity, hours

2. VALIDATE DETAILS
   ├─ Generic: Check required fields
   └─ Plugin: Business-specific rules (e.g., party size, dietary info)

3. CREATE BOOKING
   ├─ Generic: Insert to DB
   └─ Plugin: Assign guide, update inventory, etc.

4. CALCULATE REWARDS
   ├─ Generic: Apply reward formula
   └─ Config: Multipliers, bonuses, tiers

5. ISSUE TOKENS
   ├─ Generic: Call fedi.xyz API
   └─ Plugin: Get guardian approval if needed

6. NOTIFY USER
   ├─ Generic: Send confirmation
   └─ Plugin: Custom email template, SMS, etc.

7. LOG ANALYTICS
   ├─ Generic: Record booking event
   └─ Config: What metrics to track
```

## Configuration File Format

### Single Config File Per Business (TOML/YAML)

```toml
# baalam.config.toml
[business]
name = "Baalam Nah Retreat"
id = "baalam_nah_retreat"
description = "Day retreat at Lagunas de Ocom"
timezone = "America/Mexico_City"

[booking]
type = "group_experience"
slot_duration_minutes = 240
max_capacity = 50
advance_booking_days = 30
cancellation_window_hours = 24

[availability]
monday = "09:00-17:00"
tuesday = "09:00-17:00"
wednesday = "09:00-17:00"
thursday = "09:00-17:00"
friday = "09:00-17:00"
saturday = "10:00-17:00"
sunday = "closed"

[rewards]
base_token_per_booking = 50
review_bonus = 5
early_bird_multiplier = 1.2
group_discount_multiplier = 0.95
referral_bonus = 10

[team]
guide_roles = ["guide", "photographer"]
guides_required_per_booking = 1

[integrations]
fcpqroo_enabled = true
fedi_enabled = true
guardian_approval_required = true
email_provider = "sendgrid"
```

## Reusability Checklist

When developing Baalam components, ask:

- [ ] **Is this hardcoded?** → Make it configurable
- [ ] **Is this business-specific?** → Move to plugin/extension point
- [ ] **Is this generic?** → Extract to shared service
- [ ] **Can other businesses use this?** → Yes? → npm package candidate
- [ ] **Is the API clear?** → Can someone new understand how to use it?
- [ ] **Can it be tested independently?** → Yes? → Better isolation
- [ ] **Is it documented?** → Include usage examples for other businesses
- [ ] **Could it be configured differently?** → Config file strategy ready?

## Implementation Roadmap (Reusability-First)

### Phase 1A: Extract Core Abstractions (BEFORE building Baalam-specific)
- [ ] Define IBookingService interface
- [ ] Define IRewardService interface
- [ ] Define IReviewService interface
- [ ] Create @fcpqroo/core-wallet (reusable fedi.xyz wrapper)
- [ ] Create @fcpqroo/core-rewards (generic token logic)

### Phase 1B: Build Baalam with Reusability in Mind
- [ ] Implement BalaamsBookingService (extends IBookingService)
- [ ] Use config file for all business logic
- [ ] Create plugin hooks for guides, photos, etc.
- [ ] Document config options and plugins

### Phase 1C: Extract Components for Reuse
- [ ] Refactor booking UI into @fcpqroo/ui-booking
- [ ] Create reusable reward display component
- [ ] Create generic calendar component

### Phase 2: Create Template for Next Business
- [ ] Document boilerplate setup
- [ ] Create generator/scaffolding tool
- [ ] Provide example configs for restaurant scenario

### Phase 3: Migrate Other Businesses
- [ ] Bring in restaurant (iterate on abstractions)
- [ ] Bring in accommodation (refine schema patterns)
- [ ] Gather feedback, improve core packages

## Success Metrics for Reusability

- **Code Reuse Rate**: % of code shared across business sites (target: 70-80%)
- **Time to Market**: Days to launch new business site (target: 5-10 days)
- **Config-to-Code Ratio**: Business logic in config vs code (target: 80% config)
- **Package Dependencies**: Clear upstream/downstream (target: no circular deps)
- **Test Coverage**: Shared code coverage > 90%, business code > 70%
- **Documentation**: Every npm package has usage examples

## Risk Mitigation

### Risk: "Premature Abstraction"
**Mitigation**: Build Baalam fully first, then extract reusable patterns. Don't over-engineer.

### Risk: "Shared Code Becomes Monolith"
**Mitigation**: Keep npm packages small and focused. One concern per package.

### Risk: "Businesses Can't Differentiate"
**Mitigation**: Plugins + config allows customization without forking code.

### Risk: "Multiple Versions Diverge"
**Mitigation**: Semantic versioning, deprecation warnings, migration guides.

## Next Steps

1. **Map Baalam Specifics**: Identify what's retreat-specific vs generic
2. **Define Interfaces**: Create service contracts before building
3. **Build Config File**: Define business logic in config first, code second
4. **Create npm Package Scaffolding**: Template for next business site
5. **Document Examples**: Show how each service is extended for different businesses

