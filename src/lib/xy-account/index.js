/**
 * @Author: XY | The Findables Company <arietrouw>
 * @Date:   Wednesday, March 7, 2018 11:24 AM
 * @Email:  developer@xyfindables.com
 * @Filename: xyo-account.js
 * @Last modified by:   arietrouw
 * @Last modified time: Tuesday, April 17, 2018 8:32 PM
 * @License: All Rights Reserved
 * @Copyright: Copyright XY | The Findables Company
 */

/* eslint no-console: 0 */
/* eslint max-len: 0 */
/* eslint camelcase: 0 */
/* eslint class-methods-use-this: 0 */

import firebase from 'firebase'
import 'firebase/firestore'

export default class XYAccount {
  constructor(_onStateChange) {
    const config = {
      apiKey: `AIzaSyCCtXYmkLd3gh6fKjSCGOWhsYoeKccYq-g`,
      authDomain: `xyo-network-1522800011804.firebaseapp.com`,
      databaseURL: `https://xyo-network-1522800011804.firebaseio.com`,
      projectId: `xyo-network-1522800011804`,
      storageBucket: `xyo-network-1522800011804.appspot.com`,
      messagingSenderId: `542704523793`,
    }
    this.app = firebase.initializeApp(config)
    if (_onStateChange) {
      firebase.auth().onAuthStateChanged(_onStateChange)
    }

    firebase.firestore().settings({ timestampsInSnapshots: true })
  }

  record(_event) {}

  addOnStateChange(onStateChange) {
    if (onStateChange) {
      firebase.auth().onAuthStateChanged(onStateChange)
    }
  }

  currentUser() {
    return firebase.auth().currentUser
  }

  async sendPasswordResetEmail(email) {
    return firebase.auth(this.app).sendPasswordResetEmail(email)
  }

  async signUp(_email, _password) {
    return firebase.auth().createUserWithEmailAndPassword(_email, _password)
  }

  async signIn(_email, _password) {
    return firebase.auth().signInWithEmailAndPassword(_email, _password)
  }

  async signOut() {
    return firebase.auth().signOut()
  }

  async updatePassword(_password) {
    return this.currentUser().updatePassword(_password)
  }

  async signInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return firebase.auth().signInWithPopup(provider)
  }

  async signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider)
  }

  async linkAccount(providerId) {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    const facebookProvider = new firebase.auth.FacebookAuthProvider()
    const provider = (() => {
      if (providerId === 'facebook.com') return facebookProvider
      if (providerId === 'google.com') return googleProvider
    })()
    return this.currentUser().linkWithPopup(provider)
  }

  async unlinkAccount(providerId) {
    return this.currentUser().unlink(providerId)
  }

  async fetchSignInMethodsForEmail(email) {
    return firebase.auth().fetchSignInMethodsForEmail(email)
  }

  isSignedIn() {
    return firebase.auth().currentUser != null
  }

  updateUser(data) {
    if (this.isSignedIn()) {
      const userUid = this.currentUser().uid
      return firebase
        .firestore()
        .collection(`users`)
        .doc(userUid)
        .set(data, { merge: true })
    }
    throw new Error(`You must be signed in to update the user`)
  }

  saveCheckinData({ checkinHash, questDataHash, createdAt }) {
    if (this.isSignedIn()) {
      const userUid = this.currentUser().uid
      // const createdAt = firebase.firestore.FieldValue.serverTimestamp()
      return firebase
        .firestore()
        .collection(`quest_checkins`)
        .doc(`${userUid}_${checkinHash}`)
        .set({ checkinHash, userUid, questDataHash, createdAt })
    }
    throw new Error(`You must be signed in to save checkin data`)
  }

  async getCheckinData() {
    if (this.isSignedIn()) {
      const userUid = this.currentUser().uid
      const docs = await firebase
        .firestore()
        .collection('quest_checkins')
        .where('userUid', '==', userUid)
        .get()
      return docs.docs.map(doc => (doc.exists ? doc.data() : null))
    }
    throw new Error(`You must be signed in to get checkin data`)
  }

  async updateProfile(data) {
    if (this.isSignedIn()) {
      return this.currentUser().updateProfile(data)
    }
    throw new Error(`You must be signed in to update the user`)
  }

  async getQuests() {
    const docs = await this.app
                           .firestore()
                           .collection('quests')
                           .get()
    return docs.docs.map(
      doc => (doc.exists ? { ...doc.data(), hash: doc.id } : null),
    )
  }

  async getUserData() {
    if (this.isSignedIn()) {
      const userUid = this.currentUser().uid
      const doc = await firebase
        .firestore()
        .collection(`users`)
        .doc(userUid)
        .get()
      if (doc.exists) {
        return doc.data()
      } else {
        console.log(`no data for user ${userUid}`)
        return {}
      }
    }
    throw new Error(`You must be signed in to get user data`)
  }

  async getQuestCompletionData() {
    if (this.isSignedIn()) {
      const userUid = this.currentUser().uid
      const docs = await firebase
        .firestore()
        .collection(`quest_completions`)
        .where('userUid', '==', userUid)
        .get()
      return docs.docs.map(doc => (doc.exists ? doc.data() : null))
    }
    throw new Error(`You must be signed in to get completed quest data`)
  }

  async addWallet(address) {
    if (this.isSignedIn()) {
      const userUid = this.currentUser().uid
      await firebase
        .firestore()
        .collection(`wallets`)
        .doc(`${userUid}_${address}`)
        .set({
          userUid,
          address,
        })
      return this.currentUser()
    }
    throw new Error(`You must be signed in to add a wallet.`)
  }

  removeWallet(address) {
    if (this.isSignedIn()) {
      const userUid = this.currentUser().uid
      return firebase
        .firestore()
        .collection(`wallets`)
        .doc(`${userUid}_${address}`)
        .delete()
    }
    throw new Error(`You must be signed in to remove a wallet.`)
  }

  async getTokenFromWallet(message, signedMessage) {
    const walletAuth = firebase.functions().httpsCallable(`walletAuth`)
    const result = await walletAuth({ message, signedMessage })
    return result.data
  }

  async signInWithCustomToken(token) {
    return firebase.auth().signInWithCustomToken(token)
  }
}
