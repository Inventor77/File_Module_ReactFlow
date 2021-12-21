class Utils {
  constructor(firestore) {
    this.firestore = firestore;
  }

  // --------------- Create ---------------

  addData(name, data) {
    const ret = this.firestore.collection(name).add(data);
    return ret;
  }

  // ---------------------------------------

  // --------------- Read ---------------

  async readData(name) {
    const data = await this.firestore.collection(name).get();
    return data;
  }
  // --------------------------------------

  // --------------- Update ---------------

  // --------------------------------------

  // ------------ Delete --------------
  deleteData(name, docId) {
    if (
      window.confirm(
        `Are you sure to delete this ${name === "node" ? "node" : "file"}`
      )
    ) {
      const ret = this.firestore
        .collection(name === "node" ? "custom_nodes" : "issueModule")
        .doc(docId)
        .delete();
      return ret;
    }
  }
  // ------------------------------------
}

export default Utils;
