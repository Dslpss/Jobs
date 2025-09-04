// Script para adicionar admin - Execute no console do browser
// INSTRUÇÕES:
// 1. Faça login com dennisemannuel93@gmail.com
// 2. Abra o console (F12)
// 3. Cole e execute este código:

/*
// Execute isto no console:
(async () => {
  try {
    // Verificar se está logado
    if (!window.auth || !window.auth.currentUser) {
      console.log("❌ Faça login primeiro!");
      return;
    }
    
    const user = window.auth.currentUser;
    console.log("📧 Email:", user.email);
    console.log("🆔 UID:", user.uid);
    
    if (user.email === "dennisemannuel93@gmail.com") {
      // Adicionar como admin
      const { doc, setDoc } = await import('firebase/firestore');
      const { db } = await import('./src/config/firebase');
      
      await setDoc(doc(db, "admins", user.uid), {
        email: user.email,
        role: "admin",
        createdAt: new Date(),
      });
      
      console.log("✅ Admin adicionado com sucesso!");
      console.log("🔄 Recarregue a página para ver as mudanças");
    } else {
      console.log("❌ Esta conta não é authorizada como admin");
    }
  } catch (error) {
    console.error("❌ Erro:", error);
    console.log("💡 Tente adicionar manualmente no Firebase Console");
    console.log("📋 UID para copiar:", window.auth?.currentUser?.uid);
  }
})();
*/

// Função alternativa (se a acima não funcionar)
const makeAdmin = async () => {
  const user = auth.currentUser;
  if (user) {
    console.log("UID para usar no Firebase Console:", user.uid);
  }
};

export { makeAdmin };
