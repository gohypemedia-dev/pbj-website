import { redirect } from "next/navigation";

// Standalone Exhibitions page moved to /media#events per client requirements.
// Source content preserved in ExhibitionsPageContent.tsx and integrated in app/media/page.tsx.
export default function ExhibitionsPage() {
  redirect("/media#events");
}
