import { useRef, useEffect, useState, FC } from 'react';
import styles from './PostContent.module.scss';
import { ITag } from 'entities/tag/model/TagModel';

interface ContentWithToggleProps {
  content: string;
  tags?: ITag[];
  isExpanded: boolean;
  onToggle: () => void;
}

export const PostContent: FC<ContentWithToggleProps> = ({
  content,
  isExpanded,
  onToggle,
  tags,
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
            <div key={tag.objectId} className={styles.tag}>
              {`#${tag.name}`}
            </div>
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
