# SQL 정리
## SQL이란 - Structured QUery Language
### database - CRUD(Create, Read, Update, Delete)
1. Create
```sql
INSERT INTO sample SET comment='테스트 입니다', wdate='2019-08-27 21:51:10'
```

2. Delete
```sql
DELETE FROM sample WHERE id=3
```

3. SELECT
```sql
/* SELECT id, comment, wdate */
/* SELECT * FROM sample */
/* SELECT * FROM sample ORDER BY id DESC //내림차순(최신글) */
/* SELECT * FROM sample ORDER BY id ASC  //오름차순(옛날글) */
/* SELECT * FROM sample WHERE id>5 */
SELECT * FROM sample ORDER BY id DESC
```
