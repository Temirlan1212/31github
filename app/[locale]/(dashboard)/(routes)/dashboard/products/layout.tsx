export default async function Layout({ children }: { children: React.ReactNode }) {
  return <div className="p-5 md:p-10">{children}</div>;
}
