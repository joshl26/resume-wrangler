// migrations/00003_indexes_concurrent.cjs
// Fixes: is_complete column is text, so compare with 'false' (string), not false (boolean)
// Also disables per-migration transaction so CREATE INDEX CONCURRENTLY can run.

exports.up = function (pgm) {
  // disable the per-migration transaction
  pgm.noTransaction();

  // Create each index concurrently
  pgm.sql(`
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_applications_company_id
      ON public.applications USING btree (company_id);
  `);

  pgm.sql(`
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_applications_user_id
      ON public.applications USING btree (user_id);
  `);

  pgm.sql(`
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_applications_date_submitted
      ON public.applications USING btree (date_submitted);
  `);

  pgm.sql(`
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_applications_created_at
      ON public.applications USING btree (created_at);
  `);

  pgm.sql(`
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_applications_user_id_date_submitted
      ON public.applications USING btree (user_id, date_submitted DESC);
  `);

  // Fix: is_complete is text, so compare with 'false' (string)
  pgm.sql(`
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_applications_incomplete
      ON public.applications USING btree (user_id)
      WHERE (is_complete = 'false');
  `);

  pgm.sql(`
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_applications_posting_text_tsv
      ON public.applications USING gin (
        to_tsvector('english', COALESCE(posting_text, '') || ' ' || COALESCE(analyzed_posting_text, ''))
      );
  `);

  pgm.sql(`
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_applications_posting_url_trgm
      ON public.applications USING gin (posting_url gin_trgm_ops);
  `);

  // drop the low-value boolean index if present
  pgm.sql(`
    DROP INDEX CONCURRENTLY IF EXISTS idx_applications_is_complete;
  `);
};

exports.down = function (pgm) {
  pgm.noTransaction();

  pgm.sql(
    `DROP INDEX CONCURRENTLY IF EXISTS idx_applications_posting_url_trgm;`,
  );
  pgm.sql(
    `DROP INDEX CONCURRENTLY IF EXISTS idx_applications_posting_text_tsv;`,
  );
  pgm.sql(`DROP INDEX CONCURRENTLY IF EXISTS idx_applications_incomplete;`);
  pgm.sql(
    `DROP INDEX CONCURRENTLY IF EXISTS idx_applications_user_id_date_submitted;`,
  );
  pgm.sql(`DROP INDEX CONCURRENTLY IF EXISTS idx_applications_created_at;`);
  pgm.sql(`DROP INDEX CONCURRENTLY IF EXISTS idx_applications_date_submitted;`);
  pgm.sql(`DROP INDEX CONCURRENTLY IF EXISTS idx_applications_user_id;`);
  pgm.sql(`DROP INDEX CONCURRENTLY IF EXISTS idx_applications_company_id;`);

  // recreate boolean index on rollback (optional)
  pgm.sql(`
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_applications_is_complete
      ON public.applications USING btree (is_complete);
  `);
};
