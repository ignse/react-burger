import React from 'react';
import styles from './home.module.css';

export function NotFound404() {

return (
      <main className={styles.auth}>
         <h1>Oops! 404 Error</h1>
          <p>The page you requested does not exist</p>
      </main>
  );
}