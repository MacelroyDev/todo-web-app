import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, deleteDoc, updateDoc ,doc, query } from "firebase/firestore";


export async function getItems(userID) {
    let items = [];
    const q = query(
        collection(db, "users", userID, "items"),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        items.push({ id: doc.id, ...doc.data() });
      });
      console.log("Items: ", items);
      return items;

}

export async function addItem(userID, itemText) {
    const docRef = await addDoc(collection(db, "users", userID, "items"), {
        text: itemText,
        isComplete: false,
      });
      console.log("Item is created with ID: ", docRef.id);
      return docRef.id;
}

export async function deleteItem(userID, itemId) {
    try {
      const itemDocRef = doc(db, "users", userID, "items", itemId);
      await deleteDoc(itemDocRef);
      console.log(`Item with ID ${itemId} deleted successfully.`);
      return true; // Indicate successful deletion
    } catch (error) {
      console.error("Error deleting item:", error);
      return false; // Indicate deletion failed
    }
  }


  export async function updateItemCompletion(userID, itemId, isComplete) {
    try {
      const itemDocRef = doc(db, "users", userID, "items", itemId);
      await updateDoc(itemDocRef, {
        isComplete: isComplete,
      });
      console.log(`Item with ID ${itemId} updated. isComplete: ${isComplete}`);
      return true; // Indicate successful update
    } catch (error) {
      console.error("Error updating item:", error);
      return false; // Indicate update failed
    }
  }