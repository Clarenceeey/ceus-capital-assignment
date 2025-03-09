"use client";
import { useState } from "react";
import ContactForm from "~/components/pages/form";
import ConfirmationPage from "~/components/pages/confirmation";

export default function HomePage() {
  const [submittedForm, setSubmittedForm] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {submittedForm ? (
        <ConfirmationPage resubmitForm={() => setSubmittedForm(false)} />
      ) : (
        <ContactForm submitForm={() => setSubmittedForm(true)} />
      )}
    </main>
  );
}
