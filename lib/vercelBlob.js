export async function uploadToVercelBlob(file) {
  const token = process.env.BLOB_READ_WRITE_TOKEN || "vercel_blob_rw_f557H4hFJ23eiSZY_VztBcA9GBFhs0coRDnAH0R3N5fbzKS"
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch("https://blob.vercel-storage.com/api/blob", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!res.ok) throw new Error("Failed to upload image to Vercel Blob")
  const data = await res.json()
  return data.url // The uploaded image URL
}