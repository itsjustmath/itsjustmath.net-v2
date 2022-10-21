import { useEffect, useState, useRef, useMemo } from "react";

import { portfolioData } from "../../data/PortfolioData";
import Header from "../Header";
import Footer from "../Footer";
import PortfolioPanel from "../portfolio/PortfolioPanel";
// import Portfolio from "../templates/Portfolio";

export default function PortfolioLayout({ children }) {
  const [portfolioLayoutClassName, setPortfolioLayoutClassName] = useState("");
  const { current: observer } = useRef(null);
  const portfolioLayoutRoot = useRef(null);

  const initObserver = () => {
    // const scrollRoot = portfolioLayoutRoot;
    const scrollRoot = document.documentElement;
    let prevScrollTop = 0;
    // setPortfolioLayoutClassName("white");

    // Disconnect observer if it exists
    observer && observer.disconnect();

    // Intersection handler
    const onIntersect = (entries, observer) => {
      let direction;

      if (scrollRoot.scrollTop > prevScrollTop) {
        direction = "down";
      } else {
        direction = "up";
      }
      prevScrollTop = scrollRoot.scrollTop;

      const entry =
        direction === "up" ? entries[0] : entries[entries.length - 1];
      const panelColor = entry.target.attributes.panelcolor.value;

      if (entry.isIntersecting) {
        setPortfolioLayoutClassName(panelColor);
      }
    };

    observer = new IntersectionObserver(onIntersect, {
      threshold: 0,
      rootMargin: "-1% 0px -75% 0px",
    });

    const panelNodes = document.querySelectorAll("[panelcolor]");

    panelNodes.forEach((node) => {
      observer.observe(node);
    });
  };

  useEffect(() => {
    initObserver();

    return () => {
      observer && observer.disconnect();
    };
  });

  // RENDER
  return (
    <div
      data-portfolio-root
      ref={portfolioLayoutRoot}
      className={`portfolio-layout color-${portfolioLayoutClassName}`}
      // onScroll={handleScroll}
    >
      <PortfolioPanel panelColor="white" index={0} key={0}>
        <div className="container">
          <Header />
          <article className="group">{children}</article>
          <Footer />
        </div>
        {/* <div className="scroll-cta sans-serif">Scroll</div> */}
        <div className="scroll-cta sans-serif">Portfolio</div>
      </PortfolioPanel>

      <>
        {portfolioData.map((item, i) => {
          return (
            <PortfolioPanel
              classNames={"panel--portfolio"}
              alignment={item.alignment}
              title={item.title}
              img={item.img}
              panelColor={item.panelColor}
              children={item.children}
              index={i + 1}
              key={i + 1}
            />
          );
        })}
      </>
    </div>
  );
}
