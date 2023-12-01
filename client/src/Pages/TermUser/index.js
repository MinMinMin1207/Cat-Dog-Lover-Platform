import classNames from "classnames/bind";
import styles from "./TermUser.module.scss";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";

const cx = classNames.bind(styles);

function TermUser() {
  return (
    <div className={cx("policy-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("policy-hero")}>
        <h2 className={cx("heading")}>TERMS OF USE</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>TermsOfUse</span>
        </span>
      </div>
      {/* Main ============ */}
      <main className={cx("main")}>
        <section className={cx("box")}>
          <h4 className={cx("tyography")}>
            By selecting “sign in,” “create account,” or “complete purchase” and
            using our website or mobile application (the “Site”), you are
            acknowledging and agreeing to the terms and conditions outlined
            herein. Specific products or services on our Site may be subject to
            additional terms (e.g., participation in our Treats loyalty program
            or subscription to our Auto ship program), which will take
            precedence if inconsistent with these Terms of Use.
          </h4>
          <h3 className={cx("content")}>
            THESE TERMS AND CONDITIONS, ALONG WITH ANY OTHER SITE-SPECIFIC TERMS
            FOR PARTICULAR PRODUCTS OR SERVICES, FORM YOUR SERVICE AGREEMENT
            ("AGREEMENT") WITH OUR PLATFORM. THIS AGREEMENT DEFINES THE LEGAL
            TERMS GOVERNING YOUR SITE USAGE AND THE ACQUISITION OR UTILIZATION
            OF ANY PRODUCTS OR SERVICES OFFERED ON THE SITE. BY ACCESSING AND/OR
            USING THE SITE, YOU AFFIRM THAT YOU POSSESS THE RIGHT, AUTHORITY,
            AND CAPACITY TO ENTER INTO THIS AGREEMENT AND ABIDE BY ITS
            STIPULATIONS. ACCESS OR USE OF THIS SITE, OR ACCEPTANCE OF THIS
            AGREEMENT, IS NOT PERMITTED IF YOU ARE BELOW 18 YEARS OF AGE.
            ARBITRATION NOTICE: THESE TERMS INCLUDE A LATER ARBITRATION
            AGREEMENT AFFECTING YOUR RIGHTS. BOTH PARTIES AGREE TO MANDATORY
            BINDING INDIVIDUAL ARBITRATION TO RESOLVE DISPUTES, AND WAIVE ANY
            PARTICIPATION IN CLASS-ACTION LAWSUITS OR CLASS-WIDE ARBITRATION, AS
            WELL AS THE RIGHT TO A JURY TRIAL. ARBITRATION INVOLVES LIMITED
            DISCOVERY AND APPELLATE REVIEW COMPARED TO COURT PROCEEDINGS. PLEASE
            CAREFULLY REVIEW THESE TERMS.
          </h3>
        </section>
        {/* Box */}
        <section className={cx("box")}>
          <h2 className={cx("heading")}>Electronic Communications</h2>
          <h3 className={cx("content")}>
            When utilizing our Site or sending emails and other electronic
            communications from your computer or mobile device to us, you are
            engaging in electronic communication. By sending, you agree to
            receive electronic responses from us in the same format, and you
            have the option to save copies of these communications for your
            records. You acknowledge that all agreements, notices, disclosures,
            and other communications provided to you electronically by us meet
            any legal requirements mandating written communication.
          </h3>
        </section>
        {/* Box */}
        <section className={cx("box")}>
          <h2 className={cx("heading")}>Accounts</h2>
          <h3 className={cx("content")}>
            To access specific features on the platform, such as making product
            purchases, you must register for a Paws and Whiskers Account and
            provide the required details through the Site registration form. By
            completing this process, you affirm the accuracy and truthfulness of
            the provided information, commit to keeping it current, and ensure
            your use of the Site aligns with all relevant laws, regulations, and
            the terms outlined in this Agreement. Safeguarding the
            confidentiality of your Paws and Whiskers Account login details is
            your responsibility.
          </h3>
          <h3 className={cx("content")}>
            You are accountable for all actions associated with your Paws and
            Whiskers Account, encompassing purchases, Site interactions, and any
            correspondence initiated from your account to Paws and Whiskers.
            Immediately notify Paws and Whiskers of any suspected unauthorized
            use or security breaches related to your Paws and Whiskers Account.
            Upon receiving such notifications, Paws and Whiskers will take
            appropriate actions, including measures like suspending or securing
            your Account, to prevent further unauthorized activities.
          </h3>
        </section>
        {/* Box */}
        <section className={cx("box")}>
          <h2 className={cx("heading")}>Permissible Uses of Site</h2>
          <h3 className={cx("content")}>
            Subject to the conditions outlined in this Agreement, Paws and
            Whiskers provides you with a limited, non-transferable, and
            non-exclusive license to access and personally use the Site. This
            license does not grant permission for any resale or commercial
            utilization of the Site's features or content, nor does it authorize
            access or use for any of the restricted purposes specified below.
            Paws and Whiskers retains the right to terminate this license at its
            discretion and without prior notice.
          </h3>
          <h3 className={cx("content")}>
            The rights granted under this Agreement are subject to the following
            limitations: (a) using the Site to place orders for resale to
            yourself or a third party is prohibited; (b) commercial
            exploitation, including licensing, sublicensing, reproduction, sale,
            rental, lease, transfer, assignment, distribution, hosting, or any
            other form of commercial use, requires the express written consent
            of Paws and Whiskers; (c) modification, creation of derivative
            works, disassembly, reverse compilation, or reverse engineering of
            any part of the Site is not allowed; (d) accessing the Site to
            create a similar or competitive service, or to download, copy, or
            collect content or account information for the benefit of another
            merchant is prohibited; (e) unless expressly stated otherwise, no
            part of the Site may be copied, reproduced, distributed,
            republished, downloaded, displayed, posted, or transmitted without
            the express written consent of Paws and Whiskers; and (f) framing or
            utilizing framing techniques to enclose any trademark, logo, or
            other proprietary information or content (including images and text
            descriptions) of the Site requires Paws and Whiskers' express
            written consent.
          </h3>
          <h3 className={cx("content")}>
            Paws and Whiskers reserves the right to modify, suspend, or
            discontinue the Site or any part thereof, with or without notice, at
            any time. You acknowledge that Paws and Whiskers will not be liable
            to you or any third party for any such modification, suspension, or
            discontinuance of the Site or any part thereof.
          </h3>
        </section>
        {/* Box */}
        <section className={cx("box")}>
          <h2 className={cx("heading")}>Fees and Commissions</h2>
          <div className={cx("list")}>
            {/* Fees */}
            <div className={cx("fees")}>
              <h4 className={cx("title")}>1. Product Listing Fee.</h4>
              <p className={cx("desc")}>
                By posting a product on our platform, users agree to pay a
                commission fee equivalent to 5% of the product's value. This
                commission will be deducted directly from the transaction
                proceeds.
              </p>
            </div>
            {/* Fees */}
            <div className={cx("fees")}>
              <h4 className={cx("title")}>2. VAT Responsibility for Buyers.</h4>
              <p className={cx("desc")}>
                Buyers are responsible for paying Value Added Tax (VAT) as per
                government regulations. VAT rates may range between 2% and 3%,
                depending on the location and product type. We encourage buyers
                to review and understand the applicable tax regulations related
                to their transactions.
              </p>
            </div>
            {/* Fees */}
            <div className={cx("fees")}>
              <h4 className={cx("title")}>
                3. Fee and Commission Adjustments.
              </h4>
              <p className={cx("desc")}>
                We reserve the right to adjust listing fees and commission rates
                over time without prior notice. Any changes will be communicated
                fairly and transparently, with effectiveness following the
                specified notice period.
              </p>
            </div>
            {/* Fees */}
            <div className={cx("fees")}>
              <h4 className={cx("title")}>4. Payment and Reporting Details.</h4>
              <p className={cx("desc")}>
                Detailed information regarding commission payments and reporting
                will be provided within the user's account. We are committed to
                delivering comprehensive and transparent details about every
                transaction and payment.
              </p>
            </div>
            {/* Fees */}
            <div className={cx("fees")}>
              <h4 className={cx("title")}>5. Payment Method.</h4>
              <p className={cx("desc")}>
                When commissions are calculated, we will utilize the payment
                method chosen by the user in their account. Users are encouraged
                to provide accurate and up-to-date payment information to ensure
                smooth payment processing.
              </p>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default TermUser;
