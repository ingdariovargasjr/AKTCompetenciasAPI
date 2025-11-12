-- Migration: simplify_kata_scoring
-- Created at: 1762924639

-- Eliminar campos separados de técnica y atletismo
ALTER TABLE kata_scores 
DROP COLUMN IF EXISTS technique_score,
DROP COLUMN IF EXISTS athleticism_score,
DROP COLUMN IF EXISTS total_score;

-- Agregar campo final_score único
ALTER TABLE kata_scores 
ADD COLUMN final_score NUMERIC(4,2) NOT NULL DEFAULT 0;

-- Actualizar comentarios para claridad
COMMENT ON COLUMN kata_scores.final_score IS 'Puntuación final única del juez para la presentación de Kata (1-10)';;