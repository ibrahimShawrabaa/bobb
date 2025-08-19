import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

import netlifyIdentity from 'netlify-identity-widget';
import { useEffect, useState } from 'react';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
      <div className={styles.buttons}>
  <Link
    className="button button--secondary button--lg"
    to="/docs/intro">
    Docusaurus Tutorial - 5min ⏱️
  </Link>

  {user ? (
    <button
      className="button button--primary button--lg"
      onClick={() => netlifyIdentity.logout()}>
      Logout ({user?.email})
    </button>
  ) : (
    <button
      className="button button--primary button--lg"
      onClick={() => netlifyIdentity.open()}>
      Login
    </button>
  )}
</div>

    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [user, setUser] = useState(null);

  useEffect(() => {
    netlifyIdentity.init();

    // Listen for login/logout
    netlifyIdentity.on('login', (user) => setUser(user));
    netlifyIdentity.on('logout', () => setUser(null));

    // Cleanup listeners on unmount
    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
    };
  }, []);
}
