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

  updateData(name, id, data) {
    this.firestore
      .collection(name === "node" ? "custom_nodes" : "issueModule")
      .doc(id)
      .update(data)
      .then(() =>
        alert(
          `File ${
            name === "node" ? "Data" : "File"
          } has been updated successfully`
        )
      )
      .catch((err) => console.log(err));
  }

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
