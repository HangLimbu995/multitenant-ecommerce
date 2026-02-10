// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'

import { Users } from "./collections/Users.ts";
import { Media } from "./collections/Media.ts";
import { Categories } from "./collections/Categories.ts";
import { Products } from "./collections/Products.ts";
import { Tags } from "./collections/Tags.ts";
import { Tenants } from "./collections/Tenants.ts";
import type { Config } from "./payload-types.ts";
import { Orders } from "./collections/Orders.ts";
import { Reviews } from "./collections/Reviews.ts";
import { isSuperAdmin } from "./lib/access.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

if (!process.env.DATABASE_URI) {
  throw new Error('DATABASE_URI environment variable is required');
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeNavLinks: ["@/components/stripe-verify#StripeVerify"]
    }
  },
  collections: [Users,
    Media,
    Categories,
    Products, Tags,
    Tenants, Orders,
    Reviews,],
  editor: lexicalEditor(
    //   {
    //   features: ({ defaultFeatures }) => [
    //     ...defaultFeatures,
    //     UploadFeature({
    //       collections: {
    //         media: {
    //           fields: [
    //             {
    //               name: 'name',
    //               type: 'text',
    //             }
    //           ]
    //         }
    //       }
    //     })
    //   ]
    // }
  ),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    multiTenantPlugin<Config>({
      collections: {
        products: {},
      },
      tenantsArrayField: {
        includeDefaultField: false,
      },
      userHasAccessToAllTenants: (user) => isSuperAdmin(user)
    }),
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      }
    })
  ],
});
