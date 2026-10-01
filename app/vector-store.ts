import { openai } from "@/app/openai";

const VECTOR_STORE_NAME = "jude-clarke-knowledge-base";

// Resolve the vector store backing file_search. Prefer the pinned env var;
// fall back to finding/creating one by name so first boot still works.
export const getVectorStoreId = async (): Promise<string> => {
  if (process.env.OPENAI_VECTOR_STORE_ID) {
    return process.env.OPENAI_VECTOR_STORE_ID;
  }

  const stores = await openai.vectorStores.list();
  const existing = stores.data.find((s) => s.name === VECTOR_STORE_NAME);
  if (existing) return existing.id;

  const created = await openai.vectorStores.create({ name: VECTOR_STORE_NAME });
  console.warn(
    `Created vector store "${created.id}" — set OPENAI_VECTOR_STORE_ID to pin it.`
  );
  return created.id;
};
