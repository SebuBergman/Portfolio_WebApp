import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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

export const deleteBookFromFirestore = async (uid: string, bookId: string) => {
  const firestore = getFirestore();
  const docRef = doc(firestore, "users", uid, "books", bookId);
  await deleteDoc(docRef);
};

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
