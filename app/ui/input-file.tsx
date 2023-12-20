import { Input } from "@/app/ui/input";
import { Label } from "@/app/ui/label";

export function InputFile({ label = "" }: { label: string }) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {label ? <Label htmlFor="picture">{label}</Label> : null}
      <Input id="picture" type="file" />
    </div>
  );
}
