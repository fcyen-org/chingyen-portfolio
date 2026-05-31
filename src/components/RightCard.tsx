import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowR } from "@/components/icons";
import type { Persona } from "@/lib/persona";
import {
  BUILDER_TIMELINE,
  CRAFTER_EMPTY_PROMPT,
  EXPLORER_PHOTOS,
  RIGHT_CARD_META,
  SIDE_QUESTS,
} from "@/lib/personaContent";
import instagramPosts from "@/data/instagram-posts.json";
import styles from "./RightCard.module.css";

/*
 * RightCard — the right-column panel of the character-select stage.
 * Shell (sticker tab, header, scrollable body, mono footer) is persistent;
 * only the body and a few labels swap with the active persona, crossfading
 * via framer-motion AnimatePresence so the panel itself never re-mounts.
 *
 * Body subcomponents:
 *   - BuilderBody:  timeline with diamond markers
 *   - CrafterBody:  selected side-quest detail (description + screenshot +
 *                   related posts), or a prompt when nothing is selected
 *   - ExplorerBody: curated Instagram post embeds via embed.js
 */

export default function RightCard({
  persona,
  selectedQuest = null,
}: {
  persona: Persona;
  /** Crafter only: id of the selected side quest, or null for the prompt. */
  selectedQuest?: string | null;
}) {
  const meta = RIGHT_CARD_META[persona];

  return (
    <div className={styles.root}>
      <div className={styles.sticker}>{meta.sticker}</div>

      <div className={styles.header}>
        <div className={`mono uppr ${styles.section}`}>{meta.section}</div>
        <h2 className={styles.heading}>
          The <em>{meta.heading}</em>
        </h2>
        <div className={`mono ${styles.focus}`}>
          focus: <b>{meta.focus.label}</b> &nbsp;·&nbsp; {meta.focus.suffix}
        </div>
      </div>

      <div className={styles.body}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={persona}
            className={styles.bodyFade}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          >
            {persona === "builder" && <BuilderBody />}
            {persona === "crafter" && (
              <CrafterBody selectedQuest={selectedQuest} />
            )}
            {persona === "explorer" && <ExplorerBody />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.footer}>
        <span>&lt;{persona}.lvl&gt;</span>
        <span>scroll ↓</span>
      </div>
    </div>
  );
}

function BuilderBody() {
  return (
    <div>
      <div className={`mono uppr ${styles.bodyEyebrow}`}>
        &lt;timeline len={BUILDER_TIMELINE.length}&gt;
      </div>
      <div className={styles.timeline}>
        <div className={styles.timelineRail} />
        {BUILDER_TIMELINE.map((t) => (
          <div key={t.year} className={styles.timelineEntry}>
            <div className={styles.timelineDiamond} />
            <div className={`mono ${styles.timelineYear}`}>{t.year}</div>
            <div className={styles.timelineRole}>{t.role}</div>
            <div className={`mono ${styles.timelineOrg}`}>@ {t.org}</div>
            {t.blurb && t.blurb.map((line, i) => (
              <p key={i} className={styles.timelineBlurb}>
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function CrafterBody({ selectedQuest }: { selectedQuest: string | null }) {
  const quest = SIDE_QUESTS.find((q) => q.id === selectedQuest) ?? null;

  // No quest picked yet — show the prompt nudging the user to the list.
  if (!quest) {
    return (
      <div className={styles.questEmpty}>
        <div className={`mono uppr ${styles.bodyEyebrow}`}>
          &lt;side-quests len={SIDE_QUESTS.length}&gt;
        </div>
        <p className={styles.questPrompt}>{CRAFTER_EMPTY_PROMPT}</p>
      </div>
    );
  }

  const posts = quest.posts ?? [];

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={quest.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className={`mono uppr ${styles.bodyEyebrow}`}>
          &lt;side-quest // {quest.id}&gt;
        </div>
        <h3 className={styles.questTitle}>{quest.name}</h3>
        <p className={styles.questDesc}>{quest.description}</p>

        {quest.screenshot ? (
          <img
            src={quest.screenshot}
            alt={`${quest.name} screenshot`}
            className={styles.questShot}
            loading="lazy"
            draggable={false}
          />
        ) : quest.cta ? (
          <a
            href={quest.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.questCta}
          >
            {quest.cta.label} <ArrowR />
          </a>
        ) : (
          <div className={styles.questShotPlaceholder}>
            <span className="mono uppr">screenshot</span>
          </div>
        )}

        {posts.length > 0 && (
          <div className={styles.questPosts}>
            <div className={`mono uppr ${styles.bodyEyebrow}`}>
              &lt;posts len={posts.length}&gt;
            </div>
            <div className={styles.postList}>
              {posts.map((p) => {
                const inner = (
                  <>
                    <div className={styles.postHead}>
                      <span className={`mono ${styles.postNum}`}>{p.num}</span>
                    </div>
                    <div className={styles.postTitle}>{p.title}</div>
                    <div className={`mono ${styles.postMeta}`}>
                      {p.meta} <ArrowR />
                    </div>
                  </>
                );
                return p.slug ? (
                  <Link
                    key={p.num}
                    to={`/work/${p.slug}`}
                    className={styles.postRow}
                  >
                    {inner}
                  </Link>
                ) : (
                  <a key={p.num} href="#" className={styles.postRow}>
                    {inner}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function ExplorerBody() {
  const { username, posts } = instagramPosts;

  return (
    <div>
      <div className={styles.igHead}>
        <span className={`mono ${styles.bodyEyebrow}`}>// @{username}</span>
        <a
          href={`https://www.instagram.com/${username}/`}
          target="_blank"
          rel="noopener noreferrer"
          className={`mono ${styles.igProfileLink}`}
        >
          view profile →
        </a>
      </div>

      <div className={styles.igGrid}>
        {posts.map((post, i) => (
          <a
            key={post.postUrl}
            href={post.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.igCell}
          >
            {post.img ? (
              <img
                src={post.img}
                alt=""
                className={styles.igPhoto}
                loading="lazy"
                draggable={false}
              />
            ) : (
              <div
                className={styles.igPlaceholder}
                style={{
                  background: `linear-gradient(${(i * 37) % 360}deg, ${EXPLORER_PHOTOS[i % EXPLORER_PHOTOS.length].palette[0]}, ${EXPLORER_PHOTOS[i % EXPLORER_PHOTOS.length].palette[1]})`,
                }}
              />
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
