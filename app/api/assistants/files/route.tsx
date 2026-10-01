import { openai } from "@/app/openai";
import { getVectorStoreId } from "@/app/vector-store";

// upload file to the knowledge-base vector store
export async function POST(request) {
  const formData = await request.formData(); // process file as FormData
  const file = formData.get("file"); // retrieve the single file from FormData
  const vectorStoreId = await getVectorStoreId();

  // upload using the file stream
  const openaiFile = await openai.files.create({
    file: file,
    purpose: "assistants",
  });

  // add file to vector store
  await openai.vectorStores.files.create(vectorStoreId, {
    file_id: openaiFile.id,
  });
  return new Response();
}

// list files in the knowledge-base vector store
export async function GET() {
  const vectorStoreId = await getVectorStoreId();
  const fileList = await openai.vectorStores.files.list(vectorStoreId);

  const filesArray = await Promise.all(
    fileList.data.map(async (file) => {
      const fileDetails = await openai.files.retrieve(file.id);
      const vectorFileDetails = await openai.vectorStores.files.retrieve(
        file.id,
        { vector_store_id: vectorStoreId }
      );
      return {
        file_id: file.id,
        filename: fileDetails.filename,
        status: vectorFileDetails.status,
      };
    })
  );
  return Response.json(filesArray);
}

// // delete file from the knowledge-base vector store
// export async function DELETE(request) {
//   const body = await request.json();
//   const fileId = body.fileId;

//   const vectorStoreId = await getVectorStoreId();
//   await openai.vectorStores.files.delete(fileId, { vector_store_id: vectorStoreId }); // delete file from vector store

//   return new Response();
// }
