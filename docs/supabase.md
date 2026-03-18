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
  image_url text,
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
    "Artifacts".image_url,
    "Artifacts".location_found,
    "Artifacts".art_style,
    1 - ("Artifacts".embedding <=> query_embedding) AS similarity
  FROM "Artifacts"
  WHERE 1 - ("Artifacts".embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

** Remove Function **
DROP FUNCTION IF EXISTS match_artifacts(vector, float, int);