// migrations/00004_add_oauth_accounts.cjs

/**
 * Add OAuth account linking support:
 * - New `user_accounts` table to store linked OAuth identities
 * - Indexes for fast lookups
 * - Trigger for auto-updating `updated_at`
 */
exports.up = function (pgm) {
    // 1. Create user_accounts table
    pgm.createTable('user_accounts', {
      id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
      user_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
      provider: { type: 'text', notNull: true },
      provider_account_id: { type: 'text', notNull: true },
      access_token: { type: 'text' },
      refresh_token: { type: 'text' },
      expires_at: { type: 'timestamptz' },
      scope: { type: 'text' },
      token_type: { type: 'text' },
      id_token: { type: 'text' },
      profile_json: { type: 'jsonb' },
      profile_name: { type: 'text' },
      profile_email: { type: 'text' },
      profile_picture: { type: 'text' },
      last_signin_at: { type: 'timestamptz' },
      revoked: { type: 'boolean', default: false },
      created_at: { type: 'timestamptz', default: pgm.func('NOW()') },
      updated_at: { type: 'timestamptz', default: pgm.func('NOW()') },
    });
  
    // 2. Add unique constraint on (provider, provider_account_id)
    pgm.addConstraint('user_accounts', 'unique_provider_account_id', {
      unique: ['provider', 'provider_account_id'],
    });
  
    // 3. Add indexes
    pgm.createIndex('user_accounts', 'user_id');
    pgm.createIndex('user_accounts', ['provider', 'provider_account_id']);
  
    // 4. Create updated_at trigger function (if not exists)
    pgm.sql(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at'
        ) THEN
          CREATE FUNCTION update_updated_at() RETURNS TRIGGER AS $fn$
          BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
          END;
          $fn$ LANGUAGE plpgsql;
        END IF;
      END $$;
    `);
  
    // 5. Attach trigger to user_accounts
    pgm.createTrigger('user_accounts', 'update_user_accounts_updated_at', {
      when: 'BEFORE',
      operation: 'UPDATE',
      function: 'update_updated_at',
      level: 'ROW',
    });
  };
  
  exports.down = function (pgm) {
    pgm.dropTrigger('user_accounts', 'update_user_accounts_updated_at');
    pgm.dropTable('user_accounts');
  };