import { connection } from "next/server";
import EditStudioClient from "./EditStudioClient";
import { getStudioById } from "@/data/studios";

// Fully dynamic (per-request): studio data + the session-aware client form
// can't exist in a static shell for an unknown id.
export const instant = false;

export const metadata = {
  title: "Edit Studio — StudioSpace",
};

export default async function EditStudioPage({ params }) {
  const { id } = await params;
  await connection();
  const studio = await getStudioById(id);

  return (
    <EditStudioClient
      studioId={id}
      initialStudio={
        studio
          ? {
              ...studio,
              // Form field aliases (server model → form model).
              image: studio.image,
              imageUrl: studio.image,
            }
          : null
      }
    />
  );
}
