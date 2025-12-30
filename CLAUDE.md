# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application with Supabase backend integration. The project uses TypeScript, Tailwind CSS v4, TanStack React Query for data fetching, and Radix UI for component primitives.

## Development Commands

### Running the Application
```bash
npm run dev          # Start development server at http://localhost:3000
npm run build        # Build production bundle
npm run start        # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint
```

### Database Types
```bash
npm run generate-types    # Generate TypeScript types from Supabase schema
                         # Outputs to types_db.ts
```

## Architecture

### Supabase Client Architecture

The project implements a dual-client pattern for Supabase:

1. **Server-Side Client** ([utils/supabase/server.ts](utils/supabase/server.ts))
   - `createServerSupabaseClient()` - Regular authenticated client
   - `createServerSupabaseAdminClient()` - Admin client with elevated privileges
   - Uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for regular client
   - Uses `NEXT_SUPABASE_SERVICE_ROLE` for admin operations
   - Must be called with `await` as it's an async function

2. **Client-Side Client** ([utils/supabase/client.ts](utils/supabase/client.ts))
   - `createBrowserSupabaseClient()` - Browser client
   - Uses only public environment variables

3. **Middleware** ([app/middleware.ts](app/middleware.ts))
   - Refreshes Supabase auth tokens on every request
   - Applies to all routes except static assets, images, and Next.js internals
   - Critical for maintaining user sessions

### React Query Setup

The application wraps all client components with `QueryClientProvider` from [config/QueryClientProvider.tsx](config/QueryClientProvider.tsx). This is configured in the root layout.

### TypeScript Configuration

- **Path Aliases**: `@/*` maps to `./*` (project root)
- **Strict Mode**: Disabled (`strict: false`, `noImplicitAny: false`)
- **Module Resolution**: Uses `bundler` mode

### Database Types

Database types are auto-generated in `types_db.ts` from the Supabase schema. The `Database` type is used to type the Supabase client:
```typescript
createServerClient<Database>(...)
```

Current schema includes a `todo` table with fields: id, title, completed, created_at, updated_at.

## Environment Variables

Required environment variables (see `.env`):
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous/public key
- `NEXT_SUPABASE_SERVICE_ROLE` - Supabase service role key (for admin operations)
- `NEXT_SUPABASE_DB_PASSWORD` - Database password

## Directory Structure

```
app/                    # Next.js App Router
  layout.tsx           # Root layout with QueryClientProvider
  page.tsx             # Home page
  middleware.ts        # Supabase auth middleware
components/            # React components
  ui/                  # UI components (future)
config/                # Application configuration
  QueryClientProvider.tsx
utils/                 # Utility functions
  supabase/
    client.ts          # Browser Supabase client
    server.ts          # Server Supabase client
types_db.ts           # Auto-generated Supabase types
```

## Key Patterns

### Using Supabase in Server Components
```typescript
import { createServerSupabaseClient } from "@/utils/supabase/server";

const supabase = await createServerSupabaseClient();
const { data } = await supabase.from('todo').select('*');
```

### Using Supabase in Client Components
```typescript
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

const supabase = createBrowserSupabaseClient();
const { data } = await supabase.from('todo').select('*');
```

### Admin Operations
```typescript
import { createServerSupabaseAdminClient } from "@/utils/supabase/server";

const supabase = await createServerSupabaseAdminClient();
// Perform admin operations
```

## Important Notes

- Always regenerate database types after Supabase schema changes
- The middleware automatically refreshes auth tokens, so manual session management is typically unnecessary
- Server components can access Supabase directly; client components should use React Query for data fetching
- Admin client should only be used in server-side code and for operations requiring elevated privileges
