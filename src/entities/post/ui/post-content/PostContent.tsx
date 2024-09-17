import { useRef, useEffect, useState, FC } from 'react';
import styles from './PostContent.module.scss';
import { ITag } from 'entities/tag/model/TagModel';
import { motion } from 'framer-motion';
import { linkAnimation } from 'shared/animations/animationSettings';

interface ContentWithToggleProps {
  content: string;
  tags?: ITag[];
  isExpanded: boolean;
  onToggle: () => void;
  onTagClick: (tagId: string) => void;
}

export const PostContent: FC<ContentWithToggleProps> = ({
  content,
  isExpanded,
  onToggle,
  tags,
  onTagClick,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [shouldShowMore, setShouldShowMore] = useState(false);

  useEffect(() => {
    const element = contentRef.current;
    if (element) {
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
      const threeLinesHeight = lineHeight * 3;
      setShouldShowMore(element.scrollHeight > threeLinesHeight);
    }
  }, [content]);

  return (
    <div className={styles.contentWrapper}>
      <div
        ref={contentRef}
        className={`${styles.content} ${isExpanded ? styles.expanded : ''}`}
      >
        {content}
        <div className={styles.tags}>
          {' '}
          {tags?.map((tag: ITag) => (
            <motion.div
              key={tag.objectId}
              className={styles.tag}
              onClick={() => onTagClick(tag.objectId)}
              {...linkAnimation}
            >
              {`#${tag.name}`}
            </motion.div>
          ))}
        </div>
      </div>
      {shouldShowMore && (
        <button onClick={onToggle} className={styles.showMoreButton}>
          {isExpanded ? '‹' : '›'}
        </button>
      )}
    </div>
  );
};
