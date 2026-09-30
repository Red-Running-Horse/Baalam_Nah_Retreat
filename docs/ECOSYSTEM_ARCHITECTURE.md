# FCPQROO Ecosystem Architecture

## Overview
Balam_Nah_Retreat is a pilot business integration within the larger fcpqroo community ecosystem. This document outlines the architecture, integration points, and data flows.

## System Components

### 1. fcpqroo.mx (Main Platform)
**Purpose**: Community business directory, discovery, and aligned marketing
**Features**:
- Business listings and profiles
- Cross-business promotion coordination
- Unified review system
- Tourism/local access

**Integration Point with Balam_Nah_Retreat**:
- Pull business profile from fcpqroo.mx
- Submit bookings/events data back to directory
- Participate in coordinated promotions

### 2. fedi.xyz Mobile App
**Purpose**: Federated community currency management
**Technology**: Mobile app using fediments (federated local currencies)
**Features**:
- Ecash wallet management
- Transaction history
- Reward claiming
- Token transfers between users

**Integration Point with Balam_Nah_Retreat**:
- User authentication/wallet integration
- Reward issuance after bookings
- Volunteer reward distribution
- Token balance display

### 3. Community FCP1320 (Fediment)
**Purpose**: Local loyalty currency for Quintana Roo business ecosystem
**Governance**:
- Single guardian (currently) managing token issuance
- Future: Multi-sig governance model
- Controls inflation, validates transactions

**Token Specifications**:
- Name: FCP1320 Ecash
- Purpose: Business ecosystem rewards, loyalty, volunteer compensation
- Integration: Issued via fedi.xyz, tracked in blockchain

### 4. Balam_Nah_Retreat (This Application)
**Purpose**: Retreat booking platform + pilot for ecosystem integration
**Type**: React/Vite SPA deployed to Hostinger

## Integration Architecture

### Data Flow Diagram
```
┌─────────────────────────────────────────────────────────────────┐
│                      fcpqroo.mx (Directory)                     │
│  [Business Profiles] [Promotions] [Reviews] [Recommendations]   │
└──────────┬──────────────────────────────────────────────────────┘
           │ 1. Profile sync, 2. Submit bookings/reviews
           │
┌──────────▼──────────────────────────────────────────────────────┐
│           Balam_Nah_Retreat (Booking Platform)                 │
│  [Bookings] [Reviews] [Promotions] [Calendar] [Payments]        │
└──────────┬──────────────────────────────────────────────────────┘
           │ 3. Trigger reward issuance, user auth
           │
┌──────────▼──────────────────────────────────────────────────────┐
│            fedi.xyz API / Mobile Integration                    │
│  [Wallet Auth] [Token Issuance] [Reward Distribution]           │
└──────────┬──────────────────────────────────────────────────────┘
           │ 4. Issues tokens
           │
┌──────────▼──────────────────────────────────────────────────────┐
│      Community FCP1320 Fediment (Token Contract)                │
│  [Token Balance] [Transaction History] [Guardian Control]       │
└─────────────────────────────────────────────────────────────────┘
```

## Implementation Requirements

### Phase 1: Core Booking System
- [ ] Booking calendar interface
- [ ] Date/time selection
- [ ] Booking confirmation
- [ ] Booking data storage (PocketBase)

### Phase 2: Token Integration
- [ ] fedi.xyz API integration
- [ ] User wallet linking
- [ ] Reward calculation logic
- [ ] Token issuance on booking completion

### Phase 3: Reviews & Promotions
- [ ] Review submission form
- [ ] Review moderation workflow
- [ ] Promotion participation
- [ ] Rating display

### Phase 4: Directory Integration
- [ ] fcpqroo.mx profile sync
- [ ] Cross-business recommendation engine
- [ ] Coordinated promotion display

### Phase 5: Volunteer/Guardian Features
- [ ] Volunteer time tracking
- [ ] Reward distribution interface
- [ ] Guardian dashboard (for FCP1320 management)

## Technical Integration Points

### API Endpoints Needed

#### To fedi.xyz
- `GET /api/auth/verify-wallet` - Verify user's wallet
- `POST /api/rewards/issue` - Issue tokens to wallet
- `GET /api/user/balance` - Get user's token balance
- `POST /api/transactions/log` - Log transaction

#### To fcpqroo.mx
- `GET /api/business/{id}` - Get business profile
- `POST /api/business/{id}/bookings` - Submit booking data
- `POST /api/business/{id}/reviews` - Submit review
- `GET /api/promotions` - Get active promotions

#### Internal (PocketBase)
- `bookings` - Booking records
- `users` - User profiles
- `reviews` - Review submissions
- `token_transactions` - Reward history
- `volunteers` - Volunteer participation

### Authentication Flow
```
User (Mobile fedi.xyz) → Wallet Connect → Balam_Nah_Retreat
                                         ↓
                              Verify with fedi.xyz
                                         ↓
                              Link booking to wallet
                                         ↓
                              Issue reward token to wallet
```

## Data Schema

### Booking Record
```javascript
{
  id: "booking_001",
  user_wallet: "ecash_wallet_address",
  booking_date: "2026-05-15",
  attendees: 12,
  status: "confirmed", // pending, confirmed, completed, cancelled
  token_reward: 50, // FCP1320 tokens earned
  reward_issued: true,
  created_at: "2026-04-22T13:35:58Z",
  reviewed: false
}
```

### Review Record
```javascript
{
  id: "review_001",
  booking_id: "booking_001",
  user_wallet: "ecash_wallet_address",
  rating: 5,
  comment: "Amazing retreat experience!",
  reward_earned: 5, // Bonus tokens for review
  created_at: "2026-04-25T10:00:00Z"
}
```

### Volunteer Record
```javascript
{
  id: "volunteer_001",
  user_wallet: "ecash_wallet_address",
  role: "guide|photographer|coordinator",
  event_date: "2026-05-15",
  hours: 4,
  token_reward: 80, // FCP1320 tokens earned
  verified_by: "guardian_wallet",
  status: "pending_verification|verified|paid",
  created_at: "2026-04-22T13:35:58Z"
}
```

## Guardian Governance (FCP1320)

### Current Model (Single Guardian)
- Guardian: Red-Running-Horse community representative
- Powers: Token issuance approval, reward validation
- Process:
  1. Booking completed → Token reward request
  2. Guardian verifies booking data
  3. Guardian approves token issuance
  4. Tokens transferred to user wallet

### Future Model (Multi-Sig Governance)
- Multiple guardians from community businesses
- Consensus required for large token issuances
- Community review of reward policies

## Success Metrics
- [ ] Booking conversion rate
- [ ] Average token rewards per booking
- [ ] User retention (repeat bookings)
- [ ] Review participation rate
- [ ] Cross-business promotion effectiveness
- [ ] Token velocity (how often FCP1320 changes hands)

## Dependencies & Roadmap

### External Dependencies
- **fedi.xyz API** - Wallet integration, token issuance
- **fcpqroo.mx API** - Business directory, promotion data
- **PocketBase** - Local data persistence
- **FCP1320 Fediment** - Token contract (already deployed)

### Development Roadmap
1. **Week 1**: Booking system core + PocketBase schema
2. **Week 2**: fedi.xyz authentication & token integration
3. **Week 3**: Review system + basic promotions
4. **Week 4**: fcpqroo.mx sync + cross-business features
5. **Week 5**: Guardian dashboard + volunteer tracking

## Risk Mitigations
- **Token security**: Use fedi.xyz's existing security model, no private keys in app
- **Booking data**: Backup to fcpqroo.mx, verify integrity
- **Scalability**: Design for horizontal scaling, use PocketBase clustering
- **Community trust**: Transparent logging of all token issuances, public ledger

