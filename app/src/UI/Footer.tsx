import "./Footer.css"

export const Footer = (props: any) => {

    return(
        <div className="footer">
          <span className="horizontal-line"></span>
          <div className="footer-content">
            <div className="iconContainer">
              <img className="bcgovIcon" src="BC_logo.png" alt="Government of British Columbia" />
            </div>
            <div className="footer-text-container">
              <a href="https://www2.gov.bc.ca/gov/content/home/privacy">Privacy Statement</a>
            </div>
          </div>
        </div>
    )
}