import { z, ZodSchema } from 'zod';

/**
 * Utility for validating API responses with Zod
 * Provides type-safe API response handling
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Validate API response against a schema
 * @param data - The data to validate
 * @param schema - Zod schema to validate against
 * @returns Validated data or throws validation error
 */
export function validateApiResponse<T>(
  data: unknown,
  schema: ZodSchema
): T {
  try {
    return schema.parse(data) as T;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedError = error.errors
        .map(e => `${e.path.join('.')}: ${e.message}`)
        .join('; ');
      throw new Error(`Validation error: ${formattedError}`);
    }
    throw error;
  }
}

/**
 * Create a safe API response handler
 */
export function createApiResponseHandler<T>(schema: ZodSchema) {
  return (data: unknown): T => validateApiResponse<T>(data, schema);
}

// Example schemas for common response types
export const paginatedResponseSchema = z.object({
  data: z.array(z.any()),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export const errorResponseSchema = z.object({
  success: z.boolean().default(false),
  error: z.string(),
  message: z.string().optional(),
});

export const successResponseSchema = z.object({
  success: z.boolean().default(true),
  data: z.any().optional(),
  message: z.string().optional(),
});
