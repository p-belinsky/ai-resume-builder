import { Suspense } from "react";
import { ResumeEditor } from "../../../../components/app/ResumeEditor";
import { EditorSkeleton } from "../../../../components/app/Skeletons";

export default function ResumePage({ params }: PageProps<"/resumes/[id]">) {
  return <Suspense fallback={<EditorSkeleton />}><ResumeRoute params={params} /></Suspense>;
}

async function ResumeRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ResumeEditor id={id} />;
}