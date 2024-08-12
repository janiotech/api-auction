INSERT INTO public."Roles" (name, permissions, "createdAt", "updatedAt")
SELECT 'admin', null, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM public."Roles" WHERE name = 'admin')
UNION ALL
SELECT 'user', null, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM public."Roles" WHERE name = 'user')