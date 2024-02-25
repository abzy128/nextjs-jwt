import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = () => {
    const spec = createSwaggerSpec({
        apiFolder: 'app/api/',
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'API Docs',
                version: '1.0.0',
            },
        }
    })
    return spec;
}