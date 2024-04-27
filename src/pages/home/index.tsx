'use client'
import { getMessaging, onMessage } from 'firebase/messaging'
import Head from 'next/head'
import { ReactNode, useEffect } from 'react'
import firebaseApp from 'src/configs/firebase'
import useFcmToken from 'src/hooks/useFcmToken'

// layouts
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'

// ** Pages
import HomePage from 'src/views/pages/home'

export default function Home() {

  const { fcmToken } = useFcmToken();
  // Use the token as needed
  console.log('FCM token:', fcmToken);


  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log('Foreground push notification received:', payload);
   
      });

      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, []);



  return (
    <>
      <Head>
        <title>Lập trình thật dễ</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HomePage />
    </>
  )
}

Home.getLayout = (page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>
Home.guestGuard = false
Home.authGuard = false
