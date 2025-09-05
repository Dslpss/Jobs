// Teste de conexão Firebase
import { auth, db } from "./src/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

console.log("🔥 Testando conexão Firebase...");
console.log("Auth:", auth);
console.log("Database:", db);
console.log("Project ID:", auth.app.options.projectId);

// Função para testar criação de usuário admin
async function createAdminUser() {
  try {
    console.log("🔧 Criando usuário admin...");

    // Criar usuário
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      "dennisemannuel93@gmail.com",
      "Admin123!"
    );

    const user = userCredential.user;
    console.log("✅ Usuário criado:", user.uid);

    // Adicionar como admin no Firestore
    await setDoc(doc(db, "admins", user.uid), {
      email: "dennisemannuel93@gmail.com",
      createdAt: new Date(),
      role: "admin",
    });

    console.log("✅ Admin configurado com sucesso!");
  } catch (error) {
    console.error("❌ Erro:", error.message);

    if (error.code === "auth/email-already-in-use") {
      console.log("📧 Email já existe, tentando apenas definir como admin...");

      // Se o usuário já existe, apenas definir como admin
      const currentUser = auth.currentUser;
      if (currentUser && currentUser.email === "dennisemannuel93@gmail.com") {
        await setDoc(doc(db, "admins", currentUser.uid), {
          email: "dennisemannuel93@gmail.com",
          createdAt: new Date(),
          role: "admin",
        });
        console.log("✅ Admin configurado com sucesso!");
      }
    }
  }
}

// Exportar para uso no console
window.createAdminUser = createAdminUser;
window.auth = auth;
window.db = db;
