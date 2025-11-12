// migrations/00005_make_password_nullable.cjs

/**
 * Make users.password nullable to support OAuth signups
 * (OAuth users don't have passwords)
 */
exports.up = function (pgm) {
  // Remove NOT NULL from users.password
  pgm.alterColumn("users", "password", {
    notNull: false,
  });
};

exports.down = function (pgm) {
  // Revert: set password back to NOT NULL
  // ⚠️ Only safe if no rows have NULL password
  pgm.alterColumn("users", "password", {
    notNull: true,
  });
};