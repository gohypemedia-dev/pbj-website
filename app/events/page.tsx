import { redirect } from "next/navigation";

// Standalone Events landing page moved to /media#events per client requirements.
// Source content preserved in EventsPageContent.tsx and integrated in app/media/page.tsx.
export default function EventsPage() {
  redirect("/media#events");
}
