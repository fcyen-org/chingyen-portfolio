import { SIDE_QUESTS } from "@/lib/personaContent";
import styles from "./SideQuestCard.module.css";

/*
 * SideQuestCard — bottom-centre widget for the crafter persona (Builder gets
 * SubstackWidget; Explorer gets PersonaTagCard). Lists the pet projects
 * currently in progress as a row of clickable "side quests". Selecting one
 * lifts the id up to Home, which drives the RightCard. Clicking the active
 * quest again clears the selection.
 */

type Props = {
  selectedQuest: string | null;
  onSelect: (id: string | null) => void;
};

export default function SideQuestCard({ selectedQuest, onSelect }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <span className={`mono uppr ${styles.label}`}>
          // side quests &nbsp;·&nbsp;{" "}
          <span className={styles.labelAccent}>in progress</span>
        </span>
        <span className={`mono ${styles.label}`}>&lt;crafter&gt;</span>
      </div>

      <ul className={styles.list}>
        {SIDE_QUESTS.map((quest) => {
          const active = quest.id === selectedQuest;
          return (
            <li key={quest.id}>
              <button
                type="button"
                className={`${styles.row} ${active ? styles.active : ""}`}
                onClick={() => onSelect(active ? null : quest.id)}
                aria-pressed={active}
              >
                <span className={styles.rowHead}>
                  <span className={styles.name}>{quest.name}</span>
                  <span className={`mono uppr ${styles.status}`}>
                    [ {quest.status} ]
                  </span>
                </span>
                <span className={styles.tagline}>{quest.tagline}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
