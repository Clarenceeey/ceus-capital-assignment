import Link from "next/link";
import ContactForm from "~/components/pages/form";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <ContactForm />
    </main>
  );
}
