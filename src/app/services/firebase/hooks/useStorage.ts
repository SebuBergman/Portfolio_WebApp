import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// Singleton instances
let firestoreInstance: ReturnType<typeof getFirestore> | null = null;
let storageInstance: ReturnType<typeof getStorage> | null = null;

const getFirestoreInstance = () => {
  if (!firestoreInstance) {
    firestoreInstance = getFirestore();
  }
  return firestoreInstance;
};

const getStorageInstance = () => {
  if (!storageInstance) {
    storageInstance = getStorage();
  }
  return storageInstance;
};

// Image compression configuration
interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0 to 1
  outputFormat?: "image/jpeg" | "image/webp" | "image/png";
}

const DEFAULT_COMPRESSION: CompressionOptions = {
  maxWidth: 1200,
  maxHeight: 1200,
  quality: 0.85,
  outputFormat: "image/webp", // WebP offers best compression
};

// Compress image before upload
const compressImage = async (
  file: File,
  options: CompressionOptions = DEFAULT_COMPRESSION
): Promise<Blob> => {
  const { maxWidth, maxHeight, quality, outputFormat } = {
    ...DEFAULT_COMPRESSION,
    ...options,
  };

  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      // Calculate new dimensions while maintaining aspect ratio
      let { width, height } = img;

      if (width > maxWidth! || height > maxHeight!) {
        const aspectRatio = width / height;

        if (width > height) {
          width = maxWidth!;
          height = width / aspectRatio;
        } else {
          height = maxHeight!;
          width = height * aspectRatio;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Canvas toBlob failed"));
          }
        },
        outputFormat,
        quality
      );
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    reader.onerror = () => reject(new Error("Failed to read file"));

    reader.readAsDataURL(file);
  });
};

// Generic function to save documents
const saveDocumentToFirestore = async (
  uid: string,
  collection: string,
  document: any
) => {
  const firestore = getFirestoreInstance();
  const docId = document.id || crypto.randomUUID();
  const docRef = doc(firestore, "users", uid, collection, docId);
  await setDoc(docRef, { ...document, id: docId }, { merge: true });
  return docId;
};

// Generic function to delete documents
const deleteDocumentFromFirestore = async (
  uid: string,
  collection: string,
  docId: string
) => {
  const firestore = getFirestoreInstance();
  const docRef = doc(firestore, "users", uid, collection, docId);
  await deleteDoc(docRef);
};

// Enhanced upload with compression and progress tracking
interface UploadOptions extends CompressionOptions {
  onProgress?: (progress: number) => void;
}

const uploadImageToStorage = async (
  uid: string,
  file: File,
  folder: string,
  options: UploadOptions = {}
): Promise<string> => {
  const storage = getStorageInstance();
  const { onProgress, ...compressionOptions } = options;

  // Compress image first
  const compressedBlob = await compressImage(file, compressionOptions);

  // Log compression results
  const originalSize = file.size;
  const compressedSize = compressedBlob.size;
  const compressionRatio = ((1 - compressedSize / originalSize) * 100).toFixed(
    1
  );
  console.log(
    `Compressed ${file.name}: ${(originalSize / 1024).toFixed(1)}KB → ${(
      compressedSize / 1024
    ).toFixed(1)}KB (${compressionRatio}% reduction)`
  );

  // Generate unique filename
  const timestamp = Date.now();
  const extension = compressionOptions.outputFormat?.split("/")[1] || "webp";
  const baseName = file.name.replace(/\.[^/.]+$/, ""); // Remove original extension
  const sanitizedName = baseName.replace(/[^a-zA-Z0-9.-]/g, "_");
  const uniqueFileName = `${timestamp}_${sanitizedName}.${extension}`;

  const fileRef = ref(storage, `${folder}/${uid}/${uniqueFileName}`);
  const uploadTask = uploadBytesResumable(fileRef, compressedBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (onProgress) {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        }
      },
      (error) => {
        console.error(`Upload failed for ${folder}:`, error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

// Delete image from storage
export const deleteImageFromStorage = async (imageUrl: string) => {
  try {
    const storage = getStorageInstance();
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};

// Book operations
export const saveBookToFirestore = (uid: string, book: any) =>
  saveDocumentToFirestore(uid, "books", book);

export const deleteBookFromFirestore = (uid: string, bookId: string) =>
  deleteDocumentFromFirestore(uid, "books", bookId);

export const uploadBookCoverToFirebaseStorage = (
  uid: string,
  file: File,
  options?: UploadOptions
) => uploadImageToStorage(uid, file, "book-covers", options);

// Vinyl operations
export const saveVinylToFirestore = (uid: string, vinyl: any) =>
  saveDocumentToFirestore(uid, "vinyls", vinyl);

export const deleteVinylFromFirestore = (uid: string, vinylId: string) =>
  deleteDocumentFromFirestore(uid, "vinyls", vinylId);

export const uploadVinylCoverToFirebaseStorage = (
  uid: string,
  file: File,
  options?: UploadOptions
) => uploadImageToStorage(uid, file, "vinyl-covers", options);

// Batch operations
export const saveBatchToFirestore = async (
  uid: string,
  collection: string,
  documents: any[]
) => {
  const promises = documents.map((doc) =>
    saveDocumentToFirestore(uid, collection, doc)
  );
  return Promise.all(promises);
};

// Utility: Check if file is an image
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith("image/");
};

// Utility: Validate image before upload
export const validateImage = (
  file: File,
  maxSizeMB: number = 10
): { valid: boolean; error?: string } => {
  if (!isImageFile(file)) {
    return { valid: false, error: "File must be an image" };
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `Image must be smaller than ${maxSizeMB}MB`,
    };
  }

  return { valid: true };
};
