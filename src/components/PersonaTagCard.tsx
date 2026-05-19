import { Fragment } from "react";
import { PERSONA_TAGS } from "@/lib/personaContent";
import type { Persona } from "@/lib/persona";
import styles from "./PersonaTagCard.module.css";

type Props = {
  persona: Exclude<Persona, "builder">;
};

export default function PersonaTagCard({ persona }: Props) {
  const tag = PERSONA_TAGS[persona];
  const sectionLabel = persona === "crafter" ? "craft" : "roam";

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <span className={`mono uppr ${styles.label}`}>
          // tag &nbsp;·&nbsp;{" "}
          <span className={styles.labelAccent}>{sectionLabel}</span>
        </span>
        <span className={`mono ${styles.label}`}>{`<${persona}>`}</span>
      </div>

      <div className={styles.stats}>
        {tag.stats.map((stat) => (
          <Fragment key={stat.label}>
            <span className={styles.statLabel}>{stat.label}</span>
            {stat.label === "url" && tag.projectUrl ? (
              <a
                href={tag.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`mono ${styles.statLink}`}
              >
                {stat.value} ↗
              </a>
            ) : (
              <span className={styles.statValue}>{stat.value}</span>
            )}
          </Fragment>
        ))}
      </div>

      <p className={styles.quote}>&ldquo;{tag.quote}&rdquo;</p>
    </div>
  );
}
