import Header from "../Header";
import Footer from "../Footer";

export default function DefaultLayout({ children }) {
  return (
    <div className="container">
      <Header />
      <article className="group">{children}</article>
      <Footer />
    </div>
  );
}
