import { Fragment } from "react";
import { PERSONA_TAGS } from "@/lib/personaContent";
import styles from "./PersonaTagCard.module.css";

/*
 * PersonaTagCard — bottom-centre widget for the explorer persona (Builder gets
 * SubstackWidget; Crafter gets SideQuestCard). A short stat block plus an
 * italic pull quote, stylistically a sibling of the prototype's "tag" notes.
 */

export default function PersonaTagCard() {
  const tag = PERSONA_TAGS.explorer;

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <span className={`mono uppr ${styles.label}`}>
          // tag &nbsp;·&nbsp;{" "}
          <span className={styles.labelAccent}>roam</span>
        </span>
        <span className={`mono ${styles.label}`}>&lt;explorer&gt;</span>
      </div>

      <div className={styles.stats}>
        {tag.stats.map((stat) => (
          <Fragment key={stat.label}>
            <span className={styles.statLabel}>{stat.label}</span>
            <span className={styles.statValue}>{stat.value}</span>
          </Fragment>
        ))}
      </div>

      <p className={styles.quote}>&ldquo;{tag.quote}&rdquo;</p>
      {/* <div className={`mono ${styles.attribution}`}>{tag.attribution}</div> */}
    </div>
  );
}
