package records

import "time"

type Record struct {
	ID                 int64      `json:"id" db:"id"`
	CompanyId          int64      `json:"company_id" db:"company_id"`
	Date               time.Time  `json:"date" db:"date"`
	Revenue            *float64   `json:"revenue" db:"revenue"`
	CashBurn           *float64   `json:"cash_burn" db:"cash_burn"`
	GrossProfitPercent *float64   `json:"gross_profit_percentage" db:"gross_profit_percentage"`
	GrossProfitAmount  *float64   `json:"gross_profit_amount" db:"gross_profit_amount"`
	EBITDA             *float64   `json:"ebitda" db:"ebitda"`
	CashOnHand         *float64   `json:"cash_on_hand" db:"cash_on_hand"`
	CAC                *float64   `json:"cac" db:"cac"`
	LTV                *float64   `json:"ltv" db:"ltv"`
	ACV                *float64   `json:"acv" db:"acv"`
	ARPU               *float64   `json:"arpu" db:"arpu"`
	CustomerCount      *int64     `json:"customer_count" db:"customer_count"`
	NextFundraiseDate  *time.Time `json:"next_fundraise_date" db:"next_fundraise_date"`
	CreatedAt          time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt          time.Time  `json:"updated_at" db:"updated_at"`
}

/*
CREATE TABLE records (
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
);

ALTER TABLE records
ADD COLUMN company_id INT,
ADD CONSTRAINT fk_company
    FOREIGN KEY (company_id)
    REFERENCES companies (id);
*/
