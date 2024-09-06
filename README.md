# Full-stack Notion Clone

This is a full-stack Notion clone built with Next.js, React, TypeScript, Tailwind CSS, ESLint, and Prettier. It includes a landing page, an editor page, and a rename page. The landing page is a static page generated at build time. The editor page is a server-side rendered page generated at request time. The rename page is a client-side rendered page generated at runtime. The project also includes an API route that returns a JSON response.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Preview](#preview)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun run dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Inter, a custom Google Font.

## Features

- Clean, minimal, and responsive design.
- Super fast & Real-time updates/changes.
- Notion-like editor.
- Light and dark mode.
- Infinite children documents.
- Trash & soft delete. (Restore & delete permanently)
- File upload/replace & delete.
- Shareable link.

#### Codebase includes:

- Next.js: The React Framework for Production.
- TypeScript: Typed JavaScript at Any Scale.
- ESLint: Find and fix problems in your JavaScript code.
- Prettier: An opinionated code formatter.
- Tailwind CSS: Rapidly build modern websites without ever leaving your HTML.
- API Routes: Build your API with Next.js API routes.
- Static Generation: Generate static pages at build time.
- Server-side Rendering: Render pages on the server at request time.
- Dynamic Routing: Create dynamic routes with Next.js.
- Image Optimization: Automatically optimize images used in your project.
- Font Optimization: Automatically optimize and load Inter, a custom Google Font.

## Preview

![Preview Image 1](https://raw.githubusercontent.com/ProMehedi/notion-clone/master/public/landing.png)
![Preview Image 2](https://raw.githubusercontent.com/ProMehedi/notion-clone/master/public/editor.png)
![Preview Image 3](https://raw.githubusercontent.com/ProMehedi/notion-clone/master/public/rename.png)
![Preview Image 4](https://raw.githubusercontent.com/ProMehedi/notion-clone/master/public/sharable.png)

## Folder Structure

```
.
├── app/
│   ├── (landing)/
│   ├───|── (_components)/
│   ├── (main)/
│   ├───|── (_components)/
│   ├───|── documents/
│   ├───|── settings/
│   ├── (public)/
│   ├───|── preview/
│   ├── api/
├── components/
├── convex/
├── hooks/
├── lib/
├── providers/
├── public/
├── /package.json
└── /tsconfig.json
```

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- ShadCN
- Convex
- Edgestore
- ESLint
- Prettier

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
