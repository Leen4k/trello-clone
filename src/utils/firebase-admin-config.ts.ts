import admin from 'firebase-admin'
import { initializeApp, getApps, cert } from 'firebase-admin/app';

    // const fireConfig:any = {
    //     "type": process.env.TYPE,
    //     "project_id": process.env.PROJECT_ID,
    //     "private_key_id": process.env.PRIVATE_KEY_ID,
    //     "private_key": process.env.PRIVATE_KEY,
    //     "client_email": process.env.CLIENT_EMAIL,
    //     "client_id": process.env.CLIENT_ID,
    //     "auth_uri": process.env.AUTH_URI,
    //     "token_uri": process.env.TOKEN_URI,
    //     "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
    //     "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
    //     "universe_domain": process.env.UNIVERSE_DOMAIN
    // }

    const fireConfig:any = {
        "type": "service_account",
        "project_id": "trello-clone-2e4f7",
        "private_key_id": "765d3a72fee5d74ae8cdc32eb4e71b45ac31e816",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC65Hy6j8CmhZhy\ngqRzyuTewHPpwjd9SEi23boNrYwRPHOviPNhapEkukYyJKQEaBInAXkcCspuTNnN\n3RTijYY8DLdxkNLrJnvjsAwi0oIF+IhxQaYjfCwbGYcSwiMMKbo24Kn4BxgTnRA/\nltIVDCEUTrN+1L6EmJjx3+NfI1eD+FbzFKQHSRz3uygfpPWo2YGRqCXnlYBiyj5g\nlBu/3setIhzF4QSo5Z+P7qnsrfwxnIjJRpzstBKLLP4iOUKVuQ9PI0uyEtExcbEF\nUH/mW6m7sDE9TxfbSZN7YBp+GoMlnaB/OqT25pC+5Ux5vgjNzP2RUEnCa90Ue+7J\nWWjQp0b1AgMBAAECggEAEff32gQKNLhxgMj4wL1IJfaA7n+i0CPMAfDte3UtG1ch\nlEXpiHsze0GBkD6fmmDbJe7pUv3impo+8qEH6gRLXKioVn3jGYK4tJpvgEWXBLXx\ngFocfBrrLqvUpcQOlJPKeI4/KT6dXP1j24lHp4hkAczTSyVvL9ZwFgk9lh8SwfhL\nUsaptN6jCcrLdd95x1EA+rropkmHk/Ns4EO/gFgIQjgb5hAKL98DHVgCBsXepB1M\nvtheo8QVUb+xhAdj8FOezY3qEbtY8A1ZYrdvC+dBgabHMTEBRr0Z/TeUo2Z5BUr+\n3boyzEIg+cyd/W+YFJV9F50oU0RyoN/xjRuccrutvQKBgQDqUtENFQCssxbpuzP4\nA7+IcvvM9RDv7RKmCZUxBEASmqTX9ZhP72DbBeLjEw6fXe7U7HZ8ctcyi7fqNP13\ntA9fStkTH0A1jixHRbkfhUprsQcU0ohHRgQZ6k7zj4+i9MhAZFCYMVXilFgImezN\neudCrneQB6r/kQOowsSp2JDsCwKBgQDMLmxxOLgCEPgMzGmHgXqoKHgf2zr92lAp\nejH/FYJS/CD0xL9+U6erDPyRESAOiVSw+NeKy5Pxg/yk8OTZUOvoHhm507rk9Lg2\nG2Dc2eJXJ1+Ub1Gp9LE7jf8o15U4Cf308EBx/9RRNhDzWLQzuBRs4BLeCLqIDwvH\nON9bnlV4/wKBgAQLN9Zc9W0FjjCsbWIrVmPZcCUCWa96TOcWpT96TkzD5HJhp6ZB\ngE9nU5oNmyP+7/82sXjGVpZluN/O2Ez3i4hed06QLICAGp2EQ4SavUUMgg3G8Fki\niTGVTJWBdb4fMVGDKazmtQ+69aX4WhDVvSX2ctPGfhn4+7Iu4kv4E9AvAoGBAKjH\nn0CgYArlOAZsWrd2oouqmFHNCSCafDUtG3L+trIeVKfAk4K7aBgPLiBEhbk+cFGy\nAYpr6il0rz0xHBs/tyIy75Uanp1wZW3kh9dIDL96fpnWwyy4ZmESad+7BVBDgjgc\n+UjC7yEKjkx6AMvX2Jp/R1le4cJinZvbOVcktQbFAoGBAJG6rB0aREfwjxHj2++C\nD514bQty4xtbsEEpFO2qssO9tDpC+VwxsV67xL+yBV9zmYfnBPmmhSA8e0gZF/H6\nkmAZU5ntJ2tMzkNbDfc0xKsFSBt0sBiajl4/f/bHudXcmVqW13c9uNgj67OEfZiL\nvNYTJtBbYzCRcK81FMEf9bYK\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-39na8@trello-clone-2e4f7.iam.gserviceaccount.com",
        "client_id": "112911039124319621116",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-39na8%40trello-clone-2e4f7.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
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