"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { updateProfile, type Profile } from "@/app/citizen/profile/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ProfileFormProps = {
  profile: Profile;
};

type ToastState = {
  type: "success" | "error";
  message: string;
};

export function ProfileForm({ profile }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const full_name = String(formData.get("full_name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const cnic = String(formData.get("cnic") ?? "").trim();
    const city = String(formData.get("city") ?? "").trim();
    const area = String(formData.get("area") ?? "").trim();

    if (!full_name || !phone || !cnic || !city || !area) {
      setToast({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    setLoading(true);
    setToast(null);

    try {
      const result = await updateProfile({
        full_name,
        phone,
        cnic,
        city,
        area,
      });

      if (result.success) {
        setToast({ type: "success", message: "Profile saved successfully." });
      } else {
        setToast({ type: "error", message: result.error });
      }
    } catch (error) {
      setToast({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to save profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="mx-auto max-w-2xl bg-white">
        <CardHeader>
          <CardTitle className="font-heading text-navy">
            Profile &amp; settings
          </CardTitle>
          <CardDescription>
            Update your contact details. These are used on citizen services and
            filings.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="full_name">Full name</Label>
              <Input
                id="full_name"
                name="full_name"
                defaultValue={profile.full_name ?? ""}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                defaultValue={profile.phone ?? ""}
                placeholder="03XX XXXXXXX"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cnic">CNIC</Label>
              <Input
                id="cnic"
                name="cnic"
                defaultValue={profile.cnic ?? ""}
                placeholder="XXXXX-XXXXXXX-X"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                defaultValue={profile.city ?? ""}
                placeholder="Karachi"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="area">Area</Label>
              <Input
                id="area"
                name="area"
                defaultValue={profile.area ?? ""}
                placeholder="Clifton"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="animate-spin" />}
              Save changes
            </Button>
          </CardFooter>
        </form>
      </Card>

      {toast ? (
        <div
          role="status"
          className={`fixed right-4 bottom-4 z-50 max-w-sm rounded-xl border px-4 py-3 text-sm shadow-lg ${
            toast.type === "success"
              ? "border-teal/30 bg-white text-navy"
              : "border-destructive/30 bg-white text-destructive"
          }`}
        >
          {toast.message}
        </div>
      ) : null}
    </>
  );
}
