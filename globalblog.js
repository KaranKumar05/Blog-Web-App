import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  serverTimestamp,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDSk7TkFDUJrpMSpTT5jVmI6h9C89KmudQ",
    authDomain: "fir-webapp-8906f.firebaseapp.com",
    projectId: "fir-webapp-8906f",
    storageBucket: "fir-webapp-8906f.appspot.com",
    messagingSenderId: "810943737108",
    appId: "1:810943737108:web:9955a157798a91f657e601"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userName = sessionStorage.getItem("currentUserName");
window.addEventListener("load", () => {
  const q = query(collection(db, "global"), orderBy("createdAt", "desc"));
  const globalBlogSection = document.querySelector("#globalBlogSection");
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    globalBlogSection.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const post = document.createElement("div");
      post.classList.add("post");
      post.id = doc.data().id;
      const head = document.createElement("div");
      head.classList.add("head");
      const userImg = document.createElement("div");
      userImg.innerHTML = `<i class="bi bi-person"></i>`;
      userImg.classList.add("userImg");
      const head2Div = document.createElement("div");
      head2Div.classList.add("head2Div");
      const title = document.createElement("div");
      title.classList.add("title");
      title.innerText = doc.data().title;
      const displayName = document.createElement("div");
      displayName.classList.add("displayName");
      displayName.innerText = userName;
      head2Div.appendChild(title);
      head2Div.appendChild(displayName);
      head.appendChild(userImg);
      head.appendChild(head2Div);

      const inputText = document.createElement("div");
      inputText.classList.add("inputText");
      inputText.innerText = doc.data().inputText;
      post.appendChild(head);
      post.appendChild(inputText);

      globalBlogSection.appendChild(post);
    });
  });
});