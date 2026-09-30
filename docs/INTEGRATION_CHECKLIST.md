# Integration Checklist: Building for the Ecosystem

Use this checklist during Balam_Nah_Retreat development to ensure components are reusable.

## Phase 1: Core Infrastructure

### Wallet Integration
- [ ] Create `@fcpqroo/core-wallet` npm package
- [ ] Document fedi.xyz API contract
- [ ] Implement mock wallet for offline development
- [ ] Write integration tests with real fedi.xyz (staging)
- [ ] Document error handling (insufficient balance, rate limits, etc.)
- [ ] Create example: "How to use core-wallet in a business site"

### Reward Engine
- [ ] Create `@fcpqroo/core-rewards` npm package
- [ ] Extract reward calculation logic (no business-specific code)
- [ ] Document reward formula and parameters
- [ ] Implement reward history tracking
- [ ] Create validation rules for reward amounts
- [ ] Write tests for: basic rewards, multipliers, cap limits
- [ ] Create config schema validation

### Storage Layer
- [ ] Create `@fcpqroo/core-storage` npm package
- [ ] Abstract PocketBase operations
- [ ] Document schema versioning strategy
- [ ] Implement migration utilities
- [ ] Create backup/restore utilities
- [ ] Document field naming conventions

## Phase 2: Service Abstractions

### Booking Service
- [ ] Define `IBookingService` interface
- [ ] Extract availability logic (no hardcoding)
- [ ] Implement plugin hooks system
- [ ] Create `BalaamsBookingService` extending interface
- [ ] Document configuration options
- [ ] Write tests for: create, cancel, reschedule
- [ ] Create restaurant booking example

### Review Service
- [ ] Define `IReviewService` interface
- [ ] Implement moderation workflow
- [ ] Create rating algorithm (reusable)
- [ ] Document review metadata
- [ ] Create business example configs

### Reward Calculation
- [ ] Implement context-aware reward calculation
- [ ] Support multipliers (early bird, loyalty, referral)
- [ ] Support tiered rewards
- [ ] Document all reward types

## Phase 3: UI Components

### Calendar Component
- [ ] Extract `<BookingCalendar />` to `@fcpqroo/ui-booking`
- [ ] Support different slot types (hours, days, custom)
- [ ] Make theming configurable (colors, fonts)
- [ ] Document all props
- [ ] Create Storybook stories
- [ ] Test accessibility (WCAG)

### Booking Form
- [ ] Extract `<BookingForm />` component
- [ ] Support dynamic fields based on config
- [ ] Implement validation framework
- [ ] Add error messages internationalization
- [ ] Create form builder for business-specific fields

### Review Component
- [ ] Extract `<ReviewForm />` and `<ReviewDisplay />`
- [ ] Support configurable rating scales
- [ ] Add photo upload support
- [ ] Make form fields configurable

### Reward Display
- [ ] Extract `<TokenReward />` component
- [ ] Show pending vs claimed tokens
- [ ] Add transfer UI
- [ ] Make token display customizable

## Phase 4: Business-Specific Implementation

### Balam Configuration
- [ ] Create `balam.config.toml`
- [ ] Extract all hardcoded values to config
- [ ] Document every config option
- [ ] Create config validation schema
- [ ] Store config in version control

### Booking Logic
- [ ] Implement guide assignment (plugin)
- [ ] Implement group size validation
- [ ] Implement weather considerations
- [ ] Create pre-booking checklist

### Rewards
- [ ] Configure base rewards (50 tokens)
- [ ] Configure review bonus (5 tokens)
- [ ] Implement group discount logic
- [ ] Implement volunteer hour tracking

### Email Notifications
- [ ] Create email templates
- [ ] Make templates configurable
- [ ] Support multiple languages

## Phase 5: Ecosystem Integration

### fcpqroo.mx Sync
- [ ] Document fcpqroo.mx API contract
- [ ] Implement profile sync
- [ ] Implement booking submission
- [ ] Implement review submission
- [ ] Create retry logic for failed syncs

### Guardian Governance
- [ ] Implement guardian approval workflow
- [ ] Create guardian dashboard
- [ ] Implement multi-sig signing (future)
- [ ] Log all approvals for audit

### Cross-Business Features
- [ ] Implement referral system
- [ ] Implement cross-promotion display
- [ ] Implement unified leaderboards
- [ ] Create business discovery

## Phase 6: Testing & Documentation

### Unit Tests
- [ ] Core packages: 100% coverage
- [ ] Service packages: 80% coverage
- [ ] UI components: 70% coverage
- [ ] Business code: 70% coverage

### Integration Tests
- [ ] Test full booking workflow
- [ ] Test reward issuance flow
- [ ] Test guardian approval flow
- [ ] Test fcpqroo.mx sync

### Documentation
- [ ] README for each package
- [ ] API documentation
- [ ] Configuration guide
- [ ] Examples for 3 business types
- [ ] Troubleshooting guide
- [ ] Architecture diagrams

## Phase 7: Preparation for Next Business

### Template Creation
- [ ] Create project generator/scaffolding tool
- [ ] Create starter configs for restaurant, hotel, services
- [ ] Create migration guide from Balam config
- [ ] Create troubleshooting guide

### Knowledge Base
- [ ] Document design decisions (ADR format)
- [ ] Create FAQ
- [ ] Record video walkthrough
- [ ] Create onboarding guide

## Ongoing: Code Review Checklist

For every PR/commit in Balam, check:

```
Reusability Review
├─ [ ] No hardcoded business names/values
├─ [ ] Config file used instead of code for business rules
├─ [ ] Error messages are generic (not Balam-specific)
├─ [ ] Component exports are well-scoped
├─ [ ] Component has clear interface/contract
├─ [ ] Tests cover generic use cases (not just Balam)
├─ [ ] Documentation includes other business examples
├─ [ ] No tight coupling to Balam-specific services
├─ [ ] Plugin hooks exist instead of inline customization
└─ [ ] Code is agnostic to business type

Component Quality Checklist
├─ [ ] README with usage example
├─ [ ] TypeScript types (if applicable)
├─ [ ] JSDoc comments for exports
├─ [ ] Unit tests with 80%+ coverage
├─ [ ] Storybook story (if UI component)
├─ [ ] Accessibility tested (if UI component)
└─ [ ] No console.logs left in production code
```

## Success Criteria

### Week 4 (End of Balam MVP)
- [ ] 70% of code is reusable/generic
- [ ] 3 core packages ready for extraction
- [ ] Configuration file replaces 80% of business logic
- [ ] Documentation covers 3 business scenarios

### Week 6 (After First Extraction)
- [ ] Next business site can launch in <1 week
- [ ] 20% of Balam code is reused in new site
- [ ] Configuration-driven approach validated

### Week 12 (Scaling Phase)
- [ ] 3+ business sites operational
- [ ] 60%+ code shared across sites
- [ ] Clear pattern for adding new businesses
- [ ] Community contributing improvements

