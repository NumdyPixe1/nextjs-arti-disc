** Create Function **
CREATE OR REPLACE FUNCTION match_artifacts (
  query_embedding vector(3072),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id bigint,
  title text,
  description text,
  image_file text,
  location_found text,
  art_style text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    "Artifacts".id,
    "Artifacts".title,
    "Artifacts".description,
    "Artifacts".image_file,
    "Artifacts".location_found,
    "Artifacts".art_style,
    1 - ("Artifacts".embedding <=> query_embedding) AS similarity
  FROM "Artifacts"
  WHERE 1 - ("Artifacts".embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

** (สำหรับเพิ่มข้อมูล) นับ ID ใหม่ให้เริ่มต่อจากค่าที่มากที่สุดในตารางปัจจุบัน **
SELECT setval(pg_get_serial_sequence('"Artifacts"', 'id'), coalesce(max(id), 0) + 1, false) FROM "Artifacts";

** Remove Function **
DROP FUNCTION IF EXISTS match_artifacts(vector, float, int);