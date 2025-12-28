import { Injectable, OnDestroy } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { Feedback } from '../models/feedback.interface';
import { FirebaseService } from './firebase.service';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../environments/environment';
// import{ AngularFireStorage } from '@angular/fire/compat/storage';
const app = initializeApp(environment.firebase);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})

export class FeedbackService  {


constructor(
  private firebaseService: FirebaseService,
) {}

addFeedbackOnDB( feedback: Feedback ){
  const  feedbackCollection = collection( db, 'feedback');
  return addDoc( feedbackCollection, feedback);
}

async getAllFeedback(): Promise<Feedback[]> {
  const feedbackRef = collection(db, 'feedback');
  const snapshot = await getDocs(feedbackRef);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Feedback, 'id'>)
  }));
}

deleteFeedback(id: string) {
  const feedbackDoc = doc( db, 'feedback/${id}');
  return deleteDoc(feedbackDoc);
}
}
