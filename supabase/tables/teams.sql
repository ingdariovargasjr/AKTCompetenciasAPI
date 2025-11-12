CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    competition_id UUID NOT NULL,
    team_name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    dojo VARCHAR(255),
    category_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);