import "./Party.scss"
import AboutParty from "./components/about-party/AboutParty.tsx";

const Party = () => {
  return (
    <form className="form">
      <div className="container">
        <AboutParty/>
      </div>
    </form>
);
};

export default Party;