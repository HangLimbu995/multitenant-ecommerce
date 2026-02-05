import type { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
    slug: "reviews",
    //   access: {
    //     create: () => false,
    //     update: () => false,
    //   },
    admin: {
        useAsTitle: 'name'
    },
    fields: [
        {
            name: "description",
            type: "textarea",
            required: true
        },
        {
            name: "rating",
            type: "number",
            required: true,
            min: 1,
            max: 5
        },
 
        {
            name: "parent",
            type: "relationship",
            relationTo: "categories",
            hasMany: false,
        },
        {
            name: "subcategories",
            type: "join",
            collection: "categories",
            on: "parent",
            hasMany: true,
        },
    ],
};
