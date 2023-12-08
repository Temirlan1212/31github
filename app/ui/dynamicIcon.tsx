import * as Unicons from "@iconscout/react-unicons";

export default function DynamicIcon({ name, className = "" }: { name: string; className?: string }) {
  const Icon = Unicons[name as keyof typeof Unicons] as Unicons.SvgIconComponent | null;
  return <>{Icon && <Icon className={className} />}</>;
}
