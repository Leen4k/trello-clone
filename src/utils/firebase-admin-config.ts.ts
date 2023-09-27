import admin from 'firebase-admin'
import { initializeApp, getApps, cert } from 'firebase-admin/app';

    const fireConfig:any = {
        "type": process.env.TYPE,
        "project_id": process.env.PROJECT_ID,
        "private_key_id": process.env.PRIVATE_KEY_ID,
        "private_key": process.env.PRIVATE_KEY,
        "client_email": process.env.CLIENT_EMAIL,
        "client_id": process.env.CLIENT_ID,
        "auth_uri": process.env.AUTH_URI,
        "token_uri": process.env.TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
        "universe_domain": process.env.UNIVERSE_DOMAIN
    }

    try {
        admin.initializeApp({
          credential: admin.credential.cert(fireConfig),
        })
        console.log('Initialized.')
      } catch (error:any) {
    
        if (!/already exists/u.test(error.message)) {
          console.error('Firebase admin initialization error', error.stack)
        }
      }    

export default admin