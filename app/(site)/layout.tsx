import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function SiteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main className="relative z-[1]">{children}</main>
      <Footer className="relative z-[1]" />
    </>
  );
}
