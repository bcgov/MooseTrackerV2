import "./Footer.css"

export const Footer = (props: any) => {

    return(
        <div className="footer">
          <div className="iconContainer">
            <img className="bcgovIcon" src="BC_logo.png" alt="Government of British Columbia" />
          </div>
          <a href="https://www2.gov.bc.ca/gov/content/home/privacy">Privacy Statement</a>
          <span className="divider"></span>
        </div>
    )
}