-- Migration: enable_rls_and_policies
-- Created at: 1762915363

-- Habilitar RLS en todas las tablas
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE kata_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE kumite_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE kata_results ENABLE ROW LEVEL SECURITY;

-- Políticas permisivas para permitir operaciones (ajustar según roles en producción)
CREATE POLICY "Permitir lectura pública de competitions" ON competitions FOR SELECT USING (true);
CREATE POLICY "Permitir escritura en competitions" ON competitions FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir actualización en competitions" ON competitions FOR UPDATE USING (true);

CREATE POLICY "Permitir lectura pública de categories" ON categories FOR SELECT USING (true);

CREATE POLICY "Permitir lectura pública de competitors" ON competitors FOR SELECT USING (true);
CREATE POLICY "Permitir escritura en competitors" ON competitors FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir actualización en competitors" ON competitors FOR UPDATE USING (true);

CREATE POLICY "Permitir lectura pública de teams" ON teams FOR SELECT USING (true);
CREATE POLICY "Permitir escritura en teams" ON teams FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir actualización en teams" ON teams FOR UPDATE USING (true);

CREATE POLICY "Permitir lectura pública de rounds" ON rounds FOR SELECT USING (true);
CREATE POLICY "Permitir escritura en rounds" ON rounds FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir actualización en rounds" ON rounds FOR UPDATE USING (true);

CREATE POLICY "Permitir lectura pública de kata_scores" ON kata_scores FOR SELECT USING (true);
CREATE POLICY "Permitir escritura en kata_scores" ON kata_scores FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir actualización en kata_scores" ON kata_scores FOR UPDATE USING (true);

CREATE POLICY "Permitir lectura pública de kumite_matches" ON kumite_matches FOR SELECT USING (true);
CREATE POLICY "Permitir escritura en kumite_matches" ON kumite_matches FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir actualización en kumite_matches" ON kumite_matches FOR UPDATE USING (true);

CREATE POLICY "Permitir lectura pública de kata_results" ON kata_results FOR SELECT USING (true);
CREATE POLICY "Permitir escritura en kata_results" ON kata_results FOR INSERT WITH CHECK (true);;