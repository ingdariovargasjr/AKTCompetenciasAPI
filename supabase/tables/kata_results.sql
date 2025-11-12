CREATE TABLE kata_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    round_id UUID NOT NULL,
    competitor_id UUID,
    team_id UUID,
    final_score DECIMAL(5,2) NOT NULL,
    rank_position INTEGER,
    medal VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);