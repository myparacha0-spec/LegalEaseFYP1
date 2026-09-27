"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { legalDocumentTemplates, type LegalDocumentCategory } from "@/lib/legal-documents/templates";

const categoryLabels: Record<LegalDocumentCategory, string> = {
  fir: "FIR",
  legal_notice: "Legal notice",
  application: "Application",
};

export default function LegalDocumentTemplatesPage() {
  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-3xl">
            <Badge className="border-teal/30 bg-teal-soft text-teal">Legal documents</Badge>
            <h1 className="mt-5 font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              Document templates
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Browse draft templates for common filings. Generation from these templates will be added in a later step.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {legalDocumentTemplates.map((template) => (
            <Link key={template.id} href={`/legal-documents/templates/${template.id}`} className="block">
              <Card role="button" tabIndex={0} className="cursor-pointer bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy/5">
                <CardHeader>
                  <Badge variant="secondary">{categoryLabels[template.category]}</Badge>
                  <CardTitle className="font-heading text-navy">{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
