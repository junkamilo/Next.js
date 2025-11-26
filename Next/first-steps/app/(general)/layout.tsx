import { Navar } from "@/components";

export default function GeneralLayout({children,}: Readonly<{children: React.ReactNode;
}>) {
  return (
    <>
      <Navar/>
      <h1>Hello root Layout About</h1>
      {children}
    </>
  );
}