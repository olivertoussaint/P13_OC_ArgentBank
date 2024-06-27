// eslint-disable-next-line no-unused-vars
import React from "react";
import Footer from "@layout/Footer";
import iconChat from "@icons/icon-chat.png";
import iconMoney from "@icons/icon-money.png";
import iconSecurity from "@icons/icon-security.png";
import'../../index.css'
const Home = () => {
  return (
    <>
      <main>
        <div className="bg-no-repeat bg-cover h-80 relative bg-p
        bg-[url('assets/img/bank-tree.jpeg')]">
          <section className="heroContent">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open savings account with Argent Bank today!</p>
          </section>
        </div>
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <div className="featureItem">
            <img 
            src={iconChat} 
            alt="chat icon" 
            className="featureIcon" 
            />
            <h3 className="featureItemTitle">You are our #1 priority</h3>
            <p>
              Need to talk to a representative? You can get in touch through our
              24/7 chat or through a phone call in less than 5 minutes.
            </p>
          </div>
          <div className="featureItem">
            <img 
            src={iconMoney} 
            alt="money icon" 
            className="featureIcon" 
            />
            <h3 className="featureItemTitle">
              More savings means higher rates
            </h3>
            <p>
              The more you save with us, the higher your interest rate will be!
            </p>
          </div>
          <div className="featureItem">
            <img 
            src={iconSecurity} 
            alt="security icon" 
            className="featureIcon" 
            />
            <h3 className="featureItemTitle">Security you can trust</h3>
            <p>
              We use top of the line encryption to make sure your data and money 
              is always safe.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
