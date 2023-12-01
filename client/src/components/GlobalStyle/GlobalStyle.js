import { Helmet } from "react-helmet";
import "./GlobalStyle.scss";
import images from "~/assets/images";

function GlobalStyle({ children }) {
  return (
    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <title>PawsAndWhiskers</title>
        <link rel="canonical" href={images.logo} />
      </Helmet>
      {children}
    </div>
  );
}

export default GlobalStyle;
