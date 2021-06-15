import { ref, onUnmounted } from "vue";
import firebaseApp from "./firebaseApp";

const db = firebaseApp.firestore();

class Collection {
  constructor(collectionName) {
    this.collection = db.collection(collectionName);
  }
  create(data) {
    return this.collection.add(data);
  }
  async find(id) {
    const data = await this.collection.doc(id).get();
    return data.exists ? data.data() : null;
  }
  update(id, data) {
    return this.collection.doc(id).update(data);
  }
  destroy(id) {
    return this.collection.doc(id).delete();
  }
  useLoad() {
    const records = ref([]);
    const close = this.collection.onSnapshot((snapshot) => {
      records.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
    onUnmounted(close);
    return records;
  }
}

export default Collection;
