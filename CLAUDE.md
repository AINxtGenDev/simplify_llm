# Project Context

## Developer Profile
Senior Full Stack Developer with extensive security expertise

## Technical Stack & Expertise

### Frontend
- React, Vue.js, Angular
- TypeScript/JavaScript ES6+
- Responsive design, CSS3/SASS
- State management (Redux, Vuex, MobX)
- Security: XSS prevention, CSP implementation, secure authentication flows

### Backend
- Node.js, Python (Django/FastAPI/Flask), Java (Spring Boot)
- RESTful APIs, GraphQL, WebSockets
- Microservices architecture
- Database design (PostgreSQL, MongoDB, Redis)
- Security: Input validation, SQL injection prevention, secure API design

### Flask Expertise
- Flask core framework and blueprints architecture
- Flask-SocketIO for real-time bidirectional communication
- Flask-Limiter for rate limiting and DDoS protection
- Flask-Login for session management
- Flask-JWT-Extended for JWT authentication
- Flask-CORS for secure cross-origin resource sharing
- Flask-SQLAlchemy with secure ORM practices
- Flask-Migrate for database migrations
- Flask-WTF for CSRF protection and form validation
- Flask-Security for comprehensive security features
- Flask-Talisman for security headers
- Flask-Session for secure server-side sessions
- Flask-RESTful for API development
- Flask-Caching with security considerations
- Custom middleware for security enforcement

### DevOps & Infrastructure
- Docker, Kubernetes
- CI/CD pipelines (Jenkins, GitLab CI, GitHub Actions)
- AWS/Azure/GCP cloud services
- Infrastructure as Code (Terraform, CloudFormation)
- Security: Container security, secrets management, network security

### Security Expertise
- OWASP Top 10 mitigation strategies
- Secure coding practices
- Authentication & Authorization (OAuth2, JWT, SAML)
- Encryption and cryptography implementation
- Security auditing and penetration testing
- Compliance (GDPR, SOC2, HIPAA)
- Zero-trust architecture principles
- Security monitoring and incident response

## Development Preferences

### Code Quality
- Clean, maintainable code following SOLID principles
- Comprehensive error handling
- Security-first approach in all implementations
- Performance optimization
- Thorough documentation

### Testing
- Unit testing (Jest, PyTest, JUnit)
- Integration testing
- End-to-end testing (Cypress, Selenium)
- Security testing and vulnerability scanning
- Load testing and performance benchmarking

### Best Practices
- Code reviews with security focus
- Dependency scanning and management
- Regular security updates
- Threat modeling for new features
- Secure by design architecture

## Project Guidelines

When working on this project:
1. Always validate and sanitize user inputs
2. Implement proper authentication and authorization
3. Use environment variables for sensitive configuration
4. Follow the principle of least privilege
5. Implement comprehensive logging and monitoring
6. Use prepared statements for database queries
7. Encrypt sensitive data at rest and in transit
8. Regularly update dependencies for security patches
9. Implement rate limiting and DDoS protection
10. Follow secure session management practices

## Commands & Scripts

```bash
# Common development commands
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run test suite
npm run lint         # Run linting
npm run security     # Run security audit

# Security checks
npm audit            # Check for vulnerabilities
npm audit fix        # Auto-fix vulnerabilities

# Flask development commands
flask run            # Start Flask development server
flask db migrate     # Create database migration
flask db upgrade     # Apply database migrations
flask test           # Run Flask test suite
flask shell          # Interactive Flask shell

# Python security checks
pip-audit            # Check Python dependencies for vulnerabilities
bandit -r .          # Security linting for Python code
safety check         # Check for known security vulnerabilities
```

## Architecture Decisions

- API Gateway pattern for microservices
- JWT tokens with refresh token rotation
- Database encryption for sensitive fields
- Centralized logging with security monitoring
- Blue-green deployment strategy
- Web Application Firewall (WAF) implementation
- Regular automated security scans in CI/CD pipeline

### Flask-Specific Architecture

- Blueprint-based modular architecture
- Flask-SocketIO with Redis for scalable WebSocket connections
- Flask-Limiter with Redis backend for distributed rate limiting
- Gunicorn with gevent workers for production deployment
- Nginx reverse proxy with security headers
- Flask application factory pattern for testing
- Custom decorators for role-based access control
- Secure session storage with Flask-Session and Redis
- Background tasks with Celery and Redis broker
- API versioning through blueprints
- Request validation middleware
- Custom error handlers for security

## Security Checklist

Before deploying any feature:
- [ ] Input validation implemented
- [ ] Authentication/authorization verified
- [ ] Security headers configured
- [ ] Sensitive data encrypted
- [ ] Error messages sanitized
- [ ] Dependencies updated
- [ ] Security tests passing
- [ ] Code review completed
- [ ] Threat model updated
- [ ] Documentation updated