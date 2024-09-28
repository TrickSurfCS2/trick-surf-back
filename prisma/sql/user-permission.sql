-- Очистка таблицы user_permission
TRUNCATE TABLE public."user_permission" CONTINUE IDENTITY RESTRICT;

-- Вставка 5 разных разрешений
INSERT INTO "user_permission" (id, "userId", permission) VALUES
    (1, 1, 'UpdateTrick'),
    (2, 1, 'CreateTrick'),
    (3, 1, 'DeleteTrick'),
    (4, 1, 'BanUser'),
    (5, 1, 'Teleport');
