This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



## Project Structure and Key Concepts

This project is a Next.js monorepo powered by [Payload CMS](https://payloadcms.com/) (as a headless backend) and [tRPC](https://trpc.io/) for type-safe API interactions. It is architected to support **multi-tenancy**, allowing you to host multiple tenants (clients or organizations) within a single application.

---

### 🔑 Main Components

#### **Payload CMS**
- **Backend/Data Layer**: Payload is used to manage your application's data, authentication, and admin UI.
- **Key Files:**
  - `src/payload.config.ts`: Main Payload configuration—collections, auth, plugins, and access control.
  - `src/collections/`: All your database models, e.g.:
    - `Categories.ts`
    - `Media.ts`
    - `Products.ts`
    - `Tags.ts`
    - `Tenants.ts` _(tenant schema/management)_
    - `Users.ts` _(user and permission structure)_
  - `src/payload-types.ts`: Auto-generated TypeScript types from Payload schemas, ensuring strong typing everywhere.
  - `src/app/(payload)/admin/`: Serves Payload's auto-generated admin UI.
  - `src/app/(payload)/api/`: REST, GraphQL, and playground endpoints for accessing your data.

##### **How it works**
1. **Schema Definitions**: Create collections (schemas) like `Tenants.ts` or `Products.ts`.
2. **Admin UI & APIs**: Payload generates an admin dashboard and exposes APIs for your content automatically.
3. **Access Control**: Define who can read/write/update each type of content at a granular level.

---

#### **tRPC**
- **API Layer**: Provides fully type-safe, end-to-end APIs between frontend and backend without needing to manually write API handlers or type definitions.
- **Key Files:**
  - `src/trpc/`
    - `_app.ts`: Combines routers from all modules into a root API router.
    - `client.tsx`: Initializes tRPC client for the frontend.
    - `init.ts`: Sets up tRPC context (e.g., gets current user or tenant).
    - `query-client.ts`: Integrates with [Tanstack React Query](https://tanstack.com/query/) for caching and data fetching.
    - `server.tsx`: Exports the tRPC server.
  - `src/app/api/trpc/[trpc]/route.ts`: Next.js catch-all API route—bridges frontend calls to tRPC routers.
  - `src/modules/*/server/procedures.ts`: All backend tRPC endpoints (logic for fetching and modifying data in each module).

##### **How it works**
1. **Define Routers & Procedures**: Write functions for data fetching/mutation in backend files (e.g. `src/modules/tenants/server/procedures.ts`).
2. **Combine Routers**: All module routers are merged in `_app.ts`.
3. **API Endpoint**: Requests from the Next.js frontend are routed to this combined API via `route.ts`.
4. **Full Type Safety**: Frontend code imports types directly from the backend—type errors are caught at build time.

---

#### **Multi-Tenant Architecture**

- **Key Tenancy Files:**
  - `src/collections/Tenants.ts`: Tenant schema—defines properties like name, domain, and any custom configs.
  - `src/modules/tenants/server/procedures.ts`: tRPC backend logic for managing tenants (create, update, fetch, auth).
  - `src/app/(tenants)/tenants/[slug]/`: Next.js route for tenant-specific pages. `[slug]` captures the tenant identifier from the URL.
      - `layout.tsx`: Injects tenant-specific UI/context.
      - `page.tsx`: Entry point for tenant-specific content.

##### **How tenancy works**
1. **Tenant creation:** Each tenant is a record in the `Tenants` collection.
2. **Routing:** URLs like `/tenants/mytenant/` render frontend for that tenant.
3. **Data Fetching:** The current tenant's slug is extracted from the URL and passed to tRPC procedures to query tenant-specific data.
4. **Isolation & Authorization:** 
   - Payload's access rules and tRPC procedures ensure users can only access resources that belong to their tenant.
   - Typically enforced by associating users with tenants in the `Users.ts` and `Tenants.ts` schemas.

---

#### **Typical Request Flow for Tenants**
1. **User visits a tenant-specific URL** (e.g., `/tenants/mytenant/`).
2. **Next.js extracts the tenant slug** and injects it into React context/layout.
3. **Frontend makes tRPC calls** to fetch data for that tenant.
4. **tRPC procedures** authorize and fetch the data using the current user and tenant context.
5. **Payload enforces schema-level restrictions** to prevent cross-tenant data leaks.
6. **The page renders**, showing tenant-specific information and UI.

---

## Need More Help?

This overview should make it easier to understand the project's multi-tenant structure, the role of Payload and tRPC, and how they work together. If you have specific questions about any part—data modeling, API design, tenancy, or access control—please ask!
