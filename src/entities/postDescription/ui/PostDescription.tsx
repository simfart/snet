import { useRef, useEffect, useState, FC, useCallback } from 'react';
import { ITag } from 'entities/tag/model/TagModel';
import { motion } from 'framer-motion';
import { linkAnimation } from 'shared/animations/animationSettings';
import styles from './PostDescription.module.scss';

interface ContentWithToggleProps {
  content: string;
  tags?: ITag[];
  onTagClick: (tagId: string, tagName: string) => void;
  onPostClick?: () => void;
  variant?: 'postPage';
}

export const PostDescription: FC<ContentWithToggleProps> = ({
  content,
  tags,
  onTagClick,
  onPostClick,
  variant,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [shouldShowMore, setShouldShowMore] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  useEffect(() => {
    const element = contentRef.current;
    if (element) {
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
      const threeLinesHeight = lineHeight * 3;
      setShouldShowMore(element.scrollHeight > threeLinesHeight);
    }
  }, [content]);

  return (
    <div
      className={`${styles.contentWrapper} ${
        variant === 'postPage' && styles.postPage
      }`}
    >
      <div
        ref={contentRef}
        className={`${styles.content} ${isExpanded ? styles.expanded : ''}`}
      >
        <div onClick={onPostClick}>{content}</div>
        <div className={styles.tags}>
          {' '}
          {tags?.map((tag: ITag) => (
            <motion.div
              key={tag.objectId}
              className={styles.tag}
              onClick={() => onTagClick(tag.objectId, tag.name)}
              {...linkAnimation}
            >
              {`#${tag.name}`}
            </motion.div>
          ))}
        </div>
      </div>

      {shouldShowMore && (
        <button onClick={toggleExpand} className={styles.showMoreButton}>
          {isExpanded ? '‹' : '›'}
        </button>
      )}
    </div>
  );
};
