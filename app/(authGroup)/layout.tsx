

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
  );
}
