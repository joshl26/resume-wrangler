exports.shorthands = undefined;

exports.up = (pgm) => {
  // Create update_updated_at function
  pgm.createFunction(
    'update_updated_at',
    [],
    {
      returns: 'TRIGGER',
      language: 'plpgsql',
    },
    `
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
`
  );

  // Create tables
  pgm.createTable('users', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('public.uuid_generate_v4()') },
    name: { type: 'varchar(255)', notNull: true },
    email: { type: 'text', notNull: true, unique: true },
    password: { type: 'text', notNull: true },
    first_name: { type: 'text' },
    last_name: { type: 'text' },
    address_one: { type: 'text' },
    address_two: { type: 'text' },
    address_three: { type: 'text' },
    phone: { type: 'text' },
    website: { type: 'text' },
    thumbnail: { type: 'text' },
    linked_in: { type: 'text' },
    twitter: { type: 'text' },
    facebook: { type: 'text' },
    instagram: { type: 'text' },
    github: { type: 'text' },
    country: { type: 'text' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func("timezone('utc'::text, now())") },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    new_user: { type: 'text', notNull: true, default: 'true' },
    access_level: { type: 'text', notNull: true, default: "'basic'" },
    tour_dashboard: { type: 'text', notNull: true, default: "'true'" },
  });

  pgm.createTable('companies', {
    id: { type: 'bigint', primaryKey: true, sequenceGenerated: { precedence: 'BY DEFAULT' } },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    name: { type: 'text' },
    address_one: { type: 'text' },
    address_two: { type: 'text' },
    recipient_title: { type: 'text' },
    email: { type: 'text' },
    phone: { type: 'text' },
    website_url: { type: 'text' },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    user_id: { type: 'uuid', notNull: true },
  });

  pgm.createTable('applications', {
    id: { type: 'bigint', primaryKey: true, sequenceGenerated: { precedence: 'BY DEFAULT' } },
    posting_text: { type: 'text' },
    is_complete: { type: 'text', default: 'false' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func("timezone('utc'::text, now())") },
    date_submitted: { type: 'timestamptz' },
    job_position: { type: 'text' },
    posting_url: { type: 'text' },
    analyzed_posting_text: { type: 'text' },
    company_id: { type: 'bigint' },
    key_skills: { type: 'text' },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    user_id: { type: 'uuid' },
    location: { type: 'text' },
  });

  pgm.createTable('cover_experiences', {
    id: { type: 'bigint', primaryKey: true, sequenceGenerated: { precedence: 'BY DEFAULT' } },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    title: { type: 'text' },
    description: { type: 'text' },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    user_id: { type: 'uuid', notNull: true },
  });

  pgm.createTable('cover_letters', {
    id: { type: 'bigint', primaryKey: true, sequenceGenerated: { precedence: 'BY DEFAULT' } },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    company_id: { type: 'bigint' },
    first_name: { type: 'text', default: "'Josh'" },
    last_name: { type: 'text', default: "'Lehman'" },
    recipient_title: { type: 'text', default: "'Software Team Hiring Manager'" },
    intro_text_start: { type: 'text', default: "'Attached is a copy of my resume in response to the job posting for: '" },
    intro_skills: { type: 'text' },
    intro_experience: { type: 'text' },
    application_id: { type: 'bigint' },
    intro_text_end: { type: 'text', default: "'This role appears to be an exciting opportunity where my skill set would prove to be a valuable addition to your company.'" },
    salutation_text: { type: 'text', default: "'Regards'" },
    conclusion_text: { type: 'text', default: "'In addition to the skills mentioned above, I have a solid educational foundation which includes a Bachelor’s Degree in Engineering Technology from McMaster University and an Advanced Diploma in Engineering Technology from Mohawk College.'" },
    thanks_text: { type: 'text', default: "'Thank you for your time and consideration.'" },
    user_id: { type: 'uuid' },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    template: { type: 'text', notNull: true, default: "'standard'" },
    heading_font: { type: 'text', notNull: true, default: "'font-raleway-bold'" },
    body_font: { type: 'text', notNull: true, default: "'font-quicksand'" },
    color: { type: 'text', notNull: true, default: "'bg-white'" },
    highlight_color: { type: 'text', notNull: true, default: "'bg-white'" },
  });

  pgm.createTable('cover_experience_lines', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('public.uuid_generate_v4()') },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    cover_letter_id: { type: 'bigint', notNull: true },
    cover_experience_id: { type: 'bigint', notNull: true },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    user_id: { type: 'uuid', notNull: true },
    position: { type: 'text' },
    line_type: { type: 'text' },
  });

  pgm.createTable('resume_colors', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('public.uuid_generate_v4()') },
    name: { type: 'text' },
    color: { type: 'text' },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    highlight_color: { type: 'text' },
  });

  pgm.createTable('resume_experiences', {
    id: { type: 'bigint', primaryKey: true, sequenceGenerated: { precedence: 'BY DEFAULT' } },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    title: { type: 'text' },
    company: { type: 'text' },
    detail: { type: 'text' },
    date: { type: 'text' },
    description: { type: 'text' },
    type: { type: 'text' },
    link_url: { type: 'text' },
    git_url: { type: 'text' },
    user_id: { type: 'uuid', notNull: true },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  });

  pgm.createTable('resume_experiences_template', {
    id: { type: 'bigint', primaryKey: true, sequenceGenerated: { precedence: 'BY DEFAULT' } },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    title: { type: 'text' },
    company: { type: 'text' },
    detail: { type: 'text' },
    date: { type: 'text' },
    description: { type: 'text' },
    type: { type: 'text' },
    link_url: { type: 'text' },
    git_url: { type: 'text' },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  });

  pgm.createTable('resumes', {
    id: { type: 'bigint', primaryKey: true, sequenceGenerated: { precedence: 'BY DEFAULT' } },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    application_id: { type: 'bigint' },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    user_id: { type: 'uuid' },
    company_id: { type: 'text' },
    title: { type: 'text' },
    template: { type: 'text' },
    color: { type: 'text' },
    heading_font: { type: 'text', notNull: true, default: "'font-raleway-bold'" },
    body_font: { type: 'text', notNull: true, default: "'font-quicksand'" },
    show_social_icons: { type: 'text', notNull: true, default: 'true' },
    show_skill_progress: { type: 'text', notNull: true, default: 'true' },
    show_skills_section: { type: 'text', notNull: true, default: 'true' },
    show_education_section: { type: 'text', notNull: true, default: 'true' },
    show_custom_section_one: { type: 'text', notNull: true, default: 'true' },
    custom_section_one_name: { type: 'text', notNull: true, default: "'Organizations'" },
    show_custom_section_two: { type: 'text', notNull: true, default: 'true' },
    custom_section_two_name: { type: 'text', notNull: true, default: "'Certifications'" },
    description: { type: 'text' },
    highlight_color: { type: 'text' },
    show_user_image: { type: 'text', notNull: true, default: 'false' },
  });

  pgm.createTable('resume_lines', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('public.uuid_generate_v4()') },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    user_id: { type: 'uuid', notNull: true },
    position: { type: 'text' },
    resume_id: { type: 'bigint', notNull: true },
    line_type: { type: 'text' },
    user_education_id: { type: 'uuid' },
    work_experience_id: { type: 'uuid' },
    user_skills_id: { type: 'uuid' },
    user_custom_section_one_id: { type: 'uuid' },
    user_custom_section_two_id: { type: 'uuid' },
  });

  pgm.createTable('selected_application', {
    id: { type: 'bigint', primaryKey: true, sequenceGenerated: { precedence: 'BY DEFAULT' } },
    application_id: { type: 'bigint' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  });

  pgm.createTable('user_custom_section_one', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('public.uuid_generate_v4()') },
    user_id: { type: 'uuid', notNull: true },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    name: { type: 'text' },
    location: { type: 'text' },
    start_date: { type: 'text' },
    end_date: { type: 'text' },
    description: { type: 'text' },
  });

  pgm.createTable('user_custom_section_two', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('public.uuid_generate_v4()') },
    user_id: { type: 'uuid', notNull: true },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    name: { type: 'text' },
    location: { type: 'text' },
    start_date: { type: 'text' },
    end_date: { type: 'text' },
    description: { type: 'text' },
  });

  pgm.createTable('user_education', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('public.uuid_generate_v4()') },
    institution_name: { type: 'text', notNull: true },
    program: { type: 'text' },
    url: { type: 'text' },
    user_id: { type: 'uuid', notNull: true },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    location: { type: 'text' },
    start_date: { type: 'text' },
    description_one: { type: 'text' },
    description_two: { type: 'text' },
    description_three: { type: 'text' },
    end_date: { type: 'text' },
    grade: { type: 'text' },
  });

  pgm.createTable('user_skills', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('public.uuid_generate_v4()') },
    skill: { type: 'text', notNull: true },
    user_id: { type: 'uuid', notNull: true },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    skill_level: { type: 'text' },
  });

  pgm.createTable('user_work_experience', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('public.uuid_generate_v4()') },
    job_title: { type: 'text', notNull: true },
    company_name: { type: 'text' },
    user_id: { type: 'uuid', notNull: true },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    location: { type: 'text' },
    description_one: { type: 'text' },
    description_two: { type: 'text' },
    description_three: { type: 'text' },
    description_four: { type: 'text' },
    start_date: { type: 'text' },
    end_date: { type: 'text' },
  });

  pgm.createTable('body_fonts', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('public.uuid_generate_v4()') },
    name: { type: 'text', notNull: true },
    description: { type: 'text', notNull: true },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  });

  pgm.createTable('header_fonts', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('public.uuid_generate_v4()') },
    name: { type: 'text', notNull: true },
    description: { type: 'text', notNull: true },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  });

  pgm.createTable('cover_letter_templates', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('public.uuid_generate_v4()') },
    name: { type: 'text' },
    thumbnail_url: { type: 'text' },
    cloudinary_public_id: { type: 'text' },
    description: { type: 'text' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', default: pgm.func('now()') },
    active: { type: 'text' },
  });

  pgm.createTable('resume_templates', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('public.uuid_generate_v4()') },
    name: { type: 'text' },
    thumbnail_url: { type: 'text' },
    cloudinary_public_id: { type: 'text' },
    description: { type: 'text' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    active: { type: 'text', notNull: true, default: "'false'" },
  });

  pgm.createTable('views', {
    slug: { type: 'varchar(255)', primaryKey: true },
    count: { type: 'integer', notNull: true },
  });

  // Add foreign key constraints
  pgm.addConstraint('applications', 'applications_company_id_fkey', {
    foreignKeys: {
      columns: 'company_id',
      references: 'companies(id)',
      onUpdate: 'CASCADE',
    },
  });

  pgm.addConstraint('applications', 'applications_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
    },
  });

  pgm.addConstraint('companies', 'companies_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('cover_experience_lines', 'cover_experience_lines_cover_letter_id_fkey', {
    foreignKeys: {
      columns: 'cover_letter_id',
      references: 'cover_letters(id)',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('cover_experience_lines', 'cover_experience_lines_cover_experience_id_fkey', {
    foreignKeys: {
      columns: 'cover_experience_id',
      references: 'cover_experiences(id)',
      onUpdate: 'CASCADE',
    },
  });

  pgm.addConstraint('cover_experience_lines', 'cover_experience_lines_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('cover_experiences', 'cover_experiences_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('cover_letters', 'cover_letters_company_id_fkey', {
    foreignKeys: {
      columns: 'company_id',
      references: 'companies(id)',
      onUpdate: 'CASCADE',
    },
  });

  pgm.addConstraint('cover_letters', 'cover_letters_application_id_fkey', {
    foreignKeys: {
      columns: 'application_id',
      references: 'applications(id)',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('cover_letters', 'cover_letters_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
    },
  });

  pgm.addConstraint('resume_experiences', 'resume_experiences_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('resume_lines', 'resume_lines_resume_id_fkey', {
    foreignKeys: {
      columns: 'resume_id',
      references: 'resumes(id)',
      onDelete: 'NO ACTION', // Note: NOT VALID constraint in original schema
    },
  });

  pgm.addConstraint('resume_lines', 'resume_lines_user_education_id_fkey', {
    foreignKeys: {
      columns: 'user_education_id',
      references: 'user_education(id)',
      onUpdate: 'CASCADE',
    },
  });

  pgm.addConstraint('resume_lines', 'resume_lines_work_experience_id_fkey', {
    foreignKeys: {
      columns: 'work_experience_id',
      references: 'user_work_experience(id)',
      onUpdate: 'CASCADE',
    },
  });

  pgm.addConstraint('resume_lines', 'resume_lines_user_skills_id_fkey', {
    foreignKeys: {
      columns: 'user_skills_id',
      references: 'user_skills(id)',
      onUpdate: 'CASCADE',
    },
  });

  pgm.addConstraint('resume_lines', 'resume_lines_user_custom_section_one_id_fkey', {
    foreignKeys: {
      columns: 'user_custom_section_one_id',
      references: 'user_custom_section_one(id)',
      onUpdate: 'CASCADE',
    },
  });

  pgm.addConstraint('resume_lines', 'resume_lines_user_custom_section_two_id_fkey', {
    foreignKeys: {
      columns: 'user_custom_section_two_id',
      references: 'user_custom_section_two(id)',
      onUpdate: 'CASCADE',
    },
  });

  pgm.addConstraint('resume_lines', 'resume_lines_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('resumes', 'resumes_application_id_fkey', {
    foreignKeys: {
      columns: 'application_id',
      references: 'applications(id)',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('resumes', 'resumes_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
    },
  });

  pgm.addConstraint('selected_application', 'selected_application_application_id_fkey', {
    foreignKeys: {
      columns: 'application_id',
      references: 'applications(id)',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('user_custom_section_one', 'user_custom_section_one_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('user_custom_section_two', 'user_custom_section_two_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('user_education', 'user_education_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('user_skills', 'user_skills_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('user_work_experience', 'user_work_experience_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });

  // Add triggers
  const tablesWithUpdatedAt = [
    'applications',
    'body_fonts',
    'companies',
    'cover_experience_lines',
    'cover_experiences',
    'cover_letter_templates',
    'cover_letters',
    'header_fonts',
    'resume_colors',
    'resume_experiences',
    'resume_experiences_template',
    'resume_lines',
    'resume_templates',
    'resumes',
    'selected_application',
    'user_custom_section_one',
    'user_custom_section_two',
    'user_education',
    'user_skills',
    'user_work_experience',
    'users',
  ];

  tablesWithUpdatedAt.forEach((table) => {
    pgm.createTrigger(
      table,
      `update_${table}_updated_at`,
      {
        when: 'BEFORE',
        operation: 'UPDATE',
        level: 'ROW',
        function: 'update_updated_at',
      }
    );
  });
};

exports.down = (pgm) => {
  // Drop triggers
  const tablesWithUpdatedAt = [
    'applications',
    'body_fonts',
    'companies',
    'cover_experience_lines',
    'cover_experiences',
    'cover_letter_templates',
    'cover_letters',
    'header_fonts',
    'resume_colors',
    'resume_experiences',
    'resume_experiences_template',
    'resume_lines',
    'resume_templates',
    'resumes',
    'selected_application',
    'user_custom_section_one',
    'user_custom_section_two',
    'user_education',
    'user_skills',
    'user_work_experience',
    'users',
  ];

  tablesWithUpdatedAt.forEach((table) => {
    pgm.dropTrigger(table, `update_${table}_updated_at`, { ifExists: true });
  });

  // Drop foreign key constraints
  pgm.dropConstraint('applications', 'applications_company_id_fkey', { ifExists: true });
  pgm.dropConstraint('applications', 'applications_user_id_fkey', { ifExists: true });
  pgm.dropConstraint('companies', 'companies_user_id_fkey', { ifExists: true });
  pgm.dropConstraint('cover_experience_lines', 'cover_experience_lines_cover_letter_id_fkey', { ifExists: true });
  pgm.dropConstraint('cover_experience_lines', 'cover_experience_lines_cover_experience_id_fkey', { ifExists: true });
  pgm.dropConstraint('cover_experience_lines', 'cover_experience_lines_user_id_fkey', { ifExists: true });
  pgm.dropConstraint('cover_experiences', 'cover_experiences_user_id_fkey', { ifExists: true });
  pgm.dropConstraint('cover_letters', 'cover_letters_company_id_fkey', { ifExists: true });
  pgm.dropConstraint('cover_letters', 'cover_letters_application_id_fkey', { ifExists: true });
  pgm.dropConstraint('cover_letters', 'cover_letters_user_id_fkey', { ifExists: true });
  pgm.dropConstraint('resume_experiences', 'resume_experiences_user_id_fkey', { ifExists: true });
  pgm.dropConstraint('resume_lines', 'resume_lines_resume_id_fkey', { ifExists: true });
  pgm.dropConstraint('resume_lines', 'resume_lines_user_education_id_fkey', { ifExists: true });
  pgm.dropConstraint('resume_lines', 'resume_lines_work_experience_id_fkey', { ifExists: true });
  pgm.dropConstraint('resume_lines', 'resume_lines_user_skills_id_fkey', { ifExists: true });
  pgm.dropConstraint('resume_lines', 'resume_lines_user_custom_section_one_id_fkey', { ifExists: true });
  pgm.dropConstraint('resume_lines', 'resume_lines_user_custom_section_two_id_fkey', { ifExists: true });
  pgm.dropConstraint('resume_lines', 'resume_lines_user_id_fkey', { ifExists: true });
  pgm.dropConstraint('resumes', 'resumes_application_id_fkey', { ifExists: true });
  pgm.dropConstraint('resumes', 'resumes_user_id_fkey', { ifExists: true });
  pgm.dropConstraint('selected_application', 'selected_application_application_id_fkey', { ifExists: true });
  pgm.dropConstraint('user_custom_section_one', 'user_custom_section_one_user_id_fkey', { ifExists: true });
  pgm.dropConstraint('user_custom_section_two', 'user_custom_section_two_user_id_fkey', { ifExists: true });
  pgm.dropConstraint('user_education', 'user_education_user_id_fkey', { ifExists: true });
  pgm.dropConstraint('user_skills', 'user_skills_user_id_fkey', { ifExists: true });
  pgm.dropConstraint('user_work_experience', 'user_work_experience_user_id_fkey', { ifExists: true });

  // Drop tables
  pgm.dropTable('views');
  pgm.dropTable('resume_templates');
  pgm.dropTable('cover_letter_templates');
  pgm.dropTable('header_fonts');
  pgm.dropTable('body_fonts');
  pgm.dropTable('user_work_experience');
  pgm.dropTable('user_skills');
  pgm.dropTable('user_education');
  pgm.dropTable('user_custom_section_two');
  pgm.dropTable('user_custom_section_one');
  pgm.dropTable('selected_application');
  pgm.dropTable('resume_lines');
  pgm.dropTable('resumes');
  pgm.dropTable('resume_experiences_template');
  pgm.dropTable('resume_experiences');
  pgm.dropTable('resume_colors');
  pgm.dropTable('cover_experience_lines');
  pgm.dropTable('cover_letters');
  pgm.dropTable('cover_experiences');
  pgm.dropTable('applications');
  pgm.dropTable('companies');
  pgm.dropTable('users');

  // Drop function
  pgm.dropFunction('update_updated_at', [], { ifExists: true });
};