 https://supabase.com/dashboard/project/zfcjarjlreqtvbtwzzyp/integrations/data_api/docs?page=tables-intro
 <!--  -->
 ALTER SEQUENCE "Artifacts_id_seq" RESTART WITH 9;
 
<!-- ** Create Function ** -->
CREATE OR REPLACE FUNCTION match_artifacts (
  query_embedding vector,    -- รองรับทั้ง 3072 (Text) และ 512 (Image)
  match_threshold float,
  match_count int,
  current_id bigint,
  search_type text DEFAULT 'text'
)
RETURNS TABLE (
  id bigint,
  title text,
  description text,
  image_file text,
  location_found text,
  art_style text,
  current_location text,
  era text,
  category text,
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
    "Artifacts".current_location,
    "Artifacts".era,
    "Artifacts".category,
    (CASE 
      -- กรณีค้นหาด้วยภาพ (เปรียบเทียบ 512 กับ 512)
      WHEN search_type = 'image' THEN 1 - ("Artifacts".image_embedding <=> query_embedding::vector(512))
      -- กรณีค้นหาด้วยข้อความ (เปรียบเทียบ 3072 กับ 3072)
      ELSE 1 - ("Artifacts".embedding <=> query_embedding::vector(3072))
    END)::float AS similarity
  FROM "Artifacts"
  WHERE 
    "Artifacts".id != current_id 
    AND (
      -- ตรวจสอบเงื่อนไขตามประเภทการค้นหาและขนาดมิติของ Vector
      (search_type = 'image' AND "Artifacts".image_embedding IS NOT NULL AND vector_dims(query_embedding) = 512) OR
      (search_type = 'text' AND "Artifacts".embedding IS NOT NULL AND vector_dims(query_embedding) = 3072)
    )
    AND (
      CASE 
        WHEN search_type = 'image' THEN 1 - ("Artifacts".image_embedding <=> query_embedding::vector(512))
        ELSE 1 - ("Artifacts".embedding <=> query_embedding::vector(3072))
      END > match_threshold
    )
  ORDER BY 10 DESC 
  LIMIT match_count;
END;
$$;

** (สำหรับเพิ่มข้อมูล) นับ ID ใหม่ให้เริ่มต่อจากค่าที่มากที่สุดในตารางปัจจุบัน **
SELECT setval(pg_get_serial_sequence('"Artifacts"', 'id'), coalesce(max(id), 0) + 1, false) FROM "Artifacts";

** Remove Function **
DROP FUNCTION IF EXISTS match_artifacts(vector, float, int);