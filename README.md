# Base10 Project

## Setup

This should be easy to kickstart on your local machine.

- Install yarn and Go
- Run `yarn install` in the base directory of this project.
- Run `yarn start`, which should kick off the app and api in parallel with eachother
- If it throws and error, Go typically tells you what specific commands you need to run

## Overview

I was not able to perform up to my full quality bar with this project.

I was caught off guard by a family emergency and a funeral, without my laptop, several hours from home.

So all the coding for this project had to be done on 2023-08-22, starting around 9AM when I finally got home.

### Time Overview

9-10:00AM, tried to retrofit my previous startup's fullstack Typescript codebase (NextJS and NestJS in an NX monnorepo). This would work great for a new company, but I had so many extra features (multiplayer features, live syncing, component libraries, auth, logging,etc), that I would've spent most of my day breaking down that code before I could start to build.

10AM-12PM, figured out how to get Golang working inside of NX. Chose Gin as a framework. Got basic endpoints running. Got Postgres installed and did a tutorial on that. Postgres hooked up to the REST API. Companies table added to db and converted to types.

12:30-2:00PM, full REST routes for Companies working in Postman. Have to break for contract work.

3:30-5PM, replicate work for Companies to Records.

6-9PM, build out NextJS frontend. Hook up frontend to backend.

9:45-10PM, document code and README. Get this to Github. I cannot work on this any longer today. I will finish documentation tomorrow in my design doc, and record a Loom before sending off to Lea.

Total time spent:
8.25 hours on the code seen.
9.25 hours today (including the wasted hour to start the day)

### Leftover tasks and ideas

These are items I really wanted to get to, but were unreasonable for my allotted time. I might go back and add them as a point of pride later, and to see how they'd work in Go.

- Options for financial record date ranges
- Tables for records and companies
- Update / Delete for records and companies
- Get this code deployed instead of just a Loom
- Grouping routes with working CORS (super annoying bug!)
- Get Create handlers looking more like Update handlers. I like the feel of it more
- Backend validation of types and values. Right now things just throw HTTP errors if Go doesn't get the expect types
- If I had tables, I wanted live syncing via websockets like I normally build into projects. This would keep things together across tabs
- Same thing for Redux. It'd help the (miniscule) page load times, but it would mostly just be a nicer developer UX.

## Schema

I kept the schema design dead simple and copied what was in the Google Doc from Lea.

The simplicity here I think is in line with the problem. The date sources are simple, the issue is that they're messy and often incomplete.

Messiness is a UX problem. You can build tools to make data entry more frequent and cleaner from your users. You can build better ETLs. In both cases you're going to do a lot of work to handle the heavy lifting of data conversions. But the schema is still basic and highly nullalble.

Incompleteness leads to other issues. On average, how much data does a record have at creation? What about updates? Those are real-time problems that are probably very different across the dataset of 16k companies Base10 tracks. But it still boils down to a basic and highly nullable schema again.

I would've done much more work on UX and potential incompleteness error-handling if I had more time. Any lack of it here was not from intent.

There are some assumptions built into that direct copying:

- I assume that all financial records are going to be entered around roughly the same time. I'm assuming these records would be entered after recieving and investor update. If there are frequent updates to things like CAC/ACV/etc that happen more often, it may be worth breaking these things into their own tables, then hiding the combinatorial logic in a View.
- I'm assuming that when there are updates, we would want to go back and edit existing records for the same time period rather than try to overwrite and deduplicate. The latter method isn't hard, but it can be hard to reason about. If we expect more frequent updates, and those updates could cause disruptions to our understanding of the data, I would sit back and think a bit harder about what our end users are expecting to see.

### Company Schema

```
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
industry VARCHAR(50),
business_models VARCHAR(100)[],
hq_location VARCHAR(100),
founder_quality INTEGER,
feature_set TEXT,
created_at TIMESTAMPTZ DEFAULT NOW(),
updated_at TIMESTAMPTZ DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP
```

### Record Schema

```
id SERIAL PRIMARY KEY,
company_id INT FOREIGN KEY,
date DATE NOT NULL,
revenue DECIMAL(15, 2),
cash_burn DECIMAL(15, 2),
gross_profit_percentage DECIMAL(5, 2),
gross_profit_amount DECIMAL(15, 2),
ebitda DECIMAL(15, 2),
cash_on_hand DECIMAL(15, 2),
cac DECIMAL(15, 2),
ltv DECIMAL(15, 2),
acv DECIMAL(15, 2),
arpu DECIMAL(15, 2),
customer_count INT,
next_fundraise_date DATE,
created_at TIMESTAMPTZ DEFAULT NOW(),
updated_at TIMESTAMPTZ DEFAULT NOW()
```

You could easily see factors like ACV/CAC/Fundraising estimations changing more frequently than profit margins, or similar factors. That, or they could be available at different rates of change from external data providers. Again, if this were the case, I would focus on being more clever about how I broke this table down to grouped metrics, then brought them together again via a View.

## REST API

I did full CRUD routes for both records. No authentication needed since this didn't leave my local env.

I know full CRUD was out of scope and I only needed inserts. But I wanted to get a better feel for how Go worked with Postgres. I've used Go for many CLI projects, building a programming language, and for practing for coding inteviews, but not for APIs yet. This was a fun playground to learn the ropes.

```
GET /companies - Get All
GET /companies/:id - Get By Id
POST /companies/ - Create Company
PUT /companies/:id - Update Company By Id (doesn't upsert)
DELETE /companies/:id - Delete By Id

GET /records - Get All
GET /records/:id - Get By Id
POST /records/ - Create Record
PUT /records/:id - Update Record By Id (doesn't upsert)
DELETE /records/:id - Delete By Id
```
