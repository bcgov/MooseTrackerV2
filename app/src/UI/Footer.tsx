import "./Footer.css";

export const Footer = (props: any) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text-container">
          <div id="footer-home" className="nav-item">
            <a
              href="https://www.gov.bc.ca/"
              target="_self"
              className="nav-link"
            >
              Home
            </a>
          </div>
          <div id="footer-about" className="nav-item">
            <a
              href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca"
              target="_self"
              className="nav-link"
            >
              About gov.bc.ca
            </a>
          </div>
          <div id="footer-disclaimer" className="nav-item">
            <a
              href="http://gov.bc.ca/disclaimer/"
              target="_self"
              className="nav-link"
            >
              Disclaimer
            </a>
          </div>
          <div id="footer-privacy" className="nav-item">
            <a
              href="http://gov.bc.ca/privacy/"
              target="_self"
              className="nav-link"
            >
              Privacy
            </a>
          </div>
          <div id="footer-accessibility" className="nav-item">
            <a
              href="http://gov.bc.ca/webaccessibility/"
              target="_self"
              className="nav-link"
            >
              Accessibility
            </a>
          </div>
          <div id="footer-copyright" className="nav-item">
            <a
              href="http://gov.bc.ca/copyright"
              target="_self"
              className="nav-link"
            >
              Copyright
            </a>
          </div>
          <div className="nav-item">
            <a
              href="https://www2.gov.bc.ca/gov/content/home/contact-us"
              target="_self"
              className="nav-link"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
