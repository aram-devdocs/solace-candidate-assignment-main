SELECT 
    indexname,
    indexdef
FROM 
    pg_indexes
WHERE 
    tablename = 'advocates' 
    AND indexname LIKE 'idx_advocates_%'
ORDER BY 
    indexname;
