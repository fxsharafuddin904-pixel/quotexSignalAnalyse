-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Signal Analysis History
CREATE TABLE IF NOT EXISTS signals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    market VARCHAR(50),
    timeframe VARCHAR(20),
    image_url TEXT,
    signal VARCHAR(20),
    confidence INTEGER,
    analysis TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin Settings
CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    site_name VARCHAR(100) DEFAULT 'Trading Signal App',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
