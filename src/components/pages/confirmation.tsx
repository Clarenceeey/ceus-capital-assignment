import { Button } from "../ui/button";

export default function ConfirmationPage({
  resubmitForm,
}: {
  resubmitForm: () => void;
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-around">
      <p className="pb-5 text-center text-4xl">Form submitted successfully!</p>
      <div className="flex w-full justify-center">
        <Button type="submit" className="p-6 text-lg" onClick={resubmitForm}>
          Submit another form
        </Button>
      </div>
    </div>
  );
}
