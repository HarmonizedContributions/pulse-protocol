# Pulse Protocol

Pulse Protocol is a modern Next.js web application developed by **Harmonized Contributions** to power the Pulse Protocol website. It leverages **Next.js 15+**, **React**, **TypeScript**, and **Tailwind CSS** to deliver a fast, accessible and SEO‑friendly experience.

## Features

- ⚡️ **Built with Next.js 15+** using the App Router.
- 🎨 Styled with **Tailwind CSS** for responsive design.
- ✅ **TypeScript** support for type safety and a better developer experience.
- 🛠 **Pre‑configured testing** (Vitest & Testing Library) and linting (ESLint & Prettier).
- 🌐 **Internationalization** (i18n) ready.
- 🗄 **Database integration** via **Drizzle ORM**, ready for SQLite in development and PostgreSQL or MySQL in production.
- 🔄 **CI/CD configuration** using GitHub Actions and Lefthook for pre‑commit checks.
- 🚀 **Ready for deployment** on Netlify, Vercel or any other platform.

## Getting Started

### Prerequisites

- **Node.js 18** or later.
- **pnpm** (preferred), **yarn** or **npm** package manager.

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/HarmonizedContributions/pulse-protocol.git
cd pulse-protocol
pnpm install
```

Create a `.env` file by copying `.env.example` and filling in the required environment variables.

### Running Locally

To start the development server run:

```bash
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to view the app. The page will reload as you edit the code.

### Building for Production

To create an optimized production build run:

```bash
pnpm build
```

This will generate a `.next` folder containing the compiled code. You can preview the production build locally with:

```bash
pnpm start
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to suggest features or bug fixes. Please follow conventional commit messages and ensure all tests pass before submitting your PR.

## License

This project is open‑source and available under the [MIT License](LICENSE).
