/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // Ensure pg_trgm is available for trigram indexes
  pgm.createExtension('pg_trgm', { ifNotExists: true });

  // B-tree indexes for common lookup and sorting patterns
  pgm.createIndex('applications', ['company_id'], { name: 'idx_applications_company_id' });
  pgm.createIndex('applications', ['user_id'], { name: 'idx_applications_user_id' });
  pgm.createIndex('applications', ['date_submitted'], { name: 'idx_applications_date_submitted' });
  pgm.createIndex('applications', ['created_at'], { name: 'idx_applications_created_at' });
  // Composite index for queries that filter by user and sort by date (date_submitted DESC)
  pgm.sql("CREATE INDEX IF NOT EXISTS idx_applications_user_id_date_submitted ON applications (user_id, date_submitted DESC);");

  pgm.createIndex('resumes', ['user_id'], { name: 'idx_resumes_user_id' });
  pgm.createIndex('resumes', ['application_id'], { name: 'idx_resumes_application_id' });
  pgm.createIndex('resumes', ['created_at'], { name: 'idx_resumes_created_at' });

  pgm.createIndex('companies', ['user_id'], { name: 'idx_companies_user_id' });
  pgm.createIndex('companies', ['name'], { name: 'idx_companies_name_btree' });

  pgm.createIndex('cover_experiences', ['user_id'], { name: 'idx_cover_experiences_user_id' });
  pgm.createIndex('resume_experiences', ['user_id'], { name: 'idx_resume_experiences_user_id' });

  pgm.createIndex('resume_lines', ['resume_id'], { name: 'idx_resume_lines_resume_id' });

  pgm.createIndex('user_skills', ['user_id'], { name: 'idx_user_skills_user_id' });
  pgm.createIndex('user_work_experience', ['user_id'], { name: 'idx_user_work_experience_user_id' });
  pgm.createIndex('user_education', ['user_id'], { name: 'idx_user_education_user_id' });

  // Partial index for applications that are not complete (helps queries like WHERE is_complete = 'false')
  pgm.sql("CREATE INDEX IF NOT EXISTS idx_applications_incomplete ON applications (user_id) WHERE is_complete = 'false';");

  // Full-text search index on application posting text (combines posting_text and analyzed_posting_text)
  pgm.sql(`CREATE INDEX IF NOT EXISTS idx_applications_posting_text_tsv ON applications USING GIN (to_tsvector('english', coalesce(posting_text,'') || ' ' || coalesce(analyzed_posting_text,'')));`);

  // Trigram indexes for fast ILIKE / similarity searches
  pgm.sql("CREATE INDEX IF NOT EXISTS idx_companies_name_trgm ON companies USING gin (name gin_trgm_ops);");
  pgm.sql("CREATE INDEX IF NOT EXISTS idx_applications_posting_url_trgm ON applications USING gin (posting_url gin_trgm_ops);");
  pgm.sql("CREATE INDEX IF NOT EXISTS idx_users_email_trgm ON users USING gin (email gin_trgm_ops);");

  // Indexes often useful for pagination/sorting
  pgm.createIndex('users', ['created_at'], { name: 'idx_users_created_at' });
  pgm.createIndex('applications', ['is_complete'], { name: 'idx_applications_is_complete' });
};

exports.down = (pgm) => {
  // Drop indexes (use IF EXISTS via raw SQL for the expression/TRGM/TSV indexes)
  pgm.sql("DROP INDEX IF EXISTS idx_applications_posting_text_tsv;");
  pgm.sql("DROP INDEX IF EXISTS idx_companies_name_trgm;");
  pgm.sql("DROP INDEX IF EXISTS idx_applications_posting_url_trgm;");
  pgm.sql("DROP INDEX IF EXISTS idx_users_email_trgm;");
  pgm.sql("DROP INDEX IF EXISTS idx_applications_incomplete;");

  pgm.dropIndex('applications', 'idx_applications_company_id', { ifExists: true });
  pgm.dropIndex('applications', 'idx_applications_user_id', { ifExists: true });
  pgm.dropIndex('applications', 'idx_applications_date_submitted', { ifExists: true });
  pgm.dropIndex('applications', 'idx_applications_created_at', { ifExists: true });
  pgm.dropIndex('applications', 'idx_applications_user_id_date_submitted', { ifExists: true });
  pgm.dropIndex('applications', 'idx_applications_is_complete', { ifExists: true });

  pgm.dropIndex('resumes', 'idx_resumes_user_id', { ifExists: true });
  pgm.dropIndex('resumes', 'idx_resumes_application_id', { ifExists: true });
  pgm.dropIndex('resumes', 'idx_resumes_created_at', { ifExists: true });

  pgm.dropIndex('companies', 'idx_companies_user_id', { ifExists: true });
  pgm.dropIndex('companies', 'idx_companies_name_btree', { ifExists: true });

  pgm.dropIndex('cover_experiences', 'idx_cover_experiences_user_id', { ifExists: true });
  pgm.dropIndex('resume_experiences', 'idx_resume_experiences_user_id', { ifExists: true });
  pgm.dropIndex('resume_lines', 'idx_resume_lines_resume_id', { ifExists: true });

  pgm.dropIndex('user_skills', 'idx_user_skills_user_id', { ifExists: true });
  pgm.dropIndex('user_work_experience', 'idx_user_work_experience_user_id', { ifExists: true });
  pgm.dropIndex('user_education', 'idx_user_education_user_id', { ifExists: true });
  pgm.dropIndex('users', 'idx_users_created_at', { ifExists: true });

  // Optionally remove extension (keep it if other DB objects rely on it)
  // pgm.dropExtension('pg_trgm', { ifExists: true });
};