import { useRef, useEffect, useState, FC } from 'react';
import styles from './PostContent.module.scss';

interface ContentWithToggleProps {
  content: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export const PostContent: FC<ContentWithToggleProps> = ({
  content,
  isExpanded,
  onToggle,
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
      </div>
      {shouldShowMore && (
        <button onClick={onToggle} className={styles.showMoreButton}>
          {isExpanded ? '‹' : '›'}
        </button>
      )}
    </div>
  );
};
