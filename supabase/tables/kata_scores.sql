CREATE TABLE kata_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    competitor_id UUID NOT NULL,
    round_id UUID NOT NULL,
    judge_number INTEGER NOT NULL,
    technique_score DECIMAL(4,2) NOT NULL,
    athleticism_score DECIMAL(4,2) NOT NULL,
    total_score DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);