CREATE TABLE competitors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    competition_id UUID NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    country VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    dojo VARCHAR(255) NOT NULL,
    category_id UUID,
    dorsal_number INTEGER,
    gender VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);