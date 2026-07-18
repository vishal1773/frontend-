-- PostgreSQL bootstrap equivalent of prisma/schema.prisma.
CREATE TYPE role AS ENUM ('CITIZEN', 'SHOPKEEPER', 'DISTRICT_OFFICER', 'STATE_ADMIN');
CREATE TYPE user_status AS ENUM ('ACTIVE', 'SUSPENDED', 'PENDING');
CREATE TYPE complaint_status AS ENUM ('PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED');
CREATE TYPE stock_movement_type AS ENUM ('RECEIPT', 'ISSUE', 'ADJUSTMENT');
CREATE TYPE device_status AS ENUM ('ACTIVE', 'INACTIVE', 'OFFLINE');

CREATE TABLE districts (id text PRIMARY KEY, name text NOT NULL UNIQUE, code text NOT NULL UNIQUE, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE users (id text PRIMARY KEY, full_name text NOT NULL, mobile_number text NOT NULL UNIQUE, email text UNIQUE, password_hash text, role role NOT NULL, status user_status NOT NULL DEFAULT 'ACTIVE', district_id text REFERENCES districts(id), created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX users_role_district_idx ON users(role, district_id);
CREATE TABLE shops (id text PRIMARY KEY, code text NOT NULL UNIQUE, name text NOT NULL, address text NOT NULL, district_id text NOT NULL REFERENCES districts(id), shopkeeper_id text UNIQUE REFERENCES users(id), created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE ration_cards (id text PRIMARY KEY, card_number text NOT NULL UNIQUE, aadhaar_last4 char(4) NOT NULL, address text NOT NULL, family_size integer NOT NULL DEFAULT 1 CHECK (family_size > 0), citizen_id text NOT NULL UNIQUE REFERENCES users(id), created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE commodities (id text PRIMARY KEY, code text NOT NULL UNIQUE, name text NOT NULL UNIQUE, unit text NOT NULL);
CREATE TABLE monthly_quotas (id text PRIMARY KEY, ration_card_id text NOT NULL REFERENCES ration_cards(id) ON DELETE CASCADE, month date NOT NULL, UNIQUE(ration_card_id, month));
CREATE TABLE quota_items (id text PRIMARY KEY, quota_id text NOT NULL REFERENCES monthly_quotas(id) ON DELETE CASCADE, commodity_id text NOT NULL REFERENCES commodities(id), allocated numeric(10,2) NOT NULL CHECK (allocated >= 0), collected numeric(10,2) NOT NULL DEFAULT 0 CHECK (collected >= 0), UNIQUE(quota_id, commodity_id));
CREATE TABLE inventories (id text PRIMARY KEY, shop_id text NOT NULL REFERENCES shops(id) ON DELETE CASCADE, commodity_id text NOT NULL REFERENCES commodities(id), quantity numeric(12,2) NOT NULL CHECK (quantity >= 0), reorder_level numeric(12,2) NOT NULL CHECK (reorder_level >= 0), UNIQUE(shop_id, commodity_id));
CREATE TABLE stock_movements (id text PRIMARY KEY, inventory_id text NOT NULL REFERENCES inventories(id) ON DELETE CASCADE, type stock_movement_type NOT NULL, quantity numeric(12,2) NOT NULL, reference text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE ration_transactions (id text PRIMARY KEY, receipt_number text NOT NULL UNIQUE, shop_id text NOT NULL REFERENCES shops(id), ration_card_id text NOT NULL REFERENCES ration_cards(id), issued_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE transaction_items (id text PRIMARY KEY, transaction_id text NOT NULL REFERENCES ration_transactions(id) ON DELETE CASCADE, commodity_id text NOT NULL REFERENCES commodities(id), quantity numeric(10,2) NOT NULL CHECK (quantity > 0));
CREATE TABLE complaints (id text PRIMARY KEY, reference text NOT NULL UNIQUE, citizen_id text NOT NULL REFERENCES users(id), category text NOT NULL, title text NOT NULL, description text NOT NULL, status complaint_status NOT NULL DEFAULT 'PENDING', created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE notifications (id text PRIMARY KEY, user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE, title text NOT NULL, body text NOT NULL, read_at timestamptz, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE otp_codes (id text PRIMARY KEY, user_id text REFERENCES users(id) ON DELETE CASCADE, mobile_number text NOT NULL, code_hash text NOT NULL, expires_at timestamptz NOT NULL, consumed_at timestamptz, created_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX otp_codes_mobile_expiry_idx ON otp_codes(mobile_number, expires_at);
CREATE TABLE refresh_tokens (id text PRIMARY KEY, user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE, token_hash text NOT NULL UNIQUE, expires_at timestamptz NOT NULL, revoked_at timestamptz, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE devices (id text PRIMARY KEY, device_id text NOT NULL UNIQUE, shop_id text NOT NULL REFERENCES shops(id) ON DELETE CASCADE, status device_status NOT NULL DEFAULT 'ACTIVE', last_seen_at timestamptz, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE sensor_readings (id text PRIMARY KEY, device_id text NOT NULL REFERENCES devices(id) ON DELETE CASCADE, metric text NOT NULL, value numeric(14,4) NOT NULL, recorded_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX sensor_readings_device_recorded_idx ON sensor_readings(device_id, recorded_at);
CREATE TABLE chat_messages (id text PRIMARY KEY, user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE, role text NOT NULL, content text NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
