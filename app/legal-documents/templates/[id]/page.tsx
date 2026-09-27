"use server";

import { notFound } from "next/navigation";
import { legalDocumentTemplates } from "@/lib/legal-documents/templates";
import TemplateFlow from "@/components/legal-documents/template-flow";

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const template = legalDocumentTemplates.find((t) => t.id === id);

  if (!template) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Template not found</h1>
        <a href="/legal-documents/templates" className="text-blue-600 underline">
          Back to templates
        </a>
      </div>
    );
  }

  return <TemplateFlow template={template} />;
}