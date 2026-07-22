import { PixelSword } from "@/components/icons";
import { SIDE_QUESTS } from "@/lib/personaContent";
import styles from "./SideQuestCard.module.css";

/*
 * SideQuestCard — bottom-centre widget for the crafter persona. Mirrors the
 * SubstackWidget layout (mono label + pixel-sword glyph, italic heading,
 * blurb, then a list) but on the Crafter light skin, and the rows are
 * selectable: clicking a side quest lifts its id up to Home, which drives the
 * RightCard. Clicking the active row again clears the selection.
 */

type Props = {
  selectedQuest: string | null;
  onSelect: (id: string | null) => void;
};

export default function SideQuestCard({ selectedQuest, onSelect }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <span className={`mono uppr ${styles.label}`}>in progress</span>
        <PixelSword scale={2} />
      </div>

      <h3 className={styles.heading}>Side Quests</h3>
      <p className={styles.blurb}>
        Pet projects I&rsquo;m currently working on — pick one to dig in ▶️
      </p>

      <div className={styles.posts}>
        {SIDE_QUESTS.map((quest) => {
          const active = quest.id === selectedQuest;
          return (
            <button
              key={quest.id}
              type="button"
              className={`${styles.post} ${active ? styles.active : ""}`}
              onClick={() => onSelect(active ? null : quest.id)}
              aria-pressed={active}
            >
              <span className={styles.postTitle}>{quest.name}</span>
              <span className={`mono uppr ${styles.postStatus}`}>
                {quest.status}
              </span>
            </button>
          );
        })}
      </div>

      <div className={styles.footer}>
        <span>{SIDE_QUESTS.length} side quests</span>
        <span>pick one ↑</span>
      </div>
    </div>
  );
}
