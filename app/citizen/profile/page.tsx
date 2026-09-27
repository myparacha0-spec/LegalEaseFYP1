import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileForm } from "@/components/citizen/profile-form";
import { getProfile } from "./actions";

export const metadata: Metadata = {
  title: "Profile & settings",
  description: "View and update your LegalEase citizen profile.",
};

export default async function CitizenProfilePage() {
  const profile = await getProfile();

  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-3xl">
            <Badge className="border-teal/30 bg-teal-soft text-teal">
              Citizen
            </Badge>
            <h1 className="mt-5 font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              Profile &amp; settings
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Keep your name, phone, CNIC, and address up to date so we can
              pre-fill citizen services for you.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        {profile ? (
          <ProfileForm profile={profile} />
        ) : (
          <Card className="mx-auto max-w-2xl bg-white">
            <CardContent className="p-6">
              <p className="font-heading text-lg font-bold text-navy">
                Sign in to view your profile
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                We could not load a profile for the current session. Log in as a
                citizen and try again.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </>
  );
}
