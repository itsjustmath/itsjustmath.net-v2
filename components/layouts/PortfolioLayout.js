import { useEffect, useState, useRef } from "react";

import Header from "../Header";
import Footer from "../Footer";
// import Portfolio from "../templates/Portfolio";

const debug = false;

const portfolioData = [
  {
    title: "Stamps.com",
    alignment: "left",
    img: "https://i.imgur.com/DGZGv6S.png",
    panelColor: "blue",
    children: null,
  },
  {
    title: "FIJI Water",
    alignment: "right",
    img: "https://i.imgur.com/2rUsyL8.jpg",
    panelColor: "teal",
    children: null,
  },
  {
    title: "Every Man Jack",
    alignment: "left",
    img: "https://i.imgur.com/xUwNzqC.png",
    panelColor: "tan",
    children: null,
  },
  {
    title: "HumanN",
    alignment: "right",
    img: "https://i.imgur.com/Muf8TIa.jpg",
    panelColor: "red",
    children: null,
  },
  {
    title: "Sun Bum",
    alignment: "left",
    img: "https://i.imgur.com/GNiIyaA.jpg",
    panelColor: "yellow",
    children: null,
  },
  {
    title: "NHS",
    alignment: "right",
    img: "https://i.imgur.com/R1uDfBz.png",
    panelColor: "gray",
    children: null,
  },
  {
    title: "Safe + Fair",
    alignment: "left",
    img: "https://i.imgur.com/GB0OyMq.png",
    panelColor: "orange",
    children: null,
  },
  {
    title: "Outerknown",
    alignment: "right",
    img: "https://i.imgur.com/LnzrvaO.jpg",
    panelColor: "aqua",
    children: null,
  },
  {
    title: "San Antonio Museum of Art",
    alignment: "left",
    img: "https://i.imgur.com/GevdOOd.jpg",
    panelColor: "navy",
    children: null,
  },
  {
    title: "Radpad",
    alignment: "right",
    img: "https://i.imgur.com/GevdOOd.jpg",
    panelColor: "yellow",
    children: null,
  },
];

export default function PortfolioLayout({ children }) {
  // STATE
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollPositionBuffered, setScrollPositionBuffered] = useState(0);
  const [portfolioLayoutClassName, setPortfolioLayoutClassName] =
    useState("white");
  const panelEls = useRef([]);
  const portfolioWrapper = useRef(null);
  const [panelSpecs, setPanelSpecs] = useState([]);

  // VARS
  const windowHeight = typeof window !== "undefined" && window.innerHeight;

  // UTILS
  const createPanelSpecsArr = (arr) => {
    let panelSpecsArr = [];
    // console.log("panelSpecsArr(before): ", panelSpecsArr);

    arr.forEach((panel, i) => {
      const panelColor = panel.attributes.panelcolor.value;
      const panelDistanceFromTop =
        (typeof window !== "undefined" && window.pageYOffset) +
        panel.getBoundingClientRect().top;
      const panelHeight = panel.offsetHeight;

      if (debug) {
        console.group(panel.innerText);
        console.log("panelColor: ", panelColor);
        console.log("distance from top: ", panelDistanceFromTop);
        console.groupEnd();
      }

      // console.log(i);

      panelSpecsArr.push({
        panelColor,
        panelDistanceFromTop,
        panelDistanceFromTopBuffered: panelDistanceFromTop + windowHeight / 3,
        panelHeight,
      });

      // console.log(
      //   panelDistanceFromTop <= scrollPositionBuffered &&
      //     panelDistanceFromTop + panelHeight > scrollPositionBuffered
      // );

      // if (panelDistanceFromTop <= scrollPositionBuffered) {
      //   setPortfolioLayoutClassName(panelColor);
      // }
    });

    // console.log("panelSpecsArr(after): ", panelSpecsArr);

    return panelSpecsArr;
  };

  // HANDLERS
  const handleScroll = () => {
    const position = typeof window !== "undefined" && window.pageYOffset;
    // setScrollPosition(position);
    setScrollPositionBuffered(position + windowHeight / 3);
  };

  // DEBUG / LOGS
  if (debug) {
    console.log("portfolioData", portfolioData);
    // console.log(`window height: ${windowHeight}`);
    // console.log(`scroll position: ${scrollPosition}`);
    console.log(`scroll position (buffered): ${scrollPositionBuffered}`);

    useEffect(() => {
      console.log("panelEls", panelEls);
    }, [panelEls]);

    useEffect(() => {
      console.log(portfolioLayoutClassName);
    }, [portfolioLayoutClassName]);

    useEffect(() => {
      console.log("panelSpecs: ", panelSpecs);
    }, [panelSpecs]);
  }

  // SIDE EFFECTS
  // REVIEW: is this the performant way to do this? (memoize?), to avoid re-render
  // NOTE: I probably need to recalculate on page resize
  // useEffect(() => {
  //   setScrollPositionBuffered(scrollPosition + windowHeight / 3);
  // }, [scrollPosition]);

  useEffect(() => {
    const panelsRefsArr = panelEls.current;
    // console.log("panelEls.current", panelsRefsArr);
    setPanelSpecs(createPanelSpecsArr(panelsRefsArr));

    // Scroll Listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // console.log(scrollPositionBuffered);
    panelSpecs.forEach((panel) => {
      if (
        panel.panelDistanceFromTop <= scrollPositionBuffered &&
        panel.panelDistanceFromTop + panel.panelHeight > scrollPositionBuffered
      ) {
        setPortfolioLayoutClassName(panel.panelColor);
      }
    });
  }, [scrollPositionBuffered]);

  // COMPONENTS
  const Panel = ({
    alignment,
    title,
    img,
    panelColor,
    children,
    classNames,
    index,
  }) => {
    return (
      <div
        className={`panel ${alignment ? alignment : ""} ${
          classNames ? classNames : ""
        }`}
        panelcolor={panelColor}
        ref={(panelEl) => {
          panelEls.current[index] = panelEl;
        }}
        key={index}
      >
        {!!title && !!img && (
          <div className="inner">
            <div className="copy">
              <h2 className="font-black">
                <a href="#">{title}</a>
              </h2>
            </div>
            <a href="#" className="media">
              <div className="image">
                <picture>
                  <img src={img} />
                </picture>
              </div>
            </a>
          </div>
        )}

        {!!children && children}
      </div>
    );
  };

  // RENDER
  return (
    <div
      ref={portfolioWrapper}
      className={`portfolio-layout color-${portfolioLayoutClassName}`}
    >
      <Panel panelColor="white" index={0} key={0}>
        <div className="container">
          <Header />
          <article className="group">{children}</article>
          <Footer />
        </div>
        {/* <div className="scroll-cta sans-serif">Scroll</div> */}
        <div className="scroll-cta sans-serif">Portfolio</div>
      </Panel>

      <>
        {portfolioData.map((item, i) => {
          return (
            <Panel
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
