package companies

import "time"

type Company struct {
	ID             string    `json:"id"`
	Name           string    `json:"name" binding:"required"`
	Industry       *string   `json:"industry"`
	BusinessModels []string  `json:"business_models"`
	HQLocation     *string   `json:"hq_location"`
	FounderQuality *int      `json:"founder_quality"`
	FeatureSet     *string   `json:"feature_set"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

/*
	CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    industry VARCHAR(50),
    business_models VARCHAR(100)[],
    hq_location VARCHAR(100),
    founder_quality INTEGER,
    feature_set TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP
);
*/
