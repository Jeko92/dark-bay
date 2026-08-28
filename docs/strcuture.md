# Documentation

## Objective
* [ ] users post auctions
* [ ] bid on them with offers
* [ ] traverse auctions
* [ ] Provide validated, pagination, filtered, sorted, documented API

## User stories
* [ ] where a bid is only accepted if it beats the current highest price
* [ ] Authentication acts as the final layer
* [ ] Sellers need a way to create an auction
* [ ] list all available auctions
* [ ] fetch specific listings
* [ ] Users submit offers
* [ ] The system evaluates offers against strict rules.

## Architecture
* [ ] Create mermaid diagrams with entity relations
* [ ] How do you handle clients requesting a specific page size or filtering auctions by their current status (open vs. closed)? Make sure to include metadata
  * (total items, total pages) in your paginated responses.
* Define schemas for Entities
* [x] Auctions fields (title, description), pricing (starting price, current price), lifecycle (end date)
* [x] Offer fields (amount, seller, bidder)
* [x] User fields (username, password)

## Security
* [ ] Protect routes
* [ ] Control what clients sees (Proper responseDTO's)
* [ ] Authentication mit JWT+Salting
* [ ] Implement a JWT-based login flow.
* [ ] Never save passwords as plaintext only hashed passwords
* [ ] Global Guard
* [ ] Implement RBAC(Role Based Access Control) 
(Replace the plaintext seller and bidder strings with a secure identity system). 

# Bootstrap
* [ ] Initialize a new NestJS project 
* [ ] Structure your dependencies
* [ ] Wire up the database using TypeORM

# Auction
* [x] Scaffold module
* [x] Model the `Auction` entity
* [x] Create DTOs
* [x] Swagger Decorators for Entities
* [x] Controller (call service)  and Business logic (service)
  * [x] Create
  * [x] Read
* [x] Swagger Decorators for Controllers
* [x] Establish its relationship with the `Offer`.
* [ ] Which HTTP status code best communicates a conflict with the current state of the resource?
* [x] Define specific Response Models (DTOs)
* [ ] sorting the auctions by end date, with the most recent first
* [ ] lock down your API so that creating auctions or placing bids requires authentication, while browsing the auction list remains completely public?
* [ ] Strip the `seller` and `bidder` fields from your incoming DTOs and pull the identity directly from the verified token.
* [ ] (Bonus): Expose a computed status field (`open` or `closed`) on the auction response based on the current timestamp, saving the client from doing date math.

# Offer
* [x] Scaffold module
* [x] Model the `Offer` entity 
* [x] Create DTOs
* [x] Swagger Decorators for Entities 
* [ ] Business logic (service)
* [ ] Controller (call service) 
* [ ] Swagger Decorators for Controllers
* [ ] Establish its relationship with the `Auction`
* [ ] Which HTTP status code best communicates a conflict with the current state of the resource?
* [ ] Define specific Response Models (DTOs)
* [ ] Implement the bidding service
* [ ] validate the state of the auction, Before saving an offer, your application must.
* [ ] prevent a seller from placing a bid on their own listing
* [ ] Strip the `seller` and `bidder` fields from your incoming DTOs and pull the identity directly from the verified token.

# User
* [x] Scaffold module
* [x] Model the `User` Entity
* [x] Create DTOs
* [x] Swagger Decorators for Entities
* [x] Business logic (service)
* [x] Controller (call service) 
* [x] Swagger Decorators for Controllers
* [x] Which HTTP status code best communicates a conflict with the current state of the resource?
* [x] Define specific Response Models (DTOs)
* [ ] (Bonus): Divide users and introduce `admin` role. Implement a guard that allows admins to delete
* [ ] any auction, whereas standard users can only delete their own listings.

# Global/Common
* [ ] Enforce global validation.
* [ ] - Implement pagination and the following filtering options for your auction list:
    - `?status=open|closed`
    - `?min-price` & `?max-price`
* [ ] Mount Swagger and configure it to recognize your DTOs.
* [ ] configure the documentation to handle authenticated routes (Ensure the UI provides an Authorize
  dialog so users can paste their JWT and test protected endpoints)

# Auth module
* [ ] Create DTOs
* [ ] Business logic (service)
* [ ] Controller (call service
* [ ] Implement local strategy
* [ ] implement jwt-strategy

#  Bonus Challenges
* [ ] Setup db migrations(Turn off automatic synchronization).
* [ ] Watchlist-Implement a user's ability to add and remove an auction to their own watchlist and retrieve it
* [ ] (Rate Limiting)-Track offer submissions. Reject sudden bursts of bids from the same user within a short
  time window using a `429 Too Many Requests` status.


# Business logic

* [ ] If a client omits an end date during creation, how do you enforce a default duration of three days within your service logic?
* [ ] How do you link multiple bids to a single listing to track the complete bid history?
* [ ] Edge cases to handle:
  * [ ] What happens if the auction is already closed?
  * [ ] What if the bid fails to exceed the current price (or the starting price, if it is the very first bid)?
* [ ] Rejecting a bid because the amount is too low is a business rule violation, not a malformed request syntax
