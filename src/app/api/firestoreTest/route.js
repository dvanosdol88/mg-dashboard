import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function GET() {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  const tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return new Response(JSON.stringify(tasks), { status: 200 });
}

export async function POST() {
  const docRef = await addDoc(collection(db, "tasks"), {
    title: "My First Task",
    completed: false,
  });
  return new Response(JSON.stringify({ message: "Task added!", id: docRef.id }), { status: 200 });
}
