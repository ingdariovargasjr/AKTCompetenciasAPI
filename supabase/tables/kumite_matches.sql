CREATE TABLE kumite_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    round_id UUID NOT NULL,
    red_competitor_id UUID NOT NULL,
    blue_competitor_id UUID NOT NULL,
    red_points INTEGER DEFAULT 0,
    blue_points INTEGER DEFAULT 0,
    red_penalties JSONB DEFAULT '[]'::jsonb,
    blue_penalties JSONB DEFAULT '[]'::jsonb,
    match_duration INTEGER DEFAULT 180,
    time_remaining INTEGER,
    winner_id UUID,
    match_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);