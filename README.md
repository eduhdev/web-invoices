# Web Invoices

Web Invoices is a web-based invoicing system designed to create, edit, and manage invoices.
This application uses mocked data, is built using Next.js and is deployed on Vercel.

## Installation Instructions

To set up Web Invoices on your local environment, follow these steps:

1. Clone this repository to your local machine.

```bash 
git clone https://github.com/eduhdev/web-invoices.git
```

2. Navigate to the project directory.

```bash
cd web-invoices
```

3. Install the required dependencies:

```bash
npm run install 
# or
yarn install
# or
pnpm install
# or
bun install
```

4. Create a .env file in the root directory of the project.
5. Add the following environment variables to your .env file:

```bash
NEXTAUTH_URL=<Your_Application_URL> # By default, it's http://localhost:3000 during development.
NEXTAUTH_SECRET=<Unique_Key> # Generate a unique key using: openssl rand -base64 32
GITHUB_ID=<Your_GitHub_App_ID>
GITHUB_SECRET=<Your_GitHub_App_Secret>
```

- Replace <Your_Application_URL> with the appropriate URL for your application.
- Generate a unique key for NEXTAUTH_SECRET using the command provided.
- Follow the GitHub documentation mentioned in [this link](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authenticating-to-the-rest-api-with-an-oauth-app) to obtain your GitHub App ID and App Secret.
- Set the GitHub callback URL to <Your_Application_URL>/api/auth/callback/github.

6. After configuring the environment variables, you can start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

7. Your Web Invoices application should now be running locally at the specified URL.

## Libraries/Frameworks Used

Web Invoices is built using the following libraries and frameworks:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Shadcn UI](https://ui.shadcn.com/) (for stylized Radix UI components)
- [Lucide React](https://lucide.dev/guide/packages/lucide-react) (for icons)
