"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export interface TemplateFlowProps {
  template: {
    id: string;
    title: string;
    description: string;
    fields: string[];
    body: string;
  };
  prefillValues?: Record<string, string>;
}

export default function TemplateFlow({ template, prefillValues }: TemplateFlowProps) {
  const initialForm: Record<string, string> = {};
  template.fields.forEach((field) => {
    initialForm[field] = prefillValues?.[field] ?? "";
  });

  const [form, setForm] = useState<Record<string, string>>(initialForm);
  const [generated, setGenerated] = useState<string | null>(null);

  const allFilled = Object.values(form).every((val) => val.trim() !== "");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const generateDocument = () => {
    let result = template.body;
    Object.entries(form).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      result = result.split(placeholder).join(value);
    });
    setGenerated(result);
  };

  const downloadTxt = () => {
    if (!generated) return;
    const blob = new Blob([generated], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const filename = template.id.replace(/_/g, "-").toLowerCase() + ".txt";
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (generated) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{template.title}</h1>
        <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded mb-4">{generated}</pre>
        <div className="flex gap-2 mb-4">
          <Button onClick={downloadTxt}>Download .txt</Button>
          <Button variant="outline" onClick={() => setGenerated(null)}>
            Back / Edit
          </Button>
        </div>
        <Link href="/legal-documents/templates" className="text-blue-600 underline">
          Back to all templates
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{template.title}</h1>
      <p className="mb-4 text-muted-foreground">{template.description}</p>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          generateDocument();
        }}
      >
        {template.fields.map((field) => (
          <div key={field} className="space-y-1">
            <Label htmlFor={field}>{field.replace(/_/g, " ")}</Label>
            <Input
              id={field}
              value={form[field] ?? ""}
              onChange={(e) => handleChange(field, e.target.value)}
              required
            />
          </div>
        ))}
        <Button type="submit" disabled={!allFilled}>
          Generate
        </Button>
      </form>
    </div>
  );
}
