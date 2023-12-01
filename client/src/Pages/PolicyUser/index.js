import classNames from "classnames/bind";
import styles from "./PolicyUser.module.scss";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";

const cx = classNames.bind(styles);

function PolicyUser() {
  return (
    <div className={cx("policy-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("policy-hero")}>
        <h2 className={cx("heading")}>PRIVACY POLICY</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>PrivacyPolicy</span>
        </span>
      </div>
      {/* Main ============ */}
      <main className={cx("main")}>
        {/* Box */}
        <section className={cx("box")}>
          <h2 className={cx("heading")}>Who we are</h2>
          <h3 className={cx("content")}>
            Welcome to Paws and Whiskers – a dedicated community for pet
            enthusiasts! Our mission is to connect and celebrate the love for
            pets. As passionate pet lovers ourselves, we have created a vibrant
            space where you can explore, connect, and indulge in all things
            related to your furry friends. From adopting pets to discovering the
            latest pet products, our platform aims to foster a thriving
            community. Join us on this delightful journey at
            https://pawsandwhiskers.com and become a part of a pet-loving
            family!
          </h3>
        </section>
        {/* Box */}
        <section className={cx("box")}>
          <h2 className={cx("heading")}>Comments</h2>
          <h3 className={cx("content")}>
            When visitors leave comments on our site, we gather the information
            provided in the comments form, including the visitor’s IP address
            and browser user agent string, which aids in spam detection.
          </h3>
          <h3 className={cx("content")}>
            An anonymized string generated from your email address (known as a
            hash) may be sent to the Gravatar service to check if you are using
            it. You can review the Gravatar service privacy policy at
            https://automattic.com/privacy/. Upon approval of your comment, your
            profile picture becomes visible to the public within the context of
            your comment.
          </h3>
        </section>
        {/* Box */}
        <section className={cx("box")}>
          <h2 className={cx("heading")}>Media</h2>
          <h3 className={cx("content")}>
            When uploading images to our website, please refrain from including
            embedded location data (EXIF GPS) in the images. Visitors to the
            website have the capability to download and extract any location
            data from images hosted on the site.
          </h3>
          <h3 className={cx("content")}>
            It's important to note that our platform exclusively supports images
            in PNG and JPG formats. We appreciate your adherence to these
            guidelines for an optimal and secure media-sharing experience on our
            website.
          </h3>
        </section>
        {/* Box */}
        <section className={cx("box")}>
          <h2 className={cx("heading")}>Cookies</h2>
          <h3 className={cx("content")}>
            When you interact with our site, you may choose to leave a comment,
            and in doing so, you can opt-in to saving your name, email address,
            and website through cookies. These cookies are designed for your
            convenience, eliminating the need to re-enter your details when
            leaving subsequent comments. They remain active for one year.
          </h3>
          <h3 className={cx("content")}>
            Additionally, when visiting our login page, a temporary cookie is
            set to assess whether your browser accepts cookies; this cookie
            contains no personal data and is discarded upon closing your
            browser.
          </h3>
          <h3 className={cx("content")}>
            Upon logging in, we establish several cookies to preserve your login
            information and screen display preferences. Login cookies persist
            for two days, while screen options cookies last for a year. Opting
            for “Remember Me” extends your login persistence to two weeks.
            Logging out removes the login cookies.{" "}
          </h3>
          <h3 className={cx("content")}>
            In the case of editing or publishing an article, an extra cookie is
            saved in your browser, containing no personal data and only
            indicating the post ID of the edited article. This cookie expires
            after 1 day.{" "}
          </h3>
        </section>
        {/* Box */}
        <section className={cx("box")}>
          <h2 className={cx("heading")}>
            Embedded content from other websites
          </h2>
          <h3 className={cx("content")}>
            Our articles may feature embedded content such as videos, images, or
            articles from other websites. This embedded content operates
            similarly to your visit to the originating website.
          </h3>
          <h3 className={cx("content")}>
            Please be aware that these external websites might gather data,
            employ cookies, integrate additional third-party tracking, and
            observe your engagement with the embedded content. This includes
            tracking your interaction if you have an account and are logged in
            to that particular website.
          </h3>
        </section>
        {/* Box */}
        <section className={cx("box")}>
          <h2 className={cx("heading")}>Who we share your data with</h2>
          <h3 className={cx("content")}>
            In the event that you request a password reset, your IP address will
            be included in the reset email for verification purposes. Rest
            assured, this information is solely utilized to enhance the security
            of the password reset process.
          </h3>
        </section>
        {/* Box */}
        <section className={cx("box")}>
          <h2 className={cx("heading")}>How long we retain your data</h2>
          <h3 className={cx("content")}>
            When you leave a comment, both the comment itself and its associated
            metadata are retained indefinitely. This facilitates the automatic
            recognition and approval of subsequent comments, sparing them from
            being held in a moderation queue.
          </h3>
          <h3 className={cx("content")}>
            For registered users on our website, their provided personal
            information is stored in their user profiles. Users have the
            autonomy to view, edit, or delete their personal information at any
            time, with the exception of the username, which cannot be changed.
            Website administrators also have the capability to view and modify
            this information.
          </h3>
        </section>
        {/* Box */}
        <section className={cx("box")}>
          <h2 className={cx("heading")}>What rights you have over your data</h2>
          <h3 className={cx("content")}>
            If you possess an account on this site or have left comments, you
            have the right to request an exported file containing the personal
            data we have stored about you, including any information you've
            supplied. Additionally, you can request the removal of any personal
            data we hold. It's important to note that this does not encompass
            data that we are obligated to retain for administrative, legal, or
            security purposes.
          </h3>
        </section>
        {/* Box */}
        <section className={cx("box")}>
          <h2 className={cx("heading")}>Where we send your data</h2>
          <h3 className={cx("content")}>
            We utilize an automated spam detection service to check visitor
            comments for quality assurance. This service may involve the
            analysis of data submitted through comments.
          </h3>
        </section>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default PolicyUser;
