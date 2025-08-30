import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// Save or update a book in Firestore
export const saveBookToFirestore = async (uid: string, book: any) => {
  const firestore = getFirestore();
  const docRef = doc(
    firestore,
    "users",
    uid,
    "books",
    book.id || crypto.randomUUID()
  );
  await setDoc(docRef, book, { merge: true });
};

// Delete a book from Firestore
export const deleteBookFromFirestore = async (uid: string, bookId: string) => {
  const firestore = getFirestore();
  const docRef = doc(firestore, "users", uid, "books", bookId);
  await deleteDoc(docRef);
};

// Upload a book cover to Firebase Storage and return its download URL
export const uploadBookCoverToFirebaseStorage = async (
  uid: string,
  file: File
): Promise<string | null> => {
  const storage = getStorage();
  const fileRef = ref(storage, `book-covers/${uid}/${file.name}`);
  const uploadTask = uploadBytesResumable(fileRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null,
      (error) => reject(error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

// Save or update a vinyl in Firestore
export const saveVinylToFirestore = async (uid: string, vinyl: any) => {
  const firestore = getFirestore();
  const docRef = doc(
    firestore,
    "users",
    uid,
    "vinyls",
    vinyl.id || crypto.randomUUID()
  );
  await setDoc(docRef, vinyl, { merge: true });
};

// Delete a vinyl from Firestore
export const deleteVinylFromFirestore = async (
  uid: string,
  vinylId: string
) => {
  const firestore = getFirestore();
  const docRef = doc(firestore, "users", uid, "vinyls", vinylId);
  await deleteDoc(docRef);
};

// Upload vinyl cover image to Firebase Storage
export const uploadVinylCoverToFirebaseStorage = async (
  uid: string,
  file: File
): Promise<string | undefined> => {
  const storage = getStorage();
  const fileRef = ref(storage, `vinyl-covers/${uid}/${file.name}`);
  const uploadTask = uploadBytesResumable(fileRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null,
      (error) => reject(error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL || undefined);
      }
    );
  });
};
