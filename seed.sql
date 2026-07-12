-- Default Admin Account
INSERT INTO users (
    name,
    email,
    password,
    role,
    approved
)
VALUES (
    'Admin',
    'Shorfuddin904',
    '$2b$10$example_hashed_password',
    'admin',
    TRUE
)
ON CONFLICT (email) DO NOTHING;

-- Default Settings
INSERT INTO settings (
    site_name
)
VALUES (
    'Trading Signal App'
)
ON CONFLICT DO NOTHING;
