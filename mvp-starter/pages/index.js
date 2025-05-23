/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import { useEffect, useState } from 'react';
// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
// import { Button, CircularProgress, Container, Dialog, Typography } from '@mui/material';
// import { auth } from '../firebase/firebase';
// import styles from '../styles/landing.module.scss';


// const uiConfig = {
//   signInFlow: 'popup',
//   sinnInSuccessUrl: REDIRECT_PAGE,
//   signInOptions: [
//     EmailAuthProvider.PROVIDER_ID,
//     GoogleAuthProvider.PROVIDER_ID,
//   ]
// }

// export default function Home() {
//   const [login, setLogin] = useState(false);
//   const router = useRouter();

//   return (
//     <div>
//       <Head>
//         <title>Expense Tracker</title>
//       </Head>

//       <main>
//         <Container className={styles.container}>
//           <Typography variant="h1">Welcome to Expense Tracker!</Typography>
//           <Typography variant="h2">Add, view, edit, and delete expenses</Typography>
//           <div className={styles.buttons}>
//             <Button variant="contained" color="secondary" onClick={()=>setLogin(true)}>
//               Login / Register
//             </Button>
//           </div>
//           <Dialog open={login} onClose={()=>setLogin(false)}>
//             <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}></StyledFirebaseAuth>
//           </Dialog>
//         </Container>
//       </main>
//     </div>);
// }

// import { useState } from 'react';
// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
// import { Button, Container, Dialog, Typography } from '@mui/material';
// import { auth } from '../firebase/firebase';
// import styles from '../styles/landing.module.scss';

// const uiConfig = {
//   signInFlow: 'popup',
//   signInSuccessUrl: '/dashboard', // or your custom route
//   signInOptions: [
//     EmailAuthProvider.PROVIDER_ID,
//     GoogleAuthProvider.PROVIDER_ID,
//   ]
// };

// export default function Home() {
//   const [login, setLogin] = useState(false);

//   return (
//     <div>
//       <Head>
//         <title>Expense Tracker</title>
//       </Head>

//       <main>
//         <Container className={styles.container}>
//           <Typography variant="h1">Welcome to Expense Tracker!</Typography>
//           <Typography variant="h2">Add, view, edit, and delete expenses</Typography>
//           <div className={styles.buttons}>
//             <Button variant="contained" color="secondary" onClick={() => setLogin(true)}>
//               Login / Register
//             </Button>
//           </div>
//           <Dialog open={login} onClose={() => setLogin(false)}>
//             <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
//           </Dialog>
//         </Container>
//       </main>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { Button, Container, Dialog, Typography } from '@mui/material';
import { auth } from '../firebase/firebase';
import styles from '../styles/landing.module.scss';

export default function Home() {
  const [login, setLogin] = useState(false);
  const router = useRouter();

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      EmailAuthProvider.PROVIDER_ID,
      GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        router.push('/dashboard'); // Redirect to dashboard after login
        return false; // Prevent automatic redirect
      },
    },
  };

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(user => {
      if (user) {
        router.push('/dashboard'); // Redirect if user is already logged in
      }
    });
    return () => unregisterAuthObserver(); // Cleanup on unmount
  }, [router]);

  return (
    <div>
      <Head>
        <title>Expense Tracker</title>
      </Head>

      <main>
        <Container className={styles.container}>
          <Typography variant="h1">Welcome to Expense Tracker!</Typography>
          <Typography variant="h2">Add, view, edit, and delete expenses</Typography>
          <div className={styles.buttons}>
            <Button variant="contained" color="secondary" onClick={() => setLogin(true)}>
              Login / Register
            </Button>
          </div>
          <Dialog open={login} onClose={() => setLogin(false)}>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          </Dialog>
        </Container>
      </main>
    </div>
  );
}

