import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./KasihLinkPhase1.module.css";

/*
 * KasihLink — Phase 2 case study. Reuses the Phase 1 editorial system so the
 * posts read as one continuous series.
 */

export default function KasihLinkPhase2() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "KasihLink: Phase 2 — Ching Yen";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <span className={styles.bylineTag}>
          <Link to="/?p=crafter">Ching Yen</Link> &nbsp;·&nbsp; Product Design
        </span>
        <span className={styles.seriesTag}>
          Series: KasihLink &nbsp; Part 2 of 2
        </span>
      </header>

      <section className={styles.hero}>
        <p className={styles.heroLabel}>
          Case Study &nbsp;·&nbsp; Product Iteration
        </p>
        <h1 className={styles.heroTitle}>
          Reducing Work,
          <br />
          Increasing <em>Visibility</em>
        </h1>
        <p className={styles.heroSub}>
          After the first prototype, the question became more specific. It was
          no longer only whether home administrators would use a digital tool to
          submit donation requests, but whether the tool would make their work
          lighter. The next iteration focused on that balance: reducing admin
          effort while helping homes become easier for donors to see and
          understand.
        </p>
      </section>

      <div className={styles.divider} />

      <div className={styles.bodyWrap}>
        <section className={styles.section}>
          <p className={styles.sectionLabel}>01 &nbsp; A Sharper Question</p>
          <h2 className={styles.sectionHeading}>Would This Make Work Easier?</h2>
          <p>
            In Part 1, the main question was whether home administrators would
            actually use a digital tool to submit and track donation requests.
            After more conversations with homes, that question became more
            specific: would this tool make their work easier, or would it become
            another thing they had to manage? That distinction mattered because
            the homes we spoke to were already stretched. If KasihLink added
            more admin work without giving enough back, it would be hard to
            adopt no matter how useful the idea seemed.
          </p>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>02 &nbsp; Faster Requests</p>
          <h2 className={styles.sectionHeading}>
            Making Requests Easier To Create
          </h2>
          <p>
            One step we took towards this direction was making request creation
            faster by adding a Quick Fill section. Instead of starting with the
            structured form, admins can type what they need in plain language,
            and the app parses it into fields like item name, quantity, size,
            category, and needed-by date.
          </p>

          <figure
            className={`${styles.screenshotItem} ${styles.screenshotNarrow}`}
          >
            <img
              src="/work/kasih-link/quick-fill-request.png"
              alt="Create Request screen with Quick Fill section"
            />
            <figcaption className={styles.screenshotCaption}>
              Create Request — Quick Fill lets admins describe a need before
              adjusting structured fields
            </figcaption>
          </figure>

          <p>
            This keeps the structure we need for publishing and tracking
            requests, but changes how the admin begins. The app fits better into
            how admins work naturally: describe the need first, then adjust the
            details only if needed.
          </p>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>03 &nbsp; Public Reach</p>
          <h2 className={styles.sectionHeading}>
            Connecting Requests Back To Facebook
          </h2>
          <p>
            We also added a button that links directly to the KasihLink Facebook
            page. This was a small interface change, but it connected the admin
            app back to the public side of the project. Since Facebook is where
            approved requests can be shared with potential donors, keeping that
            link visible helped make the flow feel less isolated. The app was
            not just storing requests; it was part of a larger process of
            helping those requests reach people.
          </p>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>04 &nbsp; What We Heard</p>
          <h2 className={styles.sectionHeading}>
            What More Homes Helped Us See
          </h2>
          <p>
            As we continued speaking with homes, another pattern became clearer:
            many homes were not only struggling with donation requests, but with
            visibility. They may already have needs, stories, and ongoing
            challenges, but donors often do not know they exist or understand
            what kind of help would be meaningful. That shifted how I thought
            about onboarding. Adding a home to KasihLink should not only be
            treated as account setup, but as the beginning of representing that
            home well.
          </p>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>05 &nbsp; Onboarding</p>
          <h2 className={styles.sectionHeading}>
            Letting Homes Register Themselves
          </h2>
          <p>
            To support this, we added a self-registration flow for organization
            admins. When an admin signs up for an account, they can fill in
            details about the home, including its name, address, contact
            information, and description.
          </p>

          <figure
            className={`${styles.screenshotItem} ${styles.screenshotNarrow}`}
          >
            <img
              src="/work/kasih-link/org-registration.png"
              alt="Organization self-registration screen"
            />
            <figcaption className={styles.screenshotCaption}>
              Organization self-registration — home details, contact
              information, and short description
            </figcaption>
          </figure>

          <p>
            For now, this is a practical flow that reduces the amount of manual
            setup needed from the KasihLink team. The details can still be
            reviewed before requests go live, which keeps the trust layer intact
            while making onboarding less dependent on the founder entering
            everything manually. But I do not think this is the final version of
            what onboarding should be. If visibility is one of the real
            problems, then future versions should help create a richer showcase
            of each home, possibly with photos, stories, and posts that can be
            shared through the Facebook page.
          </p>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>06 &nbsp; Takeaways</p>
          <h2 className={styles.sectionHeading}>Where This Leaves Part 2</h2>

          <div className={styles.takeaway}>
            <p className={styles.takeawayLabel}>Where We Stand</p>
            <p>
              That feels like the sharper product question coming out of this
              phase. KasihLink needs to reduce the effort required from home
              admins, while also helping the homes become more visible to
              donors. The prototype is still small, but the direction is
              becoming clearer: how much of the invisible work around asking for
              help can the product quietly take on?
            </p>
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <span className={styles.footerName}>Ching Yen</span>
      </footer>
    </article>
  );
}
