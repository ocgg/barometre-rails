# Agent Instructions for Barometre Rails

## Build/Lint/Test Commands

- **Development server**: `dev` (runs web server + Tailwind watcher)
- **Tests**: `bin/rails test` (single test: `bin/rails test test/models/user_test.rb:27`)
- **Lint**: `bundle exec rubocop` (auto-fix: `bundle exec rubocop -a`)
- **Database setup**: `rails db:create db:migrate db:seed`
- **Install deps**: `bundle install`

## Code Style Guidelines

### Ruby/Rails
- Follow Rails Omakase style (rubocop-rails-omakase)
- Use endless methods: `def method = value`
- Modern Ruby syntax preferred
- Standard Rails naming conventions
- Pundit for authorization
- Use `before_action` callbacks appropriately

### Frontend
- **HTML**: Slim templates (not ERB)
- **CSS**: Tailwind CSS classes
- **JS**: Stimulus controllers + Turbo (no React/Vue)
- Import maps for JavaScript dependencies

### Patterns
- Controller actions use `respond_to` for different formats
- Models use scopes for complex queries
- Turbo streams for dynamic updates
- Policy classes for authorization

### Error Handling
- Standard Rails validation errors
- Use `render status: :unprocessable_content` for form errors
- Flash messages for user feedback

### File Structure
- Keep controllers focused and thin
- Business logic in models/services
- Views use partials for reusability
- Tests mirror app structure