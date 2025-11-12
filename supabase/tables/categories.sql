CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    age_min INTEGER NOT NULL,
    age_max INTEGER NOT NULL,
    weight_min DECIMAL(5,2),
    weight_max DECIMAL(5,2),
    gender VARCHAR(20) NOT NULL,
    competition_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);