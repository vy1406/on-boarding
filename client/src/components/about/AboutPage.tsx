import React from 'react';
import './AboutPage.css'

class AboutPage extends React.Component {
  render(){
    return(
      <div className="container">
        <div className="about_header title">
            About Projectory
        </div>
        <div className="about_content">
          We're Spectory, an end-to-end software develelopment shop operation in Israel since early 2013 and providing 
          software consultancy and development services in a variety of areas to customers of all sizes. 
          We specialize in web apps, mobile apps, eCommerce and Internet of Things applications. 
          All our services are tailored to specific customer needs and provided with a personal and customer-centric approach. 
          Spectory has successfully delivered and maintains many projects in the above segments to 
          customers ranging from indpendent entrepreneurs to fortune 500 comapnies. 
          <br></br>
          <br></br>
          By providing exceptional customer service and aspiring to the highest professional standards, 
          Spectory set a goal for itself to transform the way software services are provided and guarantee 
          outstanding quality and complete customer satisfaction.
        </div>
      </div>
    )
  }
}

export default AboutPage