 https://supabase.com/dashboard/project/zfcjarjlreqtvbtwzzyp/integrations/data_api/docs?page=tables-intro
 <!--  -->
 ALTER SEQUENCE "Artifacts_id_seq" RESTART WITH 9;
 
<!-- ** Create Function ** -->
CREATE OR REPLACE FUNCTION match_artifacts (
  query_embedding vector(512),
  match_threshold float,
  match_count int,
  current_id bigint,
  search_type text DEFAULT 'text' -- ✅ เพิ่มเพื่อเลือกว่าจะค้นหาจากคอลัมน์ไหน
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
    -- ✅ คำนวณ similarity โดยเช็ค search_type
    CASE 
      WHEN search_type = 'image' THEN 1 - ("Artifacts".image_embedding <=> query_embedding)
      ELSE 1 - ("Artifacts".embedding <=> query_embedding)
    END::float AS similarity
  FROM "Artifacts"
  WHERE 
    "Artifacts".id != current_id 
    AND (
      CASE 
        WHEN search_type = 'image' THEN 1 - ("Artifacts".image_embedding <=> query_embedding)
        ELSE 1 - ("Artifacts".embedding <=> query_embedding)
      END > match_threshold
    )
    -- ✅ ป้องกันการค้นหาในคอลัมน์ที่ข้อมูลยังเป็น NULL
    AND (
      (search_type = 'image' AND "Artifacts".image_embedding IS NOT NULL) OR
      (search_type = 'text' AND "Artifacts".embedding IS NOT NULL)
    )
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

** (สำหรับเพิ่มข้อมูล) นับ ID ใหม่ให้เริ่มต่อจากค่าที่มากที่สุดในตารางปัจจุบัน **
SELECT setval(pg_get_serial_sequence('"Artifacts"', 'id'), coalesce(max(id), 0) + 1, false) FROM "Artifacts";

** Remove Function **
DROP FUNCTION IF EXISTS match_artifacts(vector, float, int);