import Header from "../Header";
import Footer from "../Footer";

export default function FullWidth({ children }) {
  return (
    <div className="container full-width">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
