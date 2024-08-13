import { FC } from 'react';
import { Profile } from 'widgets/profile';
import { Header } from 'widgets/header';

import styles from './HomePage.module.scss';
import { Post } from 'entities/post';

export const HomePage: FC = () => {
  return (
    <section className={styles.homePage}>
      <Header />
      <div className={styles.container}>
        <Profile />
        <div className={styles.posts}>
          <Post
            author="John Doe"
            authorTitle="Software Engineer at TechCorp"
            date="1h ago"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            image="https://via.placeholder.com/600x300"
            authorImage="https://via.placeholder.com/50"
          />
          <Post
            author="Jane Smith"
            authorTitle="Marketing Specialist at MarketGurus"
            date="3h ago"
            content="Had a great time at the marketing conference today. Had a great time at the marketing conference todayLots of insights and networking!"
          />
          {/* <Post
            author="John Doe"
            date="August 13, 2024"
            content="This is an example of a post that looks like one from Facebook. Here you can share your thoughts and add an image."
            image="https://via.placeholder.com/500x250"
          />
          <Post
            author="Jane Smith"
            date="August 13, 2024"
            content="Another example post without an image. The styles are clean and simple, just like in Facebook."
          /> */}
        </div>
        <div className={styles.tags}>тут будут теги</div>
      </div>
    </section>
  );
};
