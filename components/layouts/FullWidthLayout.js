import Header from "../Header";
import Footer from "../Footer";

export default function FullWidthLayout({ children }) {
  return (
    <div className="container full-width">
      <Header />
      <article>{children}</article>
      <Footer />
    </div>
  );
}
