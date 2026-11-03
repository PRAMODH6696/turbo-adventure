# SauceDemo E-Commerce Automation Framework
![Playwright Tests](https://github.com/PRAMODH6696/turbo-adventure/actions/workflows/playwright.yml/badge.svg)
## Project Overview

This project is a web UI automation framework developed using JavaScript and Playwright to test the SauceDemo e-commerce application.

The framework follows Page Object Model (POM), reusable fixtures, and data-driven testing principles.

## Technology Stack

- JavaScript
- Playwright
- Node.js
- Page Object Model (POM)
- JSON Test Data
- GitHub Actions (CI/CD)
- Git and GitHub

## Application Under Test

https://www.saucedemo.com/

## Test Modules

| Module | Test Coverage |
|---|---|
| Login | Valid and invalid login |
| Products | Product listing, count and sorting |
| Cart | Add, remove and verify products |
| Checkout | Customer details and order calculations |
| Order | Order confirmation |
| E2E | Complete purchase journey |

## Framework Architecture

- `tests/` – Playwright test specifications
- `pages/` – Page Object Model classes
- `fixtures/` – Custom Playwright fixtures
- `test-data/` – JSON test data
- `utils/` – Reusable helper functions
- `.github/workflows/` – GitHub Actions CI workflow

## Execution Commands

Install dependencies:

```bash
npm ci
```

Install browsers:

```bash
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Run Chromium tests:

```bash
npx playwright test --project=chromium
```

Run smoke tests:

```bash
npx playwright test --grep "@smoke"
```

Run regression tests:

```bash
npx playwright test --grep "@regression"
```

View HTML report:

```bash
npx playwright show-report


## CI/CD Integration

GitHub Actions automatically executes the Playwright test suite when code is pushed to the main branch or a pull request is created.

The workflow installs dependencies, installs browsers, executes tests, and uploads test reports as artifacts.

## Repository

https://github.com/PRAMODH6696/turbo-adventure