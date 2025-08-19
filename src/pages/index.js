import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <BrowserOnly fallback={<span>Loading...</span>}>
      {() => {
        const [user, setUser] = useState(null);

        useEffect(() => {
          const netlifyIdentity = require('netlify-identity-widget');
          netlifyIdentity.init();
          setUser(netlifyIdentity.currentUser());

          netlifyIdentity.on('login', (u) => setUser(u));
          netlifyIdentity.on('logout', () => setUser(null));

          return () => {
            netlifyIdentity.off('login');
            netlifyIdentity.off('logout');
          };
        }, []);

        return (
          <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
              <h1 className="hero__title">{siteConfig.title}</h1>
              <p className="hero__subtitle">{siteConfig.tagline}</p>
              <div className={styles.buttons}>
                <Link className="button button--secondary button--lg" to="/docs/intro">
                  Tutorial
                </Link>

                {user ? (
                  <button
                    className="button button--primary button--lg"
                    onClick={() => require('netlify-identity-widget').logout()}
                  >
                    Logout ({user.email})
                  </button>
                ) : (
                  <button
                    className="button button--primary button--lg"
                    onClick={() => require('netlify-identity-widget').open()}
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </header>
        );
      }}
    </BrowserOnly>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="A simple description"
    >
      <HomepageHeader />
    </Layout>
  );
}
