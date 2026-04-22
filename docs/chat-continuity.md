# Chat Continuity Log

## Purpose
Track discussion topics, decisions, open questions, and next actions across sessions.

## How It Updates
- Updated by `npm run continuity:update`.
- Auto-runs before `dev`, `build`, `deploy`, and `deploy:dry`.

## Project Ecosystem Context (CRITICAL)

### Strategic Vision
**Baalam_Nah_Retreat** is a test case and pilot business integration for the larger **fcpqroo ecosystem**:

1. **fcpqroo.mx** - Community business directory & promotion platform
   - Business listings and discovery
   - Cross-business marketing alignment
   - Review and promotion system

2. **fedi.xyz Mobile App** - Federated community currency platform
   - Uses fediments (federated local currencies)
   - Ecash token integration

3. **Community FCP1320** - Local fediment with guardian governance
   - Issues ecash tokens (currently single guardian)
   - Acts as community loyalty currency
   - Validates transactions between businesses

4. **Baalam_Nah_Retreat Integration Role**
   - Pilot site for booking + token rewards system
   - Tests integration with fedi.xyz for customer/volunteer rewards
   - Models business directory entry with promotions/reviews

### Key Features to Implement
- [ ] Booking system with date/time selection
- [ ] Integration with fedi.xyz for token rewards
- [ ] Review submission and promotion participation
- [ ] Business profile (part of fcpqroo.mx network)
- [ ] Volunteer reward tracking

## Session: 2026-04-20

### Topics Discussed
- Continuity log initialized.
- Basic build/deployment infrastructure established.

### Decisions
- Use this file as the canonical cross-session summary.

### Open Questions
- None at that time.

### Next Actions
- Add notes for each meaningful session.

## Session: 2026-04-22

### Topics Discussed
- Full ecosystem context provided
- Strategic role of Baalam_Nah_Retreat clarified
- Integration requirements with fcpqroo.mx and fedi.xyz identified

### Decisions
- Continuity log updated with ecosystem context
- Documented integration requirements and dependencies

### Open Questions
- What specific token reward mechanisms should be implemented?
- How should booking data sync with fcpqroo.mx directory?
- What review/promotion features are highest priority?
- Guardian governance model - how will decisions be made?

### Next Actions
- Map detailed integration requirements with fcpqroo.mx
- Design token reward flow for bookings
- Define booking data schema
- Plan fedi.xyz API integration
