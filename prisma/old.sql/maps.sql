CREATE TABLE IF NOT EXISTS "maps" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "alternative_name" text DEFAULT NULL,
  "src" text DEFAULT NULL,
  "date_created" timestamp NOT NULL DEFAULT current_timestamp
);

INSERT INTO maps (id, name, alternative_name, src, date_created) VALUES
    (0, 'none', 'none', NULL, '2022-01-24 16:10:46'),
    (1, 'ski2', 'surf_ski2', NULL, '2022-01-24 16:10:46'),
    (2, 'strafes', 'surf_strafes', NULL, '2022-01-24 16:10:46'),
    (3, 'hns_tyo_docg_gxd', 'hns_tyo_docg', NULL, '2022-12-25 19:17:07');