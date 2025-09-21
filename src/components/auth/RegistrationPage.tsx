import { useEffect } from "react";
import { Building, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2n02tzF1Yti8ZiwVDhOjnvPpgCKayNZsuxr4vpRF8DY4TLA/viewform?usp=dialog";

export const RegistrationPage = () => {
  useEffect(() => {
    // Redirect users to the external Google Form for registration
    window.location.replace(GOOGLE_FORM_URL);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2069&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-md space-y-6 text-white">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Redirecting to registration…</h1>
          <p className="text-white/80">Please complete the Google Form to finish signing up.</p>
        </div>

        <Card className="backdrop-blur-md bg-white/90 text-black shadow-2xl border-white/20">
          <CardHeader>
            <CardTitle>Registration moved</CardTitle>
            <CardDescription>
              We now collect sign-up details via a secure Google Form. If you are not redirected automatically, use the button below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
              <Button className="w-full">
                Open Registration Form <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
